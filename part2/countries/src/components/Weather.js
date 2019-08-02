// Fullstack Open 2019 - Part 2 - Countries
// Alfonso GUtierrez

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
    const [showWeather, setShowWeather] = useState('')

    useEffect(() => {
        axios
            .get(`http://api.apixu.com/v1/current.json?key=25e2494250424b12963234812192207&q=${city}`)
            .then(response => setShowWeather(response.data))
    }, [city])

    if (!showWeather) {
        return (
            <></>
        )
    }

    return (
        <div>
            <h2>Weather in {city}</h2>
            <p><strong>Temperature:</strong> {showWeather.current.temp_f}&deg;F</p>
            <img src={showWeather.current.condition.icon} alt={showWeather.current.condition.text} />
            <p><strong>Wind: </strong>
                {showWeather.current.wind_mph} mph <strong>Direction:</strong> {showWeather.current.wind_dir}
            </p>
        </div>
    )
}

export default Weather