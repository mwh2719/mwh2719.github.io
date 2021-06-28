"use strict";

//exporting to main
export{ setupUI, setupWebaudio, audioElement, audioCtx, audioLength, currentTime, requestFullscreen,NUM_SAMPLES, analyserNode, curvePercent, backgroundChange,lofi, dots, speaker, waveform, frequency};

//exporting to filters
export{bassBased};

//importing
import{makeDots} from './canvasUtil.js';


let playing = false;

let canvas = document.querySelector('canvas');

//creating the variables for setting up the web audio
let audioElement;
let audioCtx;
let sourceNode;
let analyserNode;
let gainNode;
let audioLength;
let currentTime;
let trebleFilter, bassFilter;

let waveform = false, frequency = false;

const NUM_SAMPLES = 2048;


//variables to hold values for filters
let bassBased = false, backgroundChange = false, lofi = false;

//variable to hold the slider value for the curves
let curvePercent;

let dots = false, speaker = false;

//function that sets up the web audio and the nodes
function setupWebaudio(){
    //creating the audiocontext and assigning it
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    //assigning the audio element
    audioElement = document.querySelector("audio");
    audioElement.src = document.querySelector("#songSelect").value;

    
    //setting up all the nodes
    sourceNode = audioCtx.createMediaElementSource(audioElement);

    analyserNode = audioCtx.createAnalyser();


    analyserNode.fftSize = NUM_SAMPLES;

    gainNode = audioCtx.createGain();
    gainNode.gain.value = 1;
    
    sourceNode.connect(gainNode);
    
    
    trebleFilter = audioCtx.createBiquadFilter();
    trebleFilter.type = "highshelf";
    trebleFilter.frequency.value = 5500;
    trebleFilter.gain.value = 0;
    gainNode.connect(trebleFilter);
    
    
    bassFilter = audioCtx.createBiquadFilter();
    bassFilter.type = "lowshelf";
    bassFilter.frequency.value = 5500;
    bassFilter.gain.value = 0;
    trebleFilter.connect(bassFilter);
    bassFilter.connect(analyserNode);
    
    
    
    analyserNode.connect(audioCtx.destination);
    
    audioElement.addEventListener("timeupdate", function() {
      currentTime = audioElement.currentTime;
    })
    audioElement.addEventListener("canplaythrough", function() {
      audioLength = audioElement.duration;
    })


}

//function to setup event handling for the UI
function setupUI(){
    
    document.querySelector("#songSelect").addEventListener('change',function(){
        document.querySelector("#play").innerHTML = "Play &#9658;";
        audioElement.src = document.querySelector("#songSelect").value;
        playing = false;
        makeDots();
    });
    
    document.querySelector("#play").addEventListener('click', function(){
        
        if (audioCtx.state == "suspended") {
            audioCtx.resume();
        }
        
        if(playing){
            document.querySelector("#play").innerHTML = "Play &#9658;";
            audioElement.pause();
            playing = false;
        }
        else{
            document.querySelector("#play").innerHTML = "Pause <b>||</b>";
            audioElement.play();
            playing = true;
        }
    }
    );
    
    document.querySelector("#restart").addEventListener('click',function(){
        audioElement.currentTime = 0;
        document.querySelector("#play").innerHTML = "Play &#9658;";
        audioElement.pause();
        playing = false;
    });
    
    document.querySelector("#waveform").addEventListener('click',function(){
        if(!waveform){
            document.querySelector("#waveform").innerHTML = "Hide";
        }
        else{
            document.querySelector("#waveform").innerHTML = "Show";                                         
        }
        waveform = !waveform;
    });
    
    document.querySelector("#frequency").addEventListener('click',function(){
        if(!frequency){
            document.querySelector("#frequency").innerHTML = "Hide";
        }
        else{
            document.querySelector("#frequency").innerHTML = "Show";                                             
        }
        frequency = !frequency;
    });
    
    
    document.querySelector("#bassBasedCB").addEventListener('click', function(){
        bassBased = document.querySelector("#bassBasedCB").checked;
    });
    
    document.querySelector("#backgroundCB").addEventListener('click', function(){
        backgroundChange = document.querySelector("#backgroundCB").checked;
    });
    
    document.querySelector("#LoFiCB").addEventListener('click', function(){
        lofi = document.querySelector("#LoFiCB").checked;
    });
    
    document.querySelector("#fsButton").onclick = _ =>{
				requestFullscreen(canvas);
			};
    
    let volumeSlider = document.querySelector("#volumeSlider");
    volumeSlider.oninput = e => {
        gainNode.gain.value = e.target.value;
        volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
    };
    volumeSlider.dispatchEvent(new InputEvent("input"));
    
    let frequencySlider = document.querySelector("#frequencySlider");
    frequencySlider.oninput = e => {

        if(e.target.value > 0){
            trebleFilter.gain.value = e.target.value*2;
            document.querySelector("#frequencyLabel").innerHTML = "Treble +" + e.target.value;
        }
        else if(e.target.value < 0){
            bassFilter.gain.value = e.target.value*(-2);
            document.querySelector("#frequencyLabel").innerHTML = "Bass +" + e.target.value*-1;
        }
        else if(e.target.value == 0){
            bassFilter.gain.value = e.target.value;
            trebleFilter.gain.value = e.target.value;
            document.querySelector("#frequencyLabel").innerHTML = 0;
        }
    };
    frequencySlider.dispatchEvent(new InputEvent("input"));
    
    document.querySelector("#curveSlider").oninput = e => {
        curvePercent = e.target.value;
        document.querySelector("#curveLabel").innerHTML = e.target.value;
    };
    document.querySelector("#curveSlider").dispatchEvent(new InputEvent("input"));
    
    for(let i = 0; i < document.getElementsByName("design").length; i++){
        document.getElementsByName("design")[i].oninput = e => {
            if(e.target.value == "none"){
                dots = false;
                speaker = false;
            }
            else if(e.target.value == "dots"){
                dots = true;
                speaker = false;
            }
            else if(e.target.value == "speaker"){
                dots = false;
                speaker = true;
            }
        }
    }
}

//function to make canvas fullscreen
function requestFullscreen(element) {
			if (element.requestFullscreen) {
			  element.requestFullscreen();
			} else if (element.mozRequestFullscreen) {
			  element.mozRequestFullscreen();
			} else if (element.mozRequestFullScreen) {
			  element.mozRequestFullScreen();
			} else if (element.webkitRequestFullscreen) {
			  element.webkitRequestFullscreen();
			}
		};