import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

// queries to be made
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    id
    author {
      name
      born
      id
    }
  }
`

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    ...BookDetails
  }
}

${BOOK_DETAILS}
`

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

const UPDATE_BIRTH = gql`
  mutation updateBirth($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born,
    ) {
      name
      born
      id
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const CURRENT_USER = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const GENRE_BOOKS = gql`
query byGenre($genre: String) {
  allBooks(genre: $genre) {
    ...BookDetails
  }
}

${BOOK_DETAILS}
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(CURRENT_USER)

  const [page, setPage] = useState('authors')

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)

    setTimeout( () => {
      setErrorMessage(null)
    }, 10000)
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)

      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
     const addedBook = subscriptionData.data.bookAdded

     alert(`Added new book: ${addedBook.title} by ${addedBook.author.name}`)

     updateCacheWith(addedBook)
    }
  })

  const [editAuthor] = useMutation(UPDATE_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token === null ?  null : <button onClick={ () => setPage('add') }>add book</button> }
        { token === null ?  null : <button onClick={ () => setPage('recommend') }>recommend</button> }
        { token === null ? <button onClick={ () => setPage('login') }>login</button> :
          <button onClick={logout}>log out</button> }
        
      </div>
      <br />

      {errorNotification()}

      <Authors
        show={page === 'authors'}
        result={authors}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        result={books}
        genreBooks={GENRE_BOOKS}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
        setPage={setPage}
      />

      <Recommend
        show={page === 'recommend'}
        result={user}
        books={books}
      />
    
      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={ (token) => setToken(token)}
        setPage={setPage}
      />

    </div>
  )
}

export default App