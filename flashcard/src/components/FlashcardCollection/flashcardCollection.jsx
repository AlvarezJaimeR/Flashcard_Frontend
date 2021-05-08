import React from 'react';
import Collection from '../Collection/collection';
import './flashcardCollection.css';

function FlashcardCollection(props){
    return (
        <div className = "row row-spacer">
            {console.log("in the flashcardCollection function")}
            {console.log(props)}
            <div className="col-md-3 collection-button">
            <button onClick={() => props.previousCollection()}>Previous Collection</button>
            </div>
            <div className="col-md-6">
                <Collection collection = {props.collection}/>
            </div>
            <div className ="col-md-3 collection-button">
            <button onClick={() => props.nextCollection()}>Next Collection</button>
            </div>
        </div>
    );
}

export default FlashcardCollection;