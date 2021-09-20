import React, { useEffect } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Particles from "react-tsparticles";

function Loading(props) {


    useEffect(() => {
        props.audioSlide.addEventListener('onCanPlayThrough', props.loaded());
        props.audioLobby.addEventListener('onCanPlayThrough', props.loaded());
    });

    return (
        <div>

        </div>
        );
}

//component that will display the welcome screen
function Welcome(props) {
    props.audioSlide.isPlaying = true;
    props.audioLobby.isPlaying = true;
    props.audioLobby.loop = true;

    return (
        <div className="content">
            
            <div id="welcome-div" className="welcome">
                <CSSTransitionGroup
                    transitionName="welcome-title"
                    transitionAppear={true}
                    transitionAppearTimeout={2000}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <h1 className="welcome title">Welcome to <span id="app-title">Quizmon</span> - the triva app</h1>
                </CSSTransitionGroup>
            </div>
            <CSSTransitionGroup
                transitionName="input-fade-in"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                <div id="input-div">
                    <hr />
                    <form onSubmit={props.database}>
                        <div id="input-fields">
                            <label htmlFor="amount">Number of Questions: </label>
                            <input type="number" id="amount" name="amount" min="1" max="50" defaultValue="10" /><br />
                            <label htmlFor="category">Category: </label>
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
                            </select><br />
                            <label htmlFor="difficulty">Difficulty: </label>
                            <select id="difficulty" name="difficulty">
                                <option value="any">Random</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select><br />
                            <label htmlFor="type">Question type: </label>
                            <select id="type" name="type">
                                <option value="any">Random</option>
                                <option value="multiple">Multiple Choice</option>
                                <option value="boolean">True / False</option>
                            </select>
                        </div>
                        <button type="submit" className="menu button">Start Game</button>
                    </form>
                </div>
            </CSSTransitionGroup>
        </div>
    ); 
}

//component that will display game and handle game logic 
function PlayGame(props) {
    let answers = [];

    //helper function to shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    if (props.results[props.questionNumber - 1].type == "boolean") {
        answers.push("True");
        answers.push("False");
    }
    else {
        answers = props.results[props.questionNumber - 1].incorrect_answers;

        //Randomizing answer order
        answers.push(props.results[props.questionNumber - 1].correct_answer);

        //Removing duplicates from the array
        let uniqueAnswers = [...new Set(answers)];

        answers = shuffle(uniqueAnswers);
    }

    


    function selectAnswer(e) {
        props.saveAnswerOrder(answers);
        props.checkAnswer(e);
    }

    let timer = <div id="timer-wrap">
        <audio className="game audio" id="countdown-music" autoPlay={!props.check}>
            <source src="countdown.wav" />
        </audio>
        <CountdownCircleTimer isPlaying duration={30} colors={[
            ['#18A835', 0.33],
            ['#E0D401', 0.33],
            ['#E52809', 0.33],
        ]} size={75} rotation='counterclockwise' onComplete={selectAnswer} />
    </div>;
    let results = null;
    let particleEffect = null;
    if (props.check) {
        timer = <div id="timer-wrap"></div>;
        results = <Results correct={props.answerCorrect} nextQuestion={nextQuestion} />;
        particleEffect = (props.answerCorrect) ? <Confetti /> : <Rain />;
    }

    //Helper function to move the player to the next question and save their answer result
    function nextQuestion() {

        props.saveResult(props.answerCorrect, props.results[props.questionNumber - 1]);

        //Checking if this is the last question or not and changing what happens on click based of that
        if (props.questionNumber == props.results.length) {
            props.transfer();
        }
        else {
            props.incrementQuestion();
        }
    }

    return (
        <div>
            <div className="content">
                <button className="menu button" id="escape" onClick={props.transferToStartMenu}>X</button>
            {timer}
            <Question results={props.results[props.questionNumber - 1]} number={props.questionNumber} answered={props.check} answerArray={props.answerArray} playerAnswer={props.playerAnswer}
                answers={answers} selectAnswer={selectAnswer} />
            {results}
            </div>
            {particleEffect}
        </div>
        );
}

function Question(props) {


    let question = props.results.question;

    //changing special entities to corresponding character
    question = cleanString(question);

    return (
        <div id="question-wrap">
            <div id="question-info">
                <CSSTransitionGroup
                    transitionName="question-anim"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <h1>{props.results.category}</h1>
                    <h3>Difficulty: {props.results.difficulty}</h3>
                    <h2>{props.number}. {question}</h2>
                </CSSTransitionGroup>
            </div>
            <Choices result={props.results} answered={props.answered} answerArray={props.answerArray} playerAnswer={props.playerAnswer}
                answers={props.answers} selectAnswer={props.selectAnswer} />
        </div>
        );
}

function Choices(props) {
    let disabled = false;

    let choices = [];
    if (props.answered) {
        disabled = true;
    }
    let className = "";

    

        //Checking if the question if there is a question order saved
    if (props.answerArray.length > 0) {
        for (let i = 0; i < props.answerArray.length; i++) {

            className = "";


            if (props.answerArray[i] == props.result.correct_answer) {
                className = "right-answer ";
            }
            else if (props.answerArray[i] == props.playerAnswer) {
                className = "wrong-answer ";
            }

            if (props.result.type == "boolean") { className += "boolean "; }
            else { className += "mult-choice "; }

            choices.push(<button value={props.answerArray[i]} key={i} className={className} disabled={disabled} >{cleanString(props.answerArray[i])}</button>);
        }
    }
    else {

        if (props.result.type == "boolean") {
            console.log(props.result);
            className += "boolean ";
            choices.push(<button value="True" className={className} disabled={disabled} onClick={props.selectAnswer}>True</button>);
            choices.push(<button value="False" className={className} disabled={disabled} onClick={props.selectAnswer}>False</button>);
        }
        else {
            className += "mult-choice ";
            for (let i = 0; i < props.answers.length; i++) {
                choices.push(<button value={props.answers[i]} key={i} onClick={props.selectAnswer} className={className} disabled={disabled} >{cleanString(props.answers[i])}</button>);
            }
        }

        
    }
    


    
    

    return <div id="answers">
        <CSSTransitionGroup
            transitionName="choice-growing"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnter={false}
            transitionLeave={false}>
            {choices}
        </CSSTransitionGroup>
    </div>;
}

function Results(props) {
    if (props.correct)
    {
        return (
            <div>
                <audio autoPlay={true} id="right-buzz" className="game audio right">
                    <source src="correct.wav" />
                </audio>
                <button onClick={props.nextQuestion} id="next-button" className="menu button">Next &#10140;</button>
            </div>
            )
    }
    else
    {
        return (
            <div>
                <audio autoPlay={true} id="wrong-buzz" className="game audio wrong">
                    <source src="incorrect.mp3" />
                </audio>
                <button onClick={props.nextQuestion} id="next-button" className="menu button">Next &#10140;</button>
            </div>
            )
	}
}


//component that will display the end game screen
function GameOver(props) {
    //Variable to hold the number of questions the player answered
    let numberOfQuestions = props.correct.length + props.wrong.length;

    //variable to hold percent correct the playerAnswered
    let percentCorrect;

    percentCorrect = Math.floor((props.correct.length * 100) / (numberOfQuestions));

    let particleEffect = (percentCorrect > 50) ? <Fireworks /> : <Smoke />;
    let audio;
    let response = <h1 id="end-response">Better luck next time</h1>;
    if (percentCorrect > 50) {
        audio = <audio autoPlay={true} loop={true}><source src="fireworks.wav" /></audio>
        response = <h1 id="end-response">Great job</h1>;
    }
    


    return (
        <div>
            <div className="content">
                {response}
                <h1 id="score">{percentCorrect}%</h1>
                <h3>Correct Answers: {props.correct.length}</h3>
                <h3>Incorrect Answers: {props.wrong.length}</h3>
                <button onClick={props.transfer} className="menu button" id="menu-return-button">Return to menu</button>
            </div>
            {audio}
            {particleEffect}
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
        case "loading":
            return <Loading audioSlide={props.audioSlide} audioLobby={props.audioLobby} loaded={props.loaded} />;
            break;
        case "start":
            return <Welcome database={props.database} audioSlide={props.audioSlide} audioLobby={props.audioLobby} />;
            break;
        case "game":
            return <PlayGame results={props.results} questionNumber={props.questionNumber} checkAnswer={props.checkAnswer}
                transfer={props.transferToEnd} check={props.check} incrementQuestion={props.incrementQuestion} playerAnswer={props.playerAnswer}
                saveResult={props.saveResult} saveAnswerOrder={props.saveAnswerOrder} answerArray={props.answerArray} answerCorrect={props.answerCorrect} transferToStartMenu={props.transferToStartMenu} />;
            break;
        case "end":
            return <GameOver correct={props.correct} wrong={props.wrong} transfer={props.transferToStartMenu} />;
            break;
        case "stats":

            break;
        default:
            return <h1>An error has occured</h1>;
            break
	}
}

//helper function to remove html special entities and replace them with corresponding character
function cleanString(string) {
    return string.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'').replace(/&amp;/g, '\&').replace(/&Uuml;/g, '\Ü').replace(/&deg;/g, '\°').replace(/&ouml;/g, '\ö').replace(/&rsquo;/g, '\'')
        .replace(/&minus;/g, '\-').replace(/&iacute;/g, '\í').replace(/&oacute;/g, '\ó').replace(/&rdquo;/g, '\"').replace(/&ldquo;/g, '\"').replace(/&lt;/g, '\<').replace(/&lt;/g, '\>')
        .replace(/&ne;/g, '\≠').replace(/&le;/g, '\≤').replace(/&le;/g, '\≥').replace(/&uuml;/g, '\ü').replace(/&eacute;/g, '\é');
}

//Function to return firework particle effect
function Fireworks(props) {
    return (
        <Particles options={{
            background: {
                color: "#075FA3",
                opacity: 1
            },
            fullScreen: {
                enable: true
            },
            fpsLimit: 60,
            emitters: {
                direction: "top",
                life: {
                    count: 0,
                    duration: 0.1,
                    delay: 0.1
                },
                rate: {
                    delay: 0.5,
                    quantity: 1
                },
                size: {
                    width: 100,
                    height: 0
                },
                position: {
                    y: 100,
                    x: 50
                }
            },
            particles: {
                number: {
                    value: 0
                },
                destroy: {
                    mode: "split",
                    split: {
                        count: 1,
                        factor: { value: 1 / 3 },
                        rate: {
                            value: 100
                        },
                        particles: {
                            stroke: {
                                color: {
                                    value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
                                },
                                width: 1
                            },
                            number: {
                                value: 0
                            },
                            collisions: {
                                enable: false
                            },
                            opacity: {
                                value: 1,
                                animation: {
                                    enable: true,
                                    speed: 0.6,
                                    minimumValue: 0.1,
                                    sync: false,
                                    startValue: "max",
                                    destroy: "min"
                                }
                            },
                            shape: {
                                type: "circle"
                            },
                            size: {
                                value: 1,
                                animation: {
                                    enable: false
                                }
                            },
                            life: {
                                count: 1,
                                duration: {
                                    value: {
                                        min: 1,
                                        max: 5
                                    }
                                }
                            },
                            move: {
                                enable: true,
                                gravity: {
                                    enable: false
                                },
                                speed: 3,
                                direction: "none",
                                random: true,
                                straight: false,
                                outMode: "destroy"
                            }
                        }
                    }
                },
                life: {
                    count: 2
                },
                shape: {
                    type: "line"
                },
                size: {
                    value: { min: 0.1, max: 90 },
                    animation: {
                        enable: true,
                        sync: true,
                        speed: 150,
                        startValue: "max",
                        destroy: "min"
                    }
                },
                stroke: {
                    color: {
                        value: "#ffffff"
                    },
                    width: 1
                },
                rotate: {
                    path: true
                },
                move: {
                    enable: true,
                    gravity: {
                        acceleration: 15,
                        enable: true,
                        inverse: true,
                        maxSpeed: 100
                    },
                    speed: { min: 10, max: 20 },
                    outModes: {
                        default: "destroy",
                        top: "none"
                    },
                    
                }
            }
        }}/>
    )
}

//Funtion to return smoke particle effect
function Smoke(props) {
    return (
        <Particles options={{
            background: {
                color: "#075FA3",
                opacity: 1
            },
            fullScreen: {
                enable: true
            },
            fpsLimit: 60,
            particles: {
                number: {
                    value: 0,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ff0000",
                    animation: {
                        enable: true,
                        speed: 20,
                        sync: true
                    }
                },
                shape: {
                    type: "image",
                    options: {
                        image: {
                            src:
                                "https://www.blog.jonnycornwell.com/wp-content/uploads/2012/07/Smoke10.png",
                            width: 256,
                            height: 256
                        }
                    }
                },
                opacity: {
                    value: 1,
                    random: false,
                    animation: {
                        enable: true,
                        speed: 0.5,
                        minimumValue: 0,
                        sync: false
                    }
                },
                size: {
                    value: 64,
                    random: { enable: true, minimumValue: 32 },
                    animation: {
                        enable: false,
                        speed: 20,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                links: {
                    enable: false,
                    distance: 100,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                life: {
                    duration: {
                        value: 20
                    },
                    count: 1
                },
                move: {
                    enable: true,
                    gravity: {
                        enable: true,
                        acceleration: -0.5
                    },
                    speed: 3,
                    direction: "top",
                    random: false,
                    straight: false,
                    outModes: {
                        default: "destroy",
                        bottom: "none"
                    },
                    attract: {
                        enable: true,
                        distance: 300,
                        rotate: {
                            x: 600,
                            y: 1200
                        }
                    }
                }
            },
            emitters: {
                direction: "top",
                rate: {
                    quantity: 50,
                    delay: 0.05
                },
                size: {
                    width: 100,
                    height: 10
                },
                position: {
                    x: 50,
                    y: 110
                }
            }
        }} />
    )
}

//Funtion to return rain particle effect
function Rain(props) {
    return (
        <Particles className="particles"
            options={{
            background: {
                color: "#E52809",
                opacity: .7
            },
            fullScreen: {
                enable: true
            },
            fpsLimit: 60,
            particles: {
                color: {
                    value: "#ffffff"
                },
                lineLinked: {
                    blink: false,
                    color: "#000",
                    consent: false,
                    distance: 150,
                    enable: false,
                    opacity: 0,
                    width: 0
                },
                rotate: {
                    value: 0,
                    random: false,
                    direction: "clockwise",
                    animation: {
                        enable: false,
                        speed: 5,
                        sync: false
                    }
                },
                move: {
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    },
                    bounce: false,
                    direction: "bottom",
                    enable: true,
                    outMode: "out",
                    random: true,
                    speed: 30,
                    straight: true
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    limit: 0,
                    value: 200
                },
                opacity: {
                    animation: {
                        enable: false,
                        minimumValue: 0.1,
                        speed: 1,
                        sync: false
                    },
                    random: false,
                    value: 1
                },
                shape: {
                    character: {
                        fill: false,
                        font: "Verdana",
                        style: "",
                        value: "*",
                        weight: "400"
                    },
                    image: [],
                    polygon: {
                        nb_sides: 5
                    },
                    stroke: {
                        color: "#efefefee",
                        width: 1
                    },
                    type: "line"
                },
                size: {
                    animation: {
                        enable: false,
                        minimumValue: 0.1,
                        speed: 40,
                        sync: false
                    },
                    random: true
                }
            },
            polygon: {
                draw: {
                    enable: false,
                    lineColor: "#ffffff",
                    lineWidth: 0.5
                },
                move: {
                    radius: 10
                },
                scale: 1,
                type: "none",
                url: ""
            }
            }} />
    )
}

//Funtion to return confetti particle effect
function Confetti(props) {
    return (
        <Particles className="particles"
            options={{
                background: {
                    color: "#18A835",
                    opacity: .5
                },
                fullScreen: {
                    enable: true
                },
                particles: {
                    number: {
                        value: 0
                    },
                    color: {
                        value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"]
                    },
                    shape: {
                        type: ["circle", "square"]
                    },
                    opacity: {
                        value: {
                            max: 1,
                            min: 0
                        },
                        animation: {
                            enable: true,
                            speed: 2,
                            startValue: "max",
                            destroy: "min"
                        }
                    },
                    size: {
                        value: { min: 3, max: 7 }
                    },
                    life: {
                        duration: {
                            sync: true,
                            value: 5
                        },
                        count: 1
                    },
                    move: {
                        enable: true,
                        gravity: {
                            enable: true,
                            acceleration: 20
                        },
                        speed: {
                            min: 25,
                            max: 50
                        },
                        drift: {
                            min: -2,
                            max: 2
                        },
                        decay: 0.05,
                        direction: "none",
                        outModes: {
                            default: "destroy",
                            top: "none"
                        }
                    },
                    rotate: {
                        value: {
                            min: 0,
                            max: 360
                        },
                        direction: "random",
                        move: true,
                        animation: {
                            enable: true,
                            speed: 60
                        }
                    },
                    tilt: {
                        direction: "random",
                        enable: true,
                        move: true,
                        value: {
                            min: 0,
                            max: 360
                        },
                        animation: {
                            enable: true,
                            speed: 60
                        }
                    },
                    roll: {
                        darken: {
                            enable: true,
                            value: 25
                        },
                        enable: true,
                        speed: {
                            min: 15,
                            max: 25
                        }
                    },
                    wobble: {
                        distance: 30,
                        enable: true,
                        move: true,
                        speed: {
                            min: -15,
                            max: 15
                        }
                    }
                },
                responsive: [
                    {
                        maxWidth: 700,
                        options: {
                            particles: {
                                move: {
                                    speed: 20,
                                    decay: 0.1
                                }
                            },
                            emitters: [
                                {
                                    direction: "top-right",
                                    rate: {
                                        delay: 0.1,
                                        quantity: 3
                                    },
                                    position: {
                                        x: 0,
                                        y: 50
                                    },
                                    size: {
                                        width: 0,
                                        height: 0
                                    }
                                },
                                {
                                    direction: "top-left",
                                    rate: {
                                        delay: 0.1,
                                        quantity: 3
                                    },
                                    position: {
                                        x: 100,
                                        y: 50
                                    },
                                    size: {
                                        width: 0,
                                        height: 0
                                    }
                                }
                            ]
                        }
                    }
                ],
                emitters: [
                    {
                        direction: "top-right",
                        rate: {
                            delay: 0.1,
                            quantity: 10
                        },
                        position: {
                            x: 0,
                            y: 50
                        },
                        size: {
                            width: 0,
                            height: 0
                        }
                    },
                    {
                        direction: "top-left",
                        rate: {
                            delay: 0.1,
                            quantity: 10
                        },
                        position: {
                            x: 100,
                            y: 50
                        },
                        size: {
                            width: 0,
                            height: 0
                        }
                    }
                ]

            }}/>
    )
}




export default GameScreen