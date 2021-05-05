import React from 'react';
import Flashcard from '../Flashcard/flashcard';

function Flashcards(props){
    return (
        <div className = "row row-spacer">
        {console.log("in the flashcard function")}
        <div className="col-md-3">
        </div>
        <div className="col-md-6">
            <Flashcard flashcard = {props.flashcard}/>
        </div>
        <div className ="col-md-3">
        </div>
    </div>
    )
}

export default Flashcards;