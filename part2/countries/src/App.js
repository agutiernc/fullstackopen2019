// Fullstack Open 2019 - Part 2 - Countries
// Alfonso GUtierrez
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCountries from './components/DisplayCountries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filterCountry, setFilterCountry] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data))
    }, [])

    const handleFilterChange = (event) => {
        setFilterCountry(event.target.value)
    }

    return (
        <div>
            <div>
                Find Countries: <input value={filterCountry} onChange={handleFilterChange} />
            </div>

            <div>
                <DisplayCountries countries={countries} filterCountry={filterCountry} />
            </div>

        </div>
    )
}

export default App