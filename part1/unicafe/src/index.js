import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistic = (props) => {
    return props.text === 'Positive' ? 
    ( <p>{props.text}: {props.value}%</p> ) : 
    ( <p>{props.text}: {props.value}</p> )
}

const Statistics = (props) => {
    const total = props.good + props.neutral + props.bad
    const positive = (props.good / total) * 100 || 0
    const average = ( (props.good * 1) - props.bad ) / total || 0

    if(props.good === 0 && props.neutral === 0 && props.bad === 0){
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <Statistic text='Good' value={props.good} />
            <Statistic text='Neutral' value={props.neutral} />
            <Statistic text='Bad' value={props.bad} />
            <Statistic text='All' value={total} />
            <Statistic text='Average' value={average} />
            <Statistic text='Positive' value={positive} />
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
                <h2>Statistics</h2>
                <Statistics good={good} neutral={neutral} bad={bad} />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

