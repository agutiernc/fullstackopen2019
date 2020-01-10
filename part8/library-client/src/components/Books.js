import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

const Books = (props) => {
  const [genre, setGenre] = useState('ALL')
  const [filterGenre, setFilterGenre] = useState(null)

  const [loadGenres, { data }] = useLazyQuery(
    props.genreBooks,
    { variables: { genre: genre }, fetchPolicy: "cache-and-network" }
  )

  useEffect( () => {
    if (data) {
      setFilterGenre(data)
    }
    loadGenres()
  }, [data, loadGenres])

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const books = props.result.data.allBooks

  const genresBtn = [ ...new Set( books.map(item => item.genres).flatMap(item => item) ) ]

  const handleGenreClick = (g) => {
    setGenre(g)
  }
  
  return (
    <div>
      <h2>books</h2>
      {
        genre === 'ALL' ? null : <h4>In Genre: { genre.toUpperCase() }</h4>
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          { genre === 'ALL' ? books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>)
            : filterGenre.allBooks.map(g =>
              <tr key={g.title}>
                 <td>{g.title}</td>
                 <td>{g.author.name}</td>
                 <td>{g.published}</td>
               </tr>
            )
          }
        </tbody>
      </table>
      
      <div>
        {
          genresBtn.map( (g, index) =>

            <button 
              key={index}
              onClick={ () => handleGenreClick(g) }
            >
              {g}
            </button>
          )
        }
        
        <button onClick={ () => setGenre('ALL')}>all genres</button>
      </div>
    </div>
  )
}

export default Books