import React, { useState } from 'react'
import Select from 'react-select'

const BirthForm = (props) => {
  const selectStyle = {
    width: 250,
    marginBottom: 10
  }

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const options = props.authors.map(a => {
    return {
      value: a.name,
      label: a.name
    }
  })

  const handleChange = (name) => {
    setName(name.value)
  }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: { name, born: parseInt(born) }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set Birth Year</h3>
      <form onSubmit={submit}>
        <div style={selectStyle}>
          <Select
            options={options}
            onChange={handleChange}
          />
        </div>
        <div>
          born
          <input type='number' value={born} onChange={ ({ target }) => setBorn(target.value) } />
        </div>

        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthForm