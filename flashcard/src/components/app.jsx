import React, { Component } from 'react';
import axios from 'axios';
import TitleBar from './TitleBar/titleBar';
import FlashcardCollection from './FlashcardCollection/flashcardCollection';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcardCollection: [],
            loading: true,
            display: true,
            collectionNumber: 0
        }
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

    test(){
        console.log('I am here');
        console.log(this.state.display);
        this.setState({
            display: false
        });
        console.log("I am now here" + this.state.display);
        this.state.display ? <div>Re-Loading...</div>:
        <FlashcardCollection />
    }

    render() {
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
                <div> 
                    <button onClick={() => this.test()}>New Page</button>
                </div>
            </div>
        );
    }
}

export default App;