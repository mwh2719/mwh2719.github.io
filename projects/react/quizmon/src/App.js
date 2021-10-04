import * as React from 'react';
import { render } from 'react-dom';
import GameScreen from './MyComponents';

class App extends React.Component{

    

    

    constructor(props) {
        super(props);

        //setting the game state of the app to start when the app is constructed
        this.state = { gameState: "loading", results: null, questionNumber: 1, playerAnswer: null, correct: [], wrong: [], check: false, answerArray: [], answerCorrect: false, statsBasedOn: "best" };

        this.apiCall = this.apiCall.bind(this);
        this.increment = this.increment.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.transferToEnd = this.transferToEnd.bind(this);
        this.transferToStat = this.transferToStat.bind(this);
        this.transferToStartMenu = this.transferToStartMenu.bind(this);
        this.saveResult = this.saveResult.bind(this);
        this.saveAnswerOrder = this.saveAnswerOrder.bind(this);
        this.loaded = this.loaded.bind(this);
        this.checkResults = this.checkResults.bind(this);
        this.updateStatGraph = this.updateStatGraph.bind(this);


        this.audioSlide = new Audio("enter.wav");
        this.audioLobby = new Audio("loop.mp3");

        this.buttonClickAudio = new Audio("click.wav");


        this.audioLoadedCount = 0;

        
    }

    

    loaded() {
        this.audioLoadedCount++;
        if (this.audioLoadedCount == 2) {
            this.setState({ gameState: "start" });
        }
    }


    //function to retrieve the trivia questions from the JSON API
    apiCall(e) {
        this.buttonClickAudio.play();
        //preventing the submit buttons default behavior
        if (e.preventDefault) {
            e.preventDefault();
        }

        //saving the base url
        let url = 'https://opentdb.com/api.php?';

        let formData = (e.target) ? e.target : e;

        //adding the amount of questions to the url
        url += "amount=" + formData.amount.value;

        //adding to url based on user input
        if (formData.category.value != "any")
        {
            url += "&category=" + formData.category.value;
        }

        if (formData.difficulty.value != "any")
        {
            url += "&difficulty=" + formData.difficulty.value;
        }

        if (formData.type.value != "any")
        {
            url += "&type=" + formData.type.value;
        }

        //variable to hold the api call results
        let results;

        //trying to retrieve info
        try {
            fetch(url)
                .then(response => response.json())
                .then(data => results = data)
                .then(() => {
                    if (results.response_code) { alert("Could not retrieve questions with those inputs. Please adjust your inputs and try again"); return; };
                    //Calling method to check if the results are correct
                    if (this.checkResults(results.results, formData.amount.value, formData.category.value, formData.difficulty.value, formData.type.value))
                    { this.setState({ gameState: "game", results: results.results }); }
                    //If they are incorrect, calling the API database again
                    else {  this.apiCall(document.getElementById("question-options-form")); return; }
                });
        }
        catch (error) {
            alert("An error occured while trying to retrive questions")
        }

    }

    //Method that checks the results against the user input to make sure it matches
    checkResults(results, amount, category, difficulty, type) {
        //returning false if the results aare null
        if (!results || results.length <= 0) { return false; }


        //returning false if the wrong number of questions are returned
        if (results.length != amount) {
            return false;
        }

        //looping through the results and retruening false if any of the properties dont match the user input
        for (let i = 0; i < results.length; i++)
        {
            if (category !== "any") {
                if (results[i].category !== category) {
                    return false;
                }
            }
            if (difficulty !== "any") {
                if (results[i].difficulty !== difficulty) {
                    return false;
                }
            }
            if (type !== "any") {
                if (results[i].type !== type) {
                    return false;
                }
            }
        }
        return true;
    }


    //Method that saves the shuffled order of the answers as a state
    saveAnswerOrder(array) {
        this.setState({ answerArray: array });
    }


    //Method that handles changing the game state to the answer check state
    checkAnswer(e) {
        if (e.target) {
            if (e.target.value == this.state.results[this.state.questionNumber-1].correct_answer) {
                this.setState({ playerAnswer: e.target.value, check: true, answerCorrect: true });
            }
            else {
                this.setState({ playerAnswer: e.target.value, check: true, answerCorrect: false });
            }
        }
        else {
            this.setState({ playerAnswer: null, check: true, answerCorrect: false });
        }
    }


    //Method that increments the question count and sets the state back to game and resets player answer
    increment() {
        this.setState({ questionNumber: ++this.state.questionNumber, playerAnswer: null, check: false, answerArray: [], answerCorrect: false });
    }

    //Method to save question info to array for later usage
    saveResult(correct, questionInfo) {
        this.buttonClickAudio.play();
        questionInfo["questionNumber"] = this.state.questionNumber;
        if (correct) {
            this.setState(state => {
                const correct = state.correct.concat(questionInfo);
                return {
                    correct
                };
            })
        }
        else {
            this.setState(state => {
                const wrong = state.wrong.concat(questionInfo);
                return {
                    wrong
                };
            })
        }
    }

    //Method that changes the game state to the end sreen
    transferToEnd() {
        this.buttonClickAudio.play();
        this.setState({ gameState: "end", questionNumber: 1, playerAnswer: null})
    }

    //Method that changes game state to the stat screen
    transferToStat() {
        this.buttonClickAudio.play();
        this.setState({ gameState: "stats", statsBasedOn: "best" })
    }

    updateStatGraph(e) {
        this.setState({ statsBasedOn: e.target.value });
    }

    //Method that changes the game state to the start menu
    transferToStartMenu() {
        this.buttonClickAudio.play();
        this.setState({ gameState: "start", results: null, correct: [], wrong: [], answerArray: [], playerAnswer: null, check: false, answerCorrect: false })
    }


    render(){
        return (
            <div id="app">
                <GameScreen currentState={this.state.gameState} database={this.apiCall} results={this.state.results} questionNumber={this.state.questionNumber}
                    incrementQuestion={this.increment} playerAnswer={this.state.playerAnswer} checkAnswer={this.checkAnswer} transferToEnd={this.transferToEnd} transferToStat={this.transferToStat}
                    transferToStartMenu={this.transferToStartMenu} saveResult={this.saveResult} correct={this.state.correct} wrong={this.state.wrong} check={this.state.check}
                    saveAnswerOrder={this.saveAnswerOrder} answerArray={this.state.answerArray} answerCorrect={this.state.answerCorrect} audioSlide={this.audioSlide} audioLobby={this.audioLobby} loaded={this.loaded}
                    updateStatGraph={this.updateStatGraph} statsBasedOn={this.state.statsBasedOn} />
            </div>
        );
    }
}



export default App;
