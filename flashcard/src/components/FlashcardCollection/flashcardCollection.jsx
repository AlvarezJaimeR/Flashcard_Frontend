import React from 'react';
import Collection from '../Collection/collection';

function FlashcardCollection(props){
    return (
        <div className = "row row-spacer">
            {console.log("in the flashcardCollection function")}
            <div className="col-md-3">
            </div>
            <div className="col-md-6">
                <Collection collection = {props.collection}/>
            </div>
            <div className ="col-md-3">
            </div>
        </div>
    );
}

export default FlashcardCollection;