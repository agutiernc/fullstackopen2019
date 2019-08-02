// Fullstack 2019 - Alfonso Gutierrez
// Part 2 - Courseinfo

import React from 'react'

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
        </>
    )
}

const Header = ({ course }) => {
    return (
        <div>
            <h2>{course.name}</h2>
        </div>
    )
}

const Content = ({ course }) => {
    const rows = () => course.parts.map(info =>
        <Part
            key={info.id}
            part={info.name}
            exercises={info.exercises}
        />
    )

    return (
        <div>
            {rows()}
            <Total course={course} />
        </div>
    )

}

const Part = ({ part, exercises }) => {
    return (
        <div>
            <p>{part} {exercises}</p>
        </div>
    )
}

const Total = ({ course }) => {
    const total = course.parts.reduce((sum, current) => sum + current.exercises, 0)

    return (
        <div>
            <h3>Total of {total} exercises</h3>
        </div>
    )
}

export default Course