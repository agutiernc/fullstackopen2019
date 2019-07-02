// FullStack Open 2019 - Alfonso Gutierrez
// Part 1 - Anecdotes
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Voted = ({votes, anecdotes}) => {
   const maxVotes = Math.max(...votes)
   const maxVotesIndex = votes.indexOf(maxVotes)
    
   if(maxVotes > 0){
       return (
           <div>
               <h3>Anecdote With Most Votes</h3>
               <p>{anecdotes[maxVotesIndex]}</p>
               <p>Has {maxVotes} votes</p>
           </div>
       )
   } else {
       return (
           <div>
               <h3>Anecdotes have not been voted on. Please vote.</h3>
           </div>
       )
   }
}

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState( new Array(anecdotes.length).fill(0) )

    const handleRandomClick = () => {
       setSelected( Math.floor( Math.random() * anecdotes.length ) )
    }

    const handleVoteClick = () => {
       const voteCopy = [...votes]

       voteCopy[selected]++
       setVotes(voteCopy)
    }

    return (
        <div>
            <h1>Anecdote of The Day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>Has {votes[selected]} votes</p>
            <Button onClick={handleVoteClick} text='Vote' />
            <Button onClick={handleRandomClick} text='Next Anecdote' />
            <Voted votes={votes} anecdotes={props.anecdotes} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
