// Fullstack 2019 - Alfonso Gutierrez
// Part 2 - Courseinfo

import React from 'react';
import ReactDOM from 'react-dom';

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
    return (
        <div>
            <h3>Total of {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises + course.parts[3].exercises} exercises</h3>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack Application Development',
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
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

