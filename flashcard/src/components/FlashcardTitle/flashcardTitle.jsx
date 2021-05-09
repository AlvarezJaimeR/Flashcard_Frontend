import React from 'react';
import './flashcardTitle.css';

function FlashcardTitle(props) {
    return (
        <div className="flashcard-title-bar">
            {console.log(props)}
            <div className="col-md-12">
                <div>
                    <h1>{props.desiredTitle}</h1>
                </div>
            </div>
        </div>
    );
}

export default FlashcardTitle;