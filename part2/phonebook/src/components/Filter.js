// Fullstack Open 2019 - Part 2 - Phonebook
// Alfonso Gutierrez

import React from 'react'

const Filter = ({value, onChange}) => {

    return (
        <div>
           Filter names: <input value={value} onChange={onChange} />
        </div>
    )
}

export default Filter