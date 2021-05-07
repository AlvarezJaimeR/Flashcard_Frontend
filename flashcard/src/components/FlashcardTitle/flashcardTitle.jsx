import React from 'react';
import './flashcardTitle.css';

function FlashcardTitle(props) {
    return (
        <div className="flashcard-title-bar">
            {console.log(props)}
            <div className="col-md-12" style = {{padding: 0}}>
                <div>
                    <h1>{props.collectionName}</h1>
                </div>
            </div>
        </div>
    );
}

export default FlashcardTitle;