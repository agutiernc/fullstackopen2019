// Fullstack Open 2019 - Part 2 - Phonebook
// Alfonso Gutierrez

import React from 'react'
import Numbers from './Numbers'

const Persons = ({personsArr, deleteEntry}) => {
    const rows = () => personsArr.map((person) =>
        <Numbers
            key={person.id}
            person={person}
            deleteEntry={ () => deleteEntry(person.id) }
        />
    )

    return (
        <ul>
            {rows()}
        </ul>
    )
}
export default Persons