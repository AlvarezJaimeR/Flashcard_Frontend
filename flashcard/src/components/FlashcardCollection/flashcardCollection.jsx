import React from 'react';
import Collection from '../Collection/collection';

function FlashcardCollection(props){
    return (
        <div className = "row row-spacer">
            {console.log("in the flashcardCollection function")}
            {console.log(props)}
            <div className="col-md-3">
            <button onClick={() => props.previousCollection()}>Previous Collection</button>
            </div>
            <div className="col-md-6">
                <Collection collection = {props.collection}/>
            </div>
            <div className ="col-md-3">
            <button onClick={() => props.nextCollection()}>Next Collection</button>
            </div>
        </div>
    );
}

export default FlashcardCollection;