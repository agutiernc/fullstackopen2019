const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

const JWT_SECRET = 'SECRET_HANDSHAKE'

const MONGODB_URI =
'mongodb+srv://<username>:<password>@cluster0-1vtco.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

// added useUnifiedTopology to get rid of deprecated error
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => console.log('connected to MongoDB') )
  .catch( (error) => console.log('error connection to MongoDB:', error.message) )

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const byGenre =  Book.find( { genres: { $in: args.genre } } )
      const byAuthor =  Book.find( { author: await Author.find({ name: args.author }) } )
      const byBoth =  Book.find({ author: await Author.find({ name: args.author }), genres: { $in: args.genre } } )

      if (args.author && args.genre) {
        return byBoth.populate('author')
      } else if (args.author) {
        return byAuthor.populate('author')
      } else if (args.genre) {
        return byGenre.populate('author')
      } else {
        return Book.find({}).populate('author')
      }

    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root) => Book.find({ author: root._id }).populate('author').countDocuments()
  },
  Book: {
    author: (root) => {
      return Author.findById(root.author)
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let creator = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (!creator) {
        creator = await new Author({ name: args.author, born: null })

        await creator.save()
      }

      const book = await new Book({ ...args, author: creator._id })

      try {
        const savedBook = await book.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

        return await Book.findById(savedBook.id).populate('author')

      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      const author = await Author.findOne({ name: args.name })

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return author
    },
    createUser: (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})