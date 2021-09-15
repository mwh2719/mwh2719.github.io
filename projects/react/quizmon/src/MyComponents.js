import React from 'react'

//component that will display the welcome screen
function Welcome(props) {
    return (
        <div>
        <h1>Welcome to Quizmon - the triva app</h1>
            <form onSubmit={props.database}>
                <label for="amount">Number of Questions</label>
                <input type="number" id="amount" name="amount" min="1" max="50" defaultValue="10" />
                <label for="category">Category</label>
                <select id="category" name="category">
                    <option value="any">Random</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals & Theaters</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="31">Entertainment: Japanese Anime & Manga</option>
                    <option value="32">Entertainment: Cartoon & Animations</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                </select>
                <label for="difficulty">Difficulty</label>
                <select id="difficulty"name="difficulty">
                    <option value="any">Random</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <label for="type">Question type</label>
                <select id="type" name="type">
                    <option value="any">Random</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>
                <button type="submit">Start Game</button>
            </form>
        </div>
    );
}

//component that will display game and handle game logic 
function PlayGame(props) {
    return (
            <Question results={props.results[props.questionNumber - 1]} number={props.questionNumber} incrementQuestion={props.incrementQuestion} transfer={props.transfer} />
        );
}

function Question(props) {
    return (
        <div id="questionInfo">
            <h1>{props.results.category}</h1>
            <h3>{props.results.difficulty}</h3>
            <h2>{props.number}. {props.results.question}</h2>
            <Choices results={props.results} transfer={props.transfer} />
        </div>
        );
}

function Choices(props) {

    //helper function to shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    //Checking if the question is true /false or multiple choice
    if (props.results.type == "boolean") {
        return (
            <div id="answers">
                <button value="True" onClick={props.transfer}>True</button>
                <button value="False" onClick={props.transfer}>False</button>
            </div>
        );
    }
    else if (props.results.type == "multiple") {

        //Randomizing answer order
        let answers = props.results.incorrect_answers;
        answers.push(props.results.correct_answer);

        //Removing duplicates from the array
        let uniqueAnswers = [...new Set(answers)];

        answers = shuffle(uniqueAnswers);

        let choices = [];

        for (let i = 0; i < answers.length; i++) {
            choices.push(<button value={answers[i]} key={i} onClick={props.transfer}>{answers[i]}</button>);
        }

        return <div> {choices} </div>;
    }
    else {
        return <h1>This should not ever be seen</h1>;
	}
}

//component to handle checking if the player answered the question correctly and displaying it to them
function CheckAnswer(props) {

    //Helper function to move the player to the next question and save their answer result
    function onClick() {

        if (props.playerAnswer == props.results[props.questionNumber - 1].correct_answer) {
            props.incrementCorrect();
        }
        else {
            props.incrementWrong();
        }
        

        //Checking if this is the last question or not and changing what happens on click based of that
        if (props.questionNumber == props.results.length) {
            props.transfer();
        }
        else {
            props.incrementQuestion();
        }
    }

    if (props.playerAnswer == props.results[props.questionNumber - 1].correct_answer) {
        
        return (
            <div>
                <Results correct={true} />
                <button onClick={onClick}>Next</button>
            </div>
        );
    }
    else if (props.playerAnswer != props.results[props.questionNumber - 1].correct_answer) {
        
        return (
            <div>
                <Results correct={false} correct_answer={props.results[props.questionNumber - 1].correct_answer} playerAnswer={props.playerAnswer} />
                <button onClick={onClick}>Next</button>
            </div>
        );
    }
    else {
        return <h1>How did you even get here. Go back and try again</h1>
	}
}

function Results(props) {
    if (props.correct)
    {
        return (
            <div>
                <h1>Correct</h1>
            </div>
            )
    }
    else
    {
        return (
            <div>
                <h1>Incorrect</h1>
                <h3>You answered {props.playerAnswer}</h3>
                <h3>The correct answer was {props.correct_answer}</h3>
            </div>
            )
	}
}


//component that will display the end game screen
function GameOver(props) {
    //Variable to hold the number of questions the player answered
    let numberOfQuestions = props.correctAmount + props.wrongAmount;

    //variable to hold percent correct the playerAnswered
    let percentCorrect;

    percentCorrect = (props.correctAmount * 100) / (numberOfQuestions);

    return (
        <div>
            <h1>The End</h1>
            <h2>You scored {percentCorrect}% </h2> 
            <h3>Correct Answers: {props.correctAmount}</h3>
            <h3>Incorrect Answers: {props.wrongAmount}</h3>
            <button onClick={props.transfer}>Return to main menu</button>
        </div>
        );
}

//component that will display the users stats and handle logic for computing them
function Stats(props) {

    return (
        null
        );
}


//component that will display the game based on its current state
function GameScreen(props) {


    switch (props.currentState) {
        case "start":
            return <Welcome database={props.database} />;
            break;
        case "game":
            return <PlayGame results={props.results} questionNumber={props.questionNumber} transfer={props.transferToCheck} />;
            break;
        case "rightOrWrong":
            return <CheckAnswer results={props.results} questionNumber={props.questionNumber} incrementQuestion={props.incrementQuestion} playerAnswer={props.playerAnswer} transfer={props.transferToEnd}
                incrementWrong={props.incrementWrong} incrementCorrect={props.incrementCorrect} />;
            break;
        case "end":
            return <GameOver correctAmount={props.correctAmount} wrongAmount={props.wrongAmount} transfer={props.transferToStartMenu} />;
            break;
        case "stats":

            break;
        default:
            return <h1>An error has occured</h1>;
            break
	}
}




export default GameScreen