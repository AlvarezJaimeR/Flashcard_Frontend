import React, { Component } from 'react';
import './updateCollection.css';

class UpdateCollection extends Component {
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
        this.props.updateNewCollection(collection);
        this.setState({
            title: ''
        });
    }

    render() { 
        return (  
            <div>
                <form onSubmit ={this.handleSubmit}>
                    <div className = "row col-align">
                        <div className='left-side col-sml-6'>
                            <label>Current Title:</label>
                            <p>{this.props.currentTitle}</p>
                        </div>
                        <div className = "form-change col-sml-6">
                            <label>Update Title:</label>
                            <input type="text" name="title" value={this.state.title}
                            onChange={this.handleChange} />
                            <input type="submit" value="Update"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default UpdateCollection;