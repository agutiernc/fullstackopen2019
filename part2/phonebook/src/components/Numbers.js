// Fullstack Open 2019 - Part 2 - Phonebook
// Alfonso Gutierrez

import React from 'react'

const Numbers = ({person}) => {
    return (
        <li>{person.name}: {person.number}</li>
    )
}

export default Numbers