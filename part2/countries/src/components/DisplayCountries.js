// Fullstack Open 2019 - Part 2 - Countries
// Alfonso GUtierrez

import React, { useState } from 'react';
import Dialect from './Dialect'
import Weather from './Weather'

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
            <Weather city={country.capital} />
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

export default DisplayCountries