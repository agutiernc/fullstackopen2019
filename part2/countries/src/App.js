import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Display = ({ country }) => {
    const [showCountry, setShowCountry] = useState(true)

    const show = () => {
        if(!showCountry){
            return(
                <div>
                    <Country country={country} />
                </div>
            )
        }
    }

    return (
        <div>
            {country.name} <button onClick={ () => setShowCountry(!showCountry) }>show</button>
            {show()}
        </div>
    )
}

const Dialect = ({language}) => {
    return (
        <li>{language.name}</li>
    )
}

const Country = ({country}) => {
    const countryDialect = () => country.languages.map(item => 
       <Dialect
            key={item.iso639_1}
            language = {item}
       />
    )

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <div>
                <h2>Languages</h2>
                <ul>
                   {countryDialect()}
                </ul>
            </div>
            <div>
                <img src={country.flag} width="200" alt="Country's flag" />
            </div>
            <br />
        </div>
    )
}

const DisplayCountries = ({countries, filterCountry}) => {
    if(filterCountry !== ''){

        const filterCountries = countries.filter(country => country.name.toLowerCase().includes(filterCountry.toLowerCase()))

        if(filterCountries.length > 10) {
            return (
                <p>Too many matches. Specify another filter</p>
            )
        }

        if(filterCountries.length === 1) {
            return (
                <Country country={filterCountries[0]} />
            )
        }

        const rows = () => filterCountries.map(country =>
            <Display
                key={country.numericCode}
                country={country}
            />
        )
    
        return (
            <>
                {rows()}
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

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