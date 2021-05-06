import React, { Component } from 'react';

class CollectionCreator extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: ''
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("handle Change Event:", event);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.title);
        const collection = {
            title: this.state.title
        }
        this.props.addNewCollection(collection);
        this.setState({
            title: ''
        });
    }

    render() {
        return (  
            <div>
                <form onSubmit ={this.handleSubmit}>
                    <div className = "row col-align">
                        <div className = "col-md-4">
                            <label>Title:</label>
                            <input type="text" name="title" value={this.state.title}
                            onChange={this.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <input type="submit" value="Add"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CollectionCreator;