import React from "react";
import './collection.css';

function Collection(props){
    return (
        <div className="collection">
            {console.log("in the collection function.")}
            {console.log(props.collection.title)}
            <div className="collection-cover">
                <h1 className = "title">{props.collection.title}</h1>
            </div>
        </div>
    )
}

export default Collection;