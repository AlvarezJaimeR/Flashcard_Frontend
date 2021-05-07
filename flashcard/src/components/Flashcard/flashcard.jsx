import React from "react";
import './flashcard.css';

function Flashcard(props){
    return (
        <div className="flashcard">
            {console.log("in the flashcard function.")}
            {console.log(props)}
            <div className="flashcard-cover">
                <h1 className = "category">{props.flashcard.category}</h1>
                <h3 className = "question">{props.flashcard.question}</h3>
                <h5 className = "answer">{props.flashcard.answer}</h5>
                <h6 className = "count">{props.currentFlashcard + " / " + props.flashcardTotal}</h6>
            </div>
        </div>
    )
}

export default Flashcard;