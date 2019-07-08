import React, {useState} from 'react';
import Numbers from './components/Numbers'

const App = () => {
    const [persons, setPersons] = useState([ {name: 'Arto Hellas', id: 1, number: '213-555-5555'} ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const rows = () => persons.map( (person) =>
        <Numbers
            key={person.id}
            person={person}
        />    
    )

    const addName = (event) => {
        event.preventDefault()

        const findDuplicateName = persons.find( person => person.name.toLowerCase() === newName.toLowerCase() )

        if (findDuplicateName) {
            alert(`${newName} is already added to phonebook`)
            setNewName('')
            setNewNumber('')
        } else {
            const nameObject = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }

            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    Name: <input value={newName} onChange={handleNameChange} />
                    <br />
                    Number: <input value={newNumber} onChange={handleNumberChange} />
                </div>

                <div>
                    <button type="submit">Add</button>
                </div>
            </form>

            <h2>Numbers</h2>
            <ul>
                {rows()}
            </ul>
            
            {/* <div>debug: {newName}</div> */}
            
        </div>
    )
}

export default App