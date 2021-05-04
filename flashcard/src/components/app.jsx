import React, { Component } from 'react';
import axios from 'axios';
import TitleBar from './TitleBar/titleBar';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            flashcardCollection: [],
            loading: true
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

    render() {
        return (
            this.state.loading ? <div>loading...</div>:
            <div className = "container-fluid">
                {console.log(this.state.flashcardCollection)}
                <TitleBar />
            </div>
        );
    }
}

export default App;