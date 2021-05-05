import React, { Component } from 'react';
import axios from 'axios';
import TitleBar from './TitleBar/titleBar';
import FlashcardCollection from './FlashcardCollection/flashcardCollection';
import Flashcards from './Flashcards/flashcards';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcardCollection: [],
            loading: true,
            flashcardButton: true,
            collectionNumber: 1,
            flashcardNumber: 0
        }
        this.displayFlashcards = this.displayFlashcards.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:5000/api/collections")
        .then(res => {
            console.log(res);
            const collections = res.data;
            this.setState({flashcardCollection:collections, loading: false})
        })
        .catch(err => {
            console.log(err)
        })
    }

    goToNextFlashcard(){
        let tempCard = this.state.flashcardNumber;
        tempCard++;
        if (tempCard === this.state.flashcardCollection[this.state.collectionNumber].cards.length){
            tempCard = 0;
        }
        this.setState({
            flashcardNumber: tempCard
        });
    }

    goToPreviousFlashcard(){
        let tempCard = this.state.flashcardNumber;
        tempCard--;
        if(tempCard < 0){
            tempCard = this.state.flashcardCollection[this.state.collectionNumber].cards.length-1;
        }
        this.setState({
            flashcardNumber: tempCard
        });
    }

    displayFlashcards(){
        this.setState({
            flashcardButton: false
        });
    }

    displayMainMenu(){
        this.setState({
            flashcardButton: true
        });
    }

    render() {
        {console.log("render", this.state.flashcardButton)}
        if(this.state.flashcardButton === false){
            return (
            <div>
            <div>
{/*                 {this.state.flashcardCollection[this.state.collectionNumber].cards.map((flashcards, index) =>
                    <Flashcards key = {index} flashcard = {flashcards} /> )} */}
                    <Flashcards flashcard = {this.state.flashcardCollection[this.state.collectionNumber].cards[this.state.flashcardNumber]}
                    nextCard={()=> this.goToNextFlashcard()} previousCard={()=> this.goToPreviousFlashcard()}/>
                </div>
                <div>
                    <button onClick={() => this.displayMainMenu()}>Main Menu!</button>
                </div>
            </div>
            )}
        if (this.state.loading === true){
            return (
                this.state.loading ? <div>loading...</div>:
                <div className = "container-fluid">
                    {console.log(this.state.flashcardCollection)}
                    {console.log(this.state.flashcardCollection[0].title)}
                    {console.log(this.state.flashcardCollection[0].cards)}
                    {console.log(this.state.flashcardCollection[0].cards[0].category)}
                    <TitleBar />
                    <div> 
                        {this.state.flashcardCollection.map((cardCollection, index) => 
                        <FlashcardCollection key = {index} collection={cardCollection} />)}
                    </div>
                </div>
            )}
        else if (this.state.loading === false){
            return (
                <div className = "container-fluid">
                {console.log(this.state.flashcardCollection)}
                {console.log(this.state.flashcardCollection[0].title)}
                {console.log(this.state.flashcardCollection[0].cards)}
                {console.log(this.state.flashcardCollection[0].cards[0].category)}
                <TitleBar />
                    <div> 
                        {this.state.flashcardCollection.map((cardCollection, index) => 
                        <FlashcardCollection key = {index} collection={cardCollection} />)}
                    </div>
                    <button onClick={() => this.displayFlashcards()}>Flashcards!</button>
                </div>
            )
        }
    }
}
export default App;