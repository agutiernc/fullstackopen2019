// Fullstack 2019 - Alfonso Gutierrez
// Part 2 - Courseinfo

import React from 'react';
import ReactDOM from 'react-dom';

const Courses = ({courses}) => {
    const topic = () => courses.map(item => 
        <Course
            key={item.id}
            course={item}
        />
    )

    return (
        <div>
            {topic()}
        </div>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
        </>
    )
}

const Header = ({course}) => {
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Content = ({course}) => {
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
            <Total course = {course} />
        </div>
    )

}

const Part = ({part, exercises}) => {
    return (
        <div>
            <p>{part} {exercises}</p>
        </div>
    )
}

const Total = ({course}) => {
    const total = course.parts.reduce( (sum, current) => sum + current.exercises, 0)

    return (
        <div>
            <h3>Total of {total} exercises</h3>
        </div>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                },

            ]
        }

    ]

    return (
        <div>
            <Courses courses={courses} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

