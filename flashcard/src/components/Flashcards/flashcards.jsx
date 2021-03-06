import React from 'react';
import Flashcard from '../Flashcard/flashcard';
import './flashcards.css';

function Flashcards(props){
    return (
        <div className = "row row-spacer">
        {console.log("in the flashcard function")}
        {console.log("flashcard props:", props)}
        <div className="col-md-3 text-center">
            <button onClick={() => props.previousCard()}>Previous Card</button>
        </div>
        <div className="col-md-6">
            <Flashcard answerShowing = {props.answerShowing} 
                flashcard = {props.flashcard} currentFlashcard = {props.currentFlashcard} flashcardTotal = {props.flashcardTotal}
                showAnswer={props.showAnswer} display={props.display}/>
        </div>
        <div className ="col-md-3 text-center">
            <button onClick={() => props.nextCard()}>Next Card</button>
        </div>
    </div>
    )
}

export default Flashcards;