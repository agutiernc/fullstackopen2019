// Fullstack Open 2019 - Part 2 - Phonebook
// Alfonso Gutierrez

import React from 'react'

const Numbers = ({person, deleteEntry}) => {
    return (
        <li>{person.name}: {person.number} <button onClick={deleteEntry}>delete</button></li>
    )
}

export default Numbers