// Fullstack Open 2019 - Part 2 - Phonebook
// Alfonso Gutierrez

import React, {useState, useEffect} from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons.js'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [findName, setFindName] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [message, setMessage] = useState({text: null, type: null})

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
            // if duplicate name, ask if want to change number?
            //      if yes, then update user id with new number
            if( window.confirm(`${newName} is already added to phonebook. Replace old number with a new one?`) ){
                const changedNumber = {...findDuplicateName, number: newNumber} // number is targeted and updates

                // updates existing person
                personService
                    .update(changedNumber.id, changedNumber)
                    .then( returnedPerson => {
                        setPersons( persons.map( person => person.id !== changedNumber.id ? person : returnedPerson ) )
                        setMessage({text: `Updated ${changedNumber.name}'s number`, type: 'success' })
                        setTimeout( () => {
                            setMessage({text: null, type: null})
                        }, 5000)
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        setMessage({
                            text: `Information of ${changedNumber.name} has already been removed from server`,
                            type: 'error'
                        })
                        setTimeout(() => {
                            setMessage({ text: null, type: null })
                        }, 5000)
                        setPersons(persons.filter(person => person.id !== changedNumber.id))
                        setNewName('')
                        setNewNumber('')
                    })
            } else {
                setNewName('')
                setNewNumber('')
            }
           
        } else {
            // creates new object; ready for JSON file
            const nameObject = {
                name: newName,
                number: newNumber
            }

            personService
                .create(nameObject)
                .then( returnedPerson => {
                    setPersons( persons.concat(returnedPerson) )
                    setMessage({text: `Added ${returnedPerson.name}`, type: 'success'})
                    setTimeout( () => {
                        setMessage({text: null, type: null})
                    }, 5000)
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    // deletes the person from the phonebook if button triggered
    const deleteEntryChange = id => {
        const person = persons.find( p => p.id === id )
        
        if(window.confirm(`Delete ${person.name}?`)){
            
            personService
                .destroy(id)
                .then( () => {
                    setPersons( persons.filter( person => person.id !== id ) )
                    setMessage({text: `Deleted ${person.name}`, type:'success'})
                    setTimeout( () => {
                        setMessage({text: null, type: null})
                    }, 5000)
                })
                .catch( error => {
                    setMessage({text: `'${person.name}' was already deleted from the server`, type: 'error' })
                    setTimeout( () => {
                        setMessage({text: null, type: null})
                    }, 5000)
                    setPersons( persons.filter( person => person.id !== id ) )
                    setNewName('')
                    setNewNumber('')
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

            <Notification message={message} />
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