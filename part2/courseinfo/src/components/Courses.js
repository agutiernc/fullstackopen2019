import React from 'react'
import Course from './Course'

const Courses = ({courses}) => {
    const topic = () => courses.map(item => 
        <Course
            key={item.id}
            course={item}
        />
    )

    return (
        <>
            {topic()}
        </>
    )
}

export default Courses