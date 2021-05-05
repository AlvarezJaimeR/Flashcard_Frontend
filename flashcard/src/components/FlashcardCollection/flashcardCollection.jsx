import React from 'react';
import Collection from '../Collection/collection';

function FlashcardCollection(props){
    return (
        <div className = "row row-spacer">
            <div className = "col-md-4">
                <Collection collection = {props.collection}/>
            </div>
        </div>
    );
}

export default FlashcardCollection;