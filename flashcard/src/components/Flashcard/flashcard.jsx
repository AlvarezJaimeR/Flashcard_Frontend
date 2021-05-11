import React from "react";
import './flashcard.css';

function Flashcard(props){
    return (
        <div className="flashcard">
            {console.log("in the flashcard function.")}
            {console.log(props)}
            {console.log(props.answerShowing)}
            <div className="flashcard-cover">
                <h1 className = "category">{props.flashcard.category}</h1>
                <h3 className = "question">{props.flashcard.question}</h3>
                <div>
                    <button onClick={() => props.showAnswer()} className='btn btn-light'>{props.display}</button>
                    { props.answerShowing ? 
                        <div>
                        <h5 className = "answer">{props.flashcard.answer}</h5>
                        </div> 
                    : null}
                </div>
                <h6 className = "count">{props.currentFlashcard + " / " + props.flashcardTotal}</h6>
            </div>
        </div>
    )
}

export default Flashcard;