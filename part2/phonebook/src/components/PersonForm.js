// Fullstack Open 2019 - Part 2 - Phonebook
// Alfonso Gutierrez

import React from 'react'

const PersonForm = ({ onSubmit, valueName, valueNumber, nameChange, numberChange }) => {

    return (
        <form onSubmit={onSubmit}>
            <div>
                Name: <input value={valueName} onChange={nameChange} />
                <br />
                Number: <input value={valueNumber} onChange={numberChange} />
            </div>

            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm