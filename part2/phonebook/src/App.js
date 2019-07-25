// Fullstack Open 2019 - Part 2 - Phonebook
// Alfonso Gutierrez

import React, {useState, useEffect} from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons.js'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [findName, setFindName] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect( () => {
        personService
            .getAll()
            .then( initialPerson => setPersons(initialPerson) )
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
            // creates new object, ready for JSON file
            const nameObject = {
                name: newName,
                number: newNumber
                // id: persons.length + 1 // temporarily removed id to make insertions work
            }

            personService
                .create(nameObject)
                .then( returnedPerson => {
                    setPersons( persons.concat(returnedPerson) )
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    // deletes the person from the phonebook
    const deleteEntryChange = id => {
        const person = persons.find( p => p.id === id )
        const deletedPerson = {...person}
        
        if(window.confirm(`Delete ${person.name}?`)){
            console.log(`the id ${id}`)
            console.log('the object:', person)
            console.log(`the person id: ${person.id}`)
            console.log('copy of person object', deletedPerson)
            
            personService
                .destroy(id)
                .then( returnedPerson => {
                    setPersons( persons.filter( person => person.id !== id ) )
                })
                .catch( error => {
                    alert(`'${person.name}' was already deleted from the server`)
                    setPersons( persons.filter( person => person.id !== id ) )
                })
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
            <h1>Phonebook</h1>

            <Filter value={findName} onChange={handleSearchChange} />
            <h3>Add A New Number</h3>
            <PersonForm 
                onSubmit={addName} 
                valueName={newName} 
                valueNumber={newNumber} 
                nameChange={handleNameChange} 
                numberChange={handleNumberChange} 
            />

            <h3>Numbers</h3>
            <Persons personsArr={personsToShow} deleteEntry={deleteEntryChange} />
        </div>
    )
}

export default App