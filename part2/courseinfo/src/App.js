// Fullstack 2019 - Alfonso Gutierrez
// Part 2 - Courseinfo

import React from 'react'
import Courses from './components/Courses'

const App = ({courses}) => {
    
    return (
        <div>
            <h1>Web Development Curriculum</h1>
            <Courses courses={courses} />
        </div>
    )
}

export default App