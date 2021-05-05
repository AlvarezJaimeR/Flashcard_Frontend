import React from "react";

function Collection(props){
    return (
        <div className="collection">
            <div className="front">
                <h1 className = "title">{props.collection.title}</h1>
            </div>
        </div>
    )
}

export default Collection;