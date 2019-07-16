// Fullstack Open 2019 - Part 2 - Phonebook
// Alfonso Gutierrez

import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [findName, setFindName] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect( () => {
        axios
            .get('http://localhost:3001/persons')
            .then( response => setPersons(response.data) )
    }, [])

    const filterNames = persons.filter( person => person.name.toLowerCase().includes( findName.toLowerCase() ) )

    const personsToShow = showAll ? persons : filterNames

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

            <Filter value={findName} onChange={handleSearchChange} />
            <PersonForm 
                onSubmit={addName} 
                valueName={newName} 
                valueNumber={newNumber} 
                nameChange={handleNameChange} 
                numberChange={handleNumberChange} 
            />

            <h3>Numbers</h3>
            <Persons personsArr={personsToShow} />
        </div>
    )
}

export default App