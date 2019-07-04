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

const App = () => {
    const course = {
        name: 'Half Stack application development',
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

