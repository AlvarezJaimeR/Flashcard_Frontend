import React from 'react';
import './titleBar.css';

function TitleBar(props) {
    return (
        <div className="title-bar">
            <div className="col-md-12">
                <div>
                    <h1>{props.desiredTitle}</h1>
                </div>
            </div>
        </div>
    );
}

export default TitleBar;