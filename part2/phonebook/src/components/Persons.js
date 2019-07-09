// Fullstack Open 2019 - Part 2 - Phonebook
// Alfonso Gutierrez

import React from 'react'
import Numbers from './Numbers'

const Persons = ({personsArr}) => {
    const rows = () => personsArr.map((person) =>
        <Numbers
            key={person.id}
            person={person}
        />
    )

    return (
        <ul>
            {rows()}
        </ul>
    )
}
export default Persons