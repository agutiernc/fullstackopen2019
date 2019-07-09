import React, {useState} from 'react';
import Numbers from './components/Numbers'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', id: 1, number: '213-555-5555' },
        { name: 'Ada Lovelace', id: 2, number: '39-44-5323523' },
        { name: 'Dan Abramov', id: 3, number: '12-43-234345' },
        { name: 'Mary Poppendieck', id: 4, number: '39-23-6423122' }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [findName, setFindName] = useState('')
    const [showAll, setShowAll] = useState(true)

    const filterNames = persons.filter( person => person.name.toLowerCase().includes( findName.toLowerCase() ) )

    const personsToShow = showAll ? persons : filterNames

    const rows = () => personsToShow.map( (person) =>
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

            setPersons( persons.concat(nameObject) )
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

    const handleSearchChange = (event) => {
        setFindName(event.target.value)

        if(findName !== ''){
            setShowAll(false)
        }
    }


    return (
        <div>
            <h2>Phonebook</h2>

            <div>
                <input value={findName} onChange={handleSearchChange} />
            </div>

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
        </div>
    )
}

export default App