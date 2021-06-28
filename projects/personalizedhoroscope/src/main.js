import {ResultWithSim, SearchTerm} from "./classes.js";
import {headerInfo, footerCopyright} from "./vue-componets.js";

const app = new Vue({
	el: '#app',
	data: {
        sign: "Aries",
        signSource: "",
        result: "",
        results: [],
        horoscope: "",
        index: 0,
        rating: -1,
        previousRating: "",
        database: firebase.database(),
        urls: [],
        emoji: "media/verysad.png",
        interval:false,
        count:0,
        disable: true,
        disableTT: false,
        previous: [],
        highestPrevious: "",
        resultsWithSim: [],
        searchTerm: "",
        prefix: "mwh2719",
        searchKey: "search",
        searchWord: "",
        searchResults: [],
        hidden: false,
        hideButton: true,
        placeholder: ""
	},
    //calling functions to run when the page loads
    created(){
        //retrieving the data fromm local storage to be used on the page
        this.searchKey = this.prefix + "search";
        this.signKey = this.prefix + "sign";
        this.searchWord = localStorage.getItem(this.searchKey);
        if(localStorage.getItem(this.signKey)){
            this.sign = localStorage.getItem(this.signKey);
        }
        //calling the functions
        this.makeURLList();
        
        this.updateSign();
    },
	methods:{
        //putting the API's for the horoscopes into a url list to be used later
    makeURLList(){
        
        this.urls.length = 0;
        this.urls.push('https://cors-anywhere.herokuapp.com/http://sandipbgt.com/theastrologer/api/horoscope/' + this.sign.toLowerCase()+'/today/');
        this.urls.push('https://cors-anywhere.herokuapp.com/http://horoscope-api.herokuapp.com/horoscope/today/' + this.sign);
        this.urls.push('https://cors-anywhere.herokuapp.com/http://widgets.fabulously40.com/horoscope.json?sign=' + this.sign.toLowerCase());
        this.urls.push('https://cors-anywhere.herokuapp.com/http://ohmanda.com/api/horoscope/' + this.sign.toLowerCase());
        
        //calling the search function
        this.search();
    },
        //function to go through the url list and retrieve the horoscopes from each website based on the selected sign
	search(){
		//if (! this.term.trim()) return;
        this.horoscope = "";
        this.hidden = false;
        this.hideButton = true;
        this.results.length = 0;
        this.index = 0;
        //looping through the urls and retrieving the horoscopes
        for(let u of this.urls){
		fetch(u)
		.then(response => {
			if(!response.ok){
				throw Error('ERROR: ${response.statusText}');
			}
			return response.json();
		})
		.then(json => {	
            this.result = json;
            this.results.push(this.checkingCopyright(this.result));
            if(this.urls.length == this.results.length){
                this.database.ref("ratings/"+this.sign).once("value", this.findKeys, this.firebaseError);
            }
		})
        }
        
        //reseting the page
        this.rating = -1;
        this.disable = true;
        this.disableTT = false;
        this.updateEmoji();
        
                    
        
        
	   },// end search
        //updating the sign image displayed in the jumbotron when the user selects a different sign
        //also saves the sign value to local storage
        updateSign(){
            this.signSource = "media/" + this.sign + ".png"
            localStorage.setItem(this.signKey, this.sign);
        },
        //moving to the next horoscope when the user clicks the next button
        nextHoroscope(){
            //resteing the page
            this.horoscope = "";
            this.hidden = false;
            this.hideButton = true;
            this.index++;
            this.disable = true;
            this.disableTT = false;
            
            //reseting the displayed emoji
            this.updateEmoji();
            
            //checking if the user has searched for a term and setting to loop through the correct array of results
            let value;
            if(this.searchResults.length > 0){
                value = this.searchResults.length-1;
            }
            else{
                value = this.resultsWithSim.length - 1;
            }
            if(value >= this.index){
                if(this.searchResults.length == 0){
                    this.hidden = true;
                    this.hideButton = false;
                    this.horoscope = this.resultsWithSim[this.index].horoscope;
                }
                else{
                    this.hidden = true;
                    this.hideButton = false;
                    this.horoscope = this.searchResults[this.index].horoscope;
                }
            }
            //displaying message when there are no more horoscopes in the array
            else{
                this.hidden = true;
                this.hideButton = true;
                this.horoscope = "Sorry but that is all the horoscopes we can find for you today";
            }
        },
        //setting which emoji to display based of the accuracy rating set
        updateEmoji(){
            if(this.rating < .2){
                this.emoji = "media/verysad.png";   
            }
            else if(this.rating < .4){
                this.emoji = "media/sad.png";   
            }
            else if(this.rating < .6){
                this.emoji = "media/neutral.png";   
            }
            else if(this.rating < .8){
                this.emoji = "media/happy.webp";   
            }
            else{
                this.emoji = "media/veryhappy.png";   
            }
        },
        //saving the rating on firebase when the user clicks the next button
        submitRating(){
            if(this.rating == -1){
                return;
            }
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth();
            if(day < 10){
                day = "0"+day;
            }
            if(month < 10){
                month = "0"+month;
            }
            let rated = {
                sign: this.sign,
                horoscope: this.horoscope,
                rating: this.rating,
                date:  month+ "-" + day + "-" + date.getFullYear()
            }
            let ref = this.database.ref('ratings/' +this.sign);
            ref.push(rated);
            
            //reseting the rating slider
            this.rating = -1;
            //calling function to display the next horoscope
            this.nextHoroscope();
        },
        //checking to see if the horoscope returned has the copyright info on the end
        //if it does, removing the copyright info
        checkingCopyright(object){
            if(object.horoscope[object.horoscope.length - 59] == "("){
                
                object.horoscope = object.horoscope.slice(0, object.horoscope.length-59);
            }
            return object;
        },
        //function that will be called while the user is clicked on the rating slider and updates the emoji real time
        sliderHeld(){
            this.disable = false;
            this.disableTT = true;
            if(!this.interval){
                this.interval = setInterval(() => this.updateEmoji(), 30)
              }
        },
        //function called when the user releases the rating slider
        sliderReleased(){
            clearInterval(this.interval)
            this.interval = false
        },
        //function that loops through the horoscopes and compares them to the previous highest ranked horoscopes on firebase and saves their similarities
        //also saves the mood type and moodscore of the horoscopes
        findingSimilarty(){
            this.resultsWithSim.length = 0;
            this.highestPrevious = "";
            //saving the highest previously ranked horoscope
            //have to add only comparing it to the highest scored horoscope to avoid calling the API to many times
            for(let p of this.previous){
                if(this.highestPrevious.length == ""){
                    this.highestPrevious = p;   
                }
                else{
                    if(this.highestPreviousrating < p.rating){
                        this.highestPrevious = p;
                    }

                }
            }
            //looping through all the horoscope results
                for(let r = 0; r < this.results.length; r++){
                    let text;
                    //saving the horoscope text
                    if(this.results[r].horoscope.horoscope == undefined){
                        text = this.results[r].horoscope;
                    }
                    else{
                        text = this.results[r].horoscope.horoscope;
                    }
                    //calling API to find the mood and moodscore of the selected horoscope
                    fetch("https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text="+text+"&token=ef45543309bf47c0829cb8ab19b82460")
                    .then(response => {
                        if(!response.ok){
                            throw Error('ERROR: ${response.statusText}');
                        }
                        return response.json();
                    })
                    .then(json => {	
                        //adding the mood and moodscore values to an object array
                        this.resultsWithSim[r] = new ResultWithSim(json.sentiment.type, json.sentiment.score);
                    });
                    
                    //calling API to find the similarity between highest ranked previous horoscope and current horoscope
                    fetch("https://api.dandelion.eu/datatxt/sim/v1/?text1="+text+"&text2="+this.highestPrevious.horoscope+"&token=ef45543309bf47c0829cb8ab19b82460")
                    .then(response => {
                        if(!response.ok){
                            throw Error('ERROR: ${response.statusText}');
                        }
                        return response.json();
                    })
                    .then(json => {	
                        //updating object array with the simmilaritity values and the horoscope text
                        this.resultsWithSim[r].similarities = json.similarity;
                        this.resultsWithSim[r].horoscope = text;

                        //calling function to put the results in order by similarity value
                        this.orderingResult();
                    });
                    }
            
        },
        //function called to retrieve the keys from firebase for the specfied sign
        findKeys(data){
           
            this.previous.length = 0;
            for(let p in data.val()){
                 
                this.database.ref("ratings/"+this.sign+"/"+p).once("value", this.savePrevious, this.firebaseError);
            }
            //forcing dealy so that the previous array will be filled before this is called
            setTimeout(this.findingSimilarty, 100);
        },
        //function called after keys have been retrieved to save the data from the firebase database
        savePrevious(data){
            this.previous.push(data.val());
        },
        //function to print out error message if the firebase call fails
        firebaseError(error){
            console.log(error);
        },
        //function that puts the horoscopes in descending order of similiarity so that the most similiar to the previous high ranked horoscopes will be displayed first
        orderingResult(){
            if(this.resultsWithSim.length == 4){
                this.resultsWithSim.sort(function(a, b){return b.similarities-a.similarities})
                this.hidden = true;
                this.hideButton = false;
                this.horoscope = this.resultsWithSim[this.index].horoscope;
            }
        },
        //function that is called when the user clicks the search button that searches the sentimnet value of the term that the user entered
        searchForSentiment(){
            //checking to make sure search box is not empty
            if(this.searchWord == undefined || this.searchWord == "" || this.searchWord == null){this.placeholder = "Please enter search term first"; return}
            this.horoscope = "";
            this.hidden = false;
            this.hideButton = true;
            if(this.searchWord != "" && this.searchWord != null && this.searchWord != undefined){
                this.searchResults.length = 0;
                //calling API to find mood and moodscore of enetered search word
                fetch("https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text="+this.searchWord+"&token=ef45543309bf47c0829cb8ab19b82460")
                    .then(response => {
                        if(!response.ok){
                            throw Error('ERROR: ${response.statusText}');
                        }
                        return response.json();
                    })
                    .then(json => {	
                    //saving the mood and moodscore values to searchterm class
                        this.searchTerm = new SearchTerm(json.sentiment.type, json.sentiment.score);
                    //calling function to sort through horoscopes and find ones that have the same mood as the search word
                        this.creatingSentimentArray();
                });
            }
        },
        saveSearch(){
            this.placeholder = "";
            //saving the searched term to local storage whenever it is changed
            localStorage.setItem(this.searchKey, this.searchWord);
        },
        //function that creates array of horoscopes with same mood as the search term
        //if then orders them by how close their moodscore is to the moodscore of the search term
        creatingSentimentArray(){
            //looping through horoscope array and adding them to a new array if they have the same mood as the search term
                for(let i = 0; i < this.resultsWithSim.length; i++){
                    if(this.searchTerm.mood == this.resultsWithSim[i].mood){
                        this.searchResults.push(this.resultsWithSim[i]);
                    }
                }
                
                let termScore = this.searchTerm.moodScore;
                //ordering the array based on how close the moodscore is to the moodscore of the search term
                this.searchResults.sort(function(a, b){return Math.abs(a.moodScore-termScore)-Math.abs(b.moodScore - termScore)});
                
                //reseting the page
                this.index = 0;
            if(this.searchResults.length > 0){
                this.hidden = true;
                this.hideButton = false;
                
                //dsiplaying the horoscopes that result from the search
                this.horoscope = this.searchResults[this.index].horoscope;
            }
            else{
                //dsiplayig a message if there are no horoscopes with the same mood
                this.hidden = true;
                this.hideButton = true;
                this.horoscope = "No results found";
            }
        }
        
        
	} // end methods
});
