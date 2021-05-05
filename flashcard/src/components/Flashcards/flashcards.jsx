import React from 'react';
import Flashcard from '../Flashcard/flashcard';

function Flashcards(props){
    return (
        <div className = "row row-spacer">
        {console.log("in the flashcard function")}
        <div className="col-md-3">
            <button onClick={() => props.previousCard()}>Previous Card</button>
        </div>
        <div className="col-md-6">
            <Flashcard flashcard = {props.flashcard}/>
        </div>
        <div className ="col-md-3">
            <button onClick={() => props.nextCard()}>Next Card</button>
        </div>
    </div>
    )
}

export default Flashcards;