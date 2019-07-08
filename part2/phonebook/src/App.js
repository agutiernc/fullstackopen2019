import React, {useState} from 'react';
import Numbers from './components/Numbers'

const App = () => {
    const [persons, setPersons] = useState([ {name: 'Arto Hellas', id: 1} ])
    const [newName, setNewName] = useState('')

    const rows = () => persons.map( (person) =>
        <Numbers
            key={person.id}
            person={person}
        />    
    )

    const addName = (event) => {
        event.preventDefault()

        const findDupliceName = persons.find( person => person.name.toLowerCase() === newName.toLowerCase() )

        if (findDupliceName) {
            alert(`${newName} is already added to phonebook`)
            setNewName('')
        } else {
            const nameObject = {
                name: newName,
                id: persons.length + 1
            }

            setPersons(persons.concat(nameObject))
            setNewName('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    Name: <input value={newName} onChange={handleNameChange} />
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