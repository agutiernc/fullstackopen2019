import React from 'react'

const Recommend = (props) => {

  if (!props.show) {
    return null
  }

  const user = props.result.data.me
  const books = props.books.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>

      <h4>Books in your favorite genre: {user.favoriteGenre.toUpperCase()}</h4>

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

          {
            books.filter(a =>
              a.genres.includes(user.favoriteGenre)).map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>)
          }
        </tbody>
      </table>

    </div>
  )
}

export default Recommend