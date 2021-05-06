import React from 'react';
import Flashcard from '../Flashcard/flashcard';

function Flashcards(props){
    return (
        <div className = "row row-spacer">
        {console.log("in the flashcard function")}
        {console.log("flashcard props:", props)}
        <div className="col-md-3">
            <button onClick={() => props.previousCard()}>Previous Card</button>
        </div>
        <div className="col-md-6">
            <Flashcard flashcard = {props.flashcard} currentFlashcard = {props.currentFlashcard} flashcardTotal = {props.flashcardTotal}/>
        </div>
        <div className ="col-md-3">
            <button onClick={() => props.nextCard()}>Next Card</button>
        </div>
    </div>
    )
}

export default Flashcards;