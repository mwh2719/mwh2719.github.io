import * as React from 'react';
import { render } from 'react-dom';
import './App.css';
import GameScreen from './MyComponents';

class App extends React.Component{

    constructor(props) {
        super(props);

        //setting the game state of the app to start when the app is constructed
        this.state = { gameState: "start", results: null, questionNumber: 1, playerAnswer: null };

        this.apiCall = this.apiCall.bind(this);
        this.increment = this.increment.bind(this);
        this.transferToCheck = this.transferToCheck.bind(this);
    }

    //function to retrieve the trivia questions from the JSON API
    apiCall(e) {

        //preventing the submit buttons default behavior
        e.preventDefault();

        //saving the base url
        let url = 'https://opentdb.com/api.php?';

        //adding the amount of questions to the url
        url += "amount=" + e.target.amount.value;

        //adding to url based on user input
        if (e.target.category.value != "any")
        {
            url += "&category=" + e.target.category.value;
        }

        if (e.target.difficulty.value != "any")
        {
            url += "&difficulty=" + e.target.difficulty.value;
        }

        if (e.target.type.value != "any")
        {
            url += "&type=" + e.target.type.value;
        }

        //variable to hold the api call results
        let results;

        //trying to retrieve info
        try {
            fetch(url)
                .then(response => response.json())
                .then(data => results = data)
                .then(() => {
                    if (results.response_code) { alert("Could not retrieve questions. Please try again"); return; };
                    this.setState({ gameState: "game", results: results.results });
                });
        }
        catch (error) {
            alert("An error occured while trying to retrive questions")
        }

    }

    //Method that handles changing the game state to the answer check state
    transferToCheck(e) {
        this.setState({ gameState: "rightOrWrong", playerAnswer: e.target.value });
    }


    //Method that increments the question count and sets the state back to game and resets player answer
    increment() {
        this.setState({ questionNumber: ++this.state.questionNumber, gameState: "game", playerAnswer: null });
    }

    render(){
        return (
            <div className="App">
                <GameScreen currentState={this.state.gameState} database={this.apiCall} results={this.state.results} questionNumber={this.state.questionNumber}
                    incrementQuestion={this.increment} playerAnswer={this.state.playerAnswer} transferToCheck={this.transferToCheck} />
            </div>
        );
    }
}



export default App;
