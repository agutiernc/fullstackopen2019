import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const App = (props) => {
    // Save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNuetral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
       setGood(good + 1)
    }

    const handleNuetralClick = () => {
        setNuetral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <div>
                <Button onClick={handleGoodClick} text='good' />
                <Button onClick={handleNuetralClick} text='neutral' />
                <Button onClick={handleBadClick} text='bad' />
            </div>

            <h2>Statistics</h2>
            <div>
                <p>Good: {good}</p>
                <p>Neutral: {neutral}</p>
                <p>Bad: {bad}</p>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

