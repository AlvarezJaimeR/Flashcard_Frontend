import React from 'react';
import './titleBar.css';

function TitleBar(props) {
    return (
        <div className="title-bar">
            <div className="col-md-12" style = {{padding: 0}}>
                <div>
                    <h1>Collection of Flashcards</h1>
                </div>
            </div>
        </div>
    );
}

export default TitleBar;