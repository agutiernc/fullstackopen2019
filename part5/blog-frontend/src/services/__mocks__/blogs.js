// Fullstack Open 2019
// Alfonso Gutierrez
const blogs = [
  {
    likes: 0,
    title: 'Things I don\'t know as of 2018',
    author: 'Dan Abramov',
    url: 'https://overreacted.io/things-i-dont-know-as-of-2018/',
    user: {
      username: 'hellas',
      name: 'Arto Hellas',
      id: '5d3941cb8d940cb627b86364'
    },
    id: '5d39427a8d940cb627b86366'
  },
  {
    likes: 4,
    title: 'Mircroservices architectures and patterns',
    author: 'Martin Fowler',
    url: 'https://martinfowler.com',
    user: {
      username: 'hellas',
      name: 'Arto Hellas',
      id: '5d3941cb8d940cb627b86364'
    },
    id: '5c39426a8d950ca627b86854'
  },
]

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }