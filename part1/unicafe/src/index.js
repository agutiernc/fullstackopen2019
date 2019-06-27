import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
    const total = props.good + props.neutral + props.bad
    const positive = props.good / total * 100 || 0
    const average = ( (props.good * 1) - props.bad ) / total || 0

    return (
        <div>
            <h2>Statistics</h2>
            <p>Good: {props.good}</p>
            <p>Neutral: {props.neutral}</p>
            <p>Bad: {props.bad}</p>
            <p>All: {total}</p>
            <p>Average: {average}</p>
            <p>Positive: {positive}%</p>
        </div>
    )
}

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const App = (props) => {
    // Save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNuetral] = useState(0)
    const [bad, setBad] = useState(0)
    
    const handleGoodClick = () => setGood(good + 1)
    const handleNuetralClick = () => setNuetral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <h1>Give Feedback</h1>
            <div>
                <Button onClick={handleGoodClick} text='good' />
                <Button onClick={handleNuetralClick} text='neutral' />
                <Button onClick={handleBadClick} text='bad' />
            </div>

            <div>
                <Statistics good={good} neutral={neutral} bad={bad} />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

