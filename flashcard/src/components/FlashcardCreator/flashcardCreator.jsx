import React, { Component } from 'react';
import FlashcardTitle from '../FlashcardTitle/flashcardTitle';

class FlashcardCreator extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: '',
            question: '',
            answer: ''
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
        console.log(this.state.category);
        console.log(this.state.question);
        console.log(this.state.answer);
        const flashcard = {
            category: this.state.category,
            question: this.state.question,
            answer: this.state.answer
        }
        this.props.addNewFlashcard(flashcard);
        this.setState({
            category: '',
            question: '',
            answer: ''
        });
    }

    render() { 
        return (  
            <div>
                <FlashcardTitle desiredTitle='Flashcard Creator'/>
                <form onSubmit ={this.handleSubmit}>
                    <div className = "row col-align">
                        <div className = "col-md-3">
                            <label>Category:</label>
                            <input type="text" name="category" value={this.state.category}
                            onChange={this.handleChange} />
                        </div>
                        <div className = "col-md-3">
                            <label>Question:</label>
                            <input type="text" name="question" value={this.state.question}
                            onChange={this.handleChange} />
                        </div>
                        <div className = "col-md-3">
                            <label>Answer:</label>
                            <input type="text" name="answer" value={this.state.answer}
                            onChange={this.handleChange} />
                        </div>
                        <div className="col-md-3">
                            <input type="submit" value="Add"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default FlashcardCreator;