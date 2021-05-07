import React, { Component } from 'react';
import axios from 'axios';
import TitleBar from './TitleBar/titleBar';
import FlashcardCollection from './FlashcardCollection/flashcardCollection';
import Flashcards from './Flashcards/flashcards';
import CollectionCreator from './CollectionCreator/collectionCreator';
import FlashcardCreator from './FlashcardCreator/flashcardCreator';
import FlashcardTitle from './FlashcardTitle/flashcardTitle';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcardCollection: [],
            loading: true,
            flashcardButton: true,
            collectionButton: true,
            addFlashcardButton: true,
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

    addNewCollection(collection){
        axios.post("http://localhost:5000/api/collections", collection)
        .then( res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err)
        })
    }

    addNewFlashcard(flashcard){
        console.log("add new flashcard ", flashcard);
        axios.post("http://localhost:5000/api/collections/"+this.state.flashcardCollection[this.state.collectionNumber]._id+"/cards/", flashcard)
        .then(res => {
            console.log(res);
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

    displayMainMenu(){
        this.setState({
            flashcardButton: true,
            collectionButton: true,
            addFlashcardButton: true
        });

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

    showFlashcards(){
        this.setState({
            flashcardButton: false,
            addFlashcardButton: true,
            collectionButton: true
        });

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

    addCollection(){
        this.setState({
            collectionButton: false
        });
    }

    addFlashcard(){
        console.log("create flashcard button pressed");
        this.setState({
            addFlashcardButton: false
        });
    }

    render() {
        if(this.state.addFlashcardButton === false){
            return (
                <div>
                    <div>
                        <FlashcardCreator addNewFlashcard={this.addNewFlashcard.bind(this)}/>
                    </div>
                    <div>
                        <button onClick={() => this.displayMainMenu()}>Main Menu!</button>
                        <button onClick={() => this.showFlashcards()}>Show Collection Flashcards</button>
                    </div>
                </div>
            )
        }
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
            {if (this.state.flashcardCollection[this.state.collectionNumber].cards.length === 0){
                return (
                <div>
                    <FlashcardTitle collectionName = {this.state.flashcardCollection[this.state.collectionNumber].title}/>
                    <h1> No Flashcards available! </h1>
                    <button onClick={() => this.displayMainMenu()}>Main Menu!</button>
                    <button onClick={() => this.addFlashcard()}>Create new flashcards!</button>
                </div>
                )}
            else {
            return (
                <div>
                    <div>
                        <FlashcardTitle collectionName = {this.state.flashcardCollection[this.state.collectionNumber].title}/>
                        <Flashcards flashcard = {this.state.flashcardCollection[this.state.collectionNumber].cards[this.state.flashcardNumber]}
                        nextCard={()=> this.goToNextFlashcard()} previousCard={()=> this.goToPreviousFlashcard()}
                        flashcardTotal = {this.state.flashcardCollection[this.state.collectionNumber].cards.length}
                        currentFlashcard = {this.state.flashcardNumber + 1}/>
                    </div>
                    <div>
                        <button onClick={() => this.displayMainMenu()}>Main Menu!</button>
                        <button onClick={() => this.addFlashcard()}>Create new flashcards!</button>
                    </div>
                </div>
                )}
            }
        }
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