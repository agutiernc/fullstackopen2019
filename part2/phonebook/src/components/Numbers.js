import React from 'react'

const Numbers = ({person}) => {
    return (
        <li>{person.name}: {person.number}</li>
    )
}

export default Numbers