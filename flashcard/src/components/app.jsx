import React, { Component } from 'react';
import axios from 'axios';
import TitleBar from './TitleBar/titleBar';
import FlashcardCollection from './FlashcardCollection/flashcardCollection';
import Flashcards from './Flashcards/flashcards';
import CollectionCreator from './CollectionCreator/collectionCreator';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcardCollection: [],
            loading: true,
            flashcardButton: true,
            collectionButton: true,
            collectionNumber: 0,
            flashcardNumber: 0
        }
        this.showFlashcards = this.showFlashcards.bind(this);
        this.addCollection = this.addCollection.bind(this);
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

    goToNextCollection(){
        let tempCollection = this.state.collectionNumber;
        tempCollection++;
        if (tempCollection === this.state.flashcardCollection.length){
            tempCollection = 0;
        }
        this.setState({
            collectionNumber: tempCollection
        });
    }

    goToPreviousCollection(){
        let tempCollection = this.state.collectionNumber;
        tempCollection--;
        if(tempCollection < 0){
            tempCollection = this.state.flashcardCollection.length-1;
        }
        this.setState({
            collectionNumber: tempCollection
        });
    }

    addNewCollection(collection){
        this.state.flashcardCollection.push(collection);
        this.setState({
            collectionNumber: this.state.flashcardCollection.length - 1
        });
    }

    displayMainMenu(){
        this.setState({
            flashcardButton: true,
            collectionButton: true
        });
    }

    showFlashcards(){
        this.setState({
            flashcardButton: false
        });
    }

    addCollection(){
        {console.log("Add collection button clicked.")}
        this.setState({
            collectionButton: false
        });
    }

    render() {
        if(this.state.collectionButton === false){
            return (
                <div>
                    <div>
                        <CollectionCreator addNewCollection={this.addNewCollection.bind(this)}/>
                    </div>
                    <div>
                        <button onClick={() => this.displayMainMenu()}>Main Menu!</button>
                    </div>
                </div>
            )}
        if(this.state.flashcardButton === false){
            return (
            <div>
                <div>
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
                <div>
                    <h1>loading...</h1>
                </div>
            )}
        if (this.state.loading === false){
            return (
                <div className = "container-fluid">
                {console.log("fresh state", this.state)}
                {console.log(this.state.flashcardCollection)}
                {console.log(this.state.flashcardCollection[0].title)}
                {console.log(this.state.flashcardCollection[0].cards)}
                {console.log(this.state.flashcardCollection[0].cards[0].category)}
                <TitleBar />
                <FlashcardCollection collection = {this.state.flashcardCollection[this.state.collectionNumber]} 
                    nextCollection={()=> this.goToNextCollection()} previousCollection={()=> this.goToPreviousCollection()}/>
                    <div>
                        <button onClick={() => this.showFlashcards()}>Show Collection Flashcards</button>
                    </div>
                    <div>
                        <button onClick={() => this.addCollection()}>Add A New Collection</button>
                    </div>
                </div>
            )
        }
    }
}
export default App;

/* Map through a collection and display all of the content
<div> 
{this.state.flashcardCollection.map((cardCollection, index) => 
<FlashcardCollection key = {index} collection={cardCollection} />)}
</div> */