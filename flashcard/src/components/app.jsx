import React, { Component } from 'react';
import axios from 'axios';
import TitleBar from './TitleBar/titleBar';
import FlashcardCollection from './FlashcardCollection/flashcardCollection';
import Flashcards from './Flashcards/flashcards';
import CollectionCreator from './CollectionCreator/collectionCreator';
import FlashcardCreator from './FlashcardCreator/flashcardCreator';
import FlashcardTitle from './FlashcardTitle/flashcardTitle';
import './app.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcardCollection: [],
            loading: true,
            flashcardButton: true,
            collectionButton: true,
            addFlashcardButton: true,
            deleteButton: true,
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

    deleteCollection(){
        console.log("delete collection button pressed");
        axios.delete('http://localhost:5000/api/collections/'+this.state.flashcardCollection[this.state.collectionNumber]._id)
        axios.get("http://localhost:5000/api/collections")
        .then(res => {
            console.log(res);
            const collections = res.data;
            console.log('before setting the state. delete: ', this.state.flashcardCollection);
            this.setState({flashcardCollection:collections, loading: false, deleteButton: false, collectionNumber: 0})
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
        //Flashcard Creator
        if(this.state.addFlashcardButton === false){
            return (
                <div>
                    <div>
                        <FlashcardCreator addNewFlashcard={this.addNewFlashcard.bind(this)}/>
                    </div>
                    <div>
                        <button onClick={() => this.displayMainMenu()}className='btn btn-success show-flashcard'>Collection Menu!</button>
                        <button onClick={() => this.showFlashcards()}className='btn btn-primary show-flashcard'>Flashcard Menu!</button>
                    </div>
                </div>
            )
        }
        //Collection Creator
        if(this.state.collectionButton === false){
            return (
                <div>
                    <FlashcardTitle desiredTitle = 'Collection Creator'/>
                    <div>
                        <CollectionCreator addNewCollection={this.addNewCollection.bind(this)}/>
                    </div>
                    <div>
                        <button onClick={() => this.displayMainMenu()}className='btn btn-success show-flashcard'>Collection Menu!</button>
                    </div>
                </div>
            )}
        //Show Flashcards
        if(this.state.flashcardButton === false){
            if (this.state.flashcardCollection[this.state.collectionNumber].cards.length === 0){
                return (
                <div>
                    <TitleBar desiredTitle = {this.state.flashcardCollection[this.state.collectionNumber].title}/>
                    <h1> No Flashcards available! </h1>
                    <button onClick={() => this.displayMainMenu()}className='btn btn-success show-flashcard'>Collection Menu!</button>
                    <button onClick={() => this.addFlashcard()}className='btn btn-primary show-flashcard'>Create new flashcards!</button>
                </div>
                )}
            else {
            return (
                <div>
                    <div>
                        <TitleBar desiredTitle = {this.state.flashcardCollection[this.state.collectionNumber].title}/>
                        <Flashcards flashcard = {this.state.flashcardCollection[this.state.collectionNumber].cards[this.state.flashcardNumber]}
                        nextCard={()=> this.goToNextFlashcard()} previousCard={()=> this.goToPreviousFlashcard()}
                        flashcardTotal = {this.state.flashcardCollection[this.state.collectionNumber].cards.length}
                        currentFlashcard = {this.state.flashcardNumber + 1}/>
                    </div>
                    <div>
                        <button onClick={() => this.displayMainMenu()}className='btn btn-success show-flashcard'>Collection Menu!</button>
                        <button onClick={() => this.addFlashcard()}className='btn btn-primary show-flashcard'>Create new flashcards!</button>
                    </div>
                </div>
                )}
            }
        //Initial Loading Screen
        if (this.state.loading === true){
            return (
                <div>
                    <h1>loading...</h1>
                </div>
            )}
        //Collection Card menu
        if (this.state.loading === false){
            if(this.state.deleteButton === true){
                return (
                    <div className = "container-fluid">
                    {console.log("fresh state", this.state)}
                    {console.log(this.state.flashcardCollection)}
                    {console.log(this.state.flashcardCollection[0].title)}
                    {console.log(this.state.flashcardCollection[0].cards)}
                    {console.log(this.state.flashcardCollection[0].cards[0].category)}
                    <TitleBar desiredTitle='Collection of Flashcards'/>
                    <FlashcardCollection collection = {this.state.flashcardCollection[this.state.collectionNumber]} 
                        nextCollection={()=> this.goToNextCollection()} previousCollection={()=> this.goToPreviousCollection()}/>
                        <div className = "row">
                            <div className='show-flashcard col-sml-4'>
                                <button onClick={() => this.showFlashcards()} className='btn btn-primary'>Flashcard Menu!</button>
                            </div>
                            <div className='show-flashcard col-sml-4'>
                                <button onClick={() => this.addCollection()} className='btn btn-success'>Add A New Collection</button>
                            </div>
                            <div className='show-flashcard col-sml-4'>
                                <button onClick={() => this.deleteCollection()} className='btn btn-danger'>Delete this Collection</button>
                            </div>
                        </div>
                    </div>
                )
            }else {
                return(
                <div className = "container-fluid">
                {console.log('after setting the state. delete: ', this.state.flashcardCollection)}
                {console.log('shows current collection #',this.state.flashcardCollection[this.state.collectionNumber])}
                <TitleBar desiredTitle='Collection of Flashcards'/>
                <FlashcardCollection collection = {this.state.flashcardCollection[this.state.collectionNumber]} 
                    nextCollection={()=> this.goToNextCollection()} previousCollection={()=> this.goToPreviousCollection()}/>
                    <div className='show-flashcard col-md-4'>
                        <button onClick={() => this.showFlashcards()} className='btn btn-primary'>Flashcard Menu!</button>
                    </div>
                    <div className='show-flashcard col-md-4'>
                        <button onClick={() => this.addCollection()} className='btn btn-success'>Add A New Collection</button>
                    </div>
                    <div className='show-flashcard col-md-4'>
                        <button onClick={() => this.deleteCollection()} className='btn btn-danger'>Delete this Collection</button>
                    </div>
                </div>
                ) 
            }
        }
    }
}
export default App;