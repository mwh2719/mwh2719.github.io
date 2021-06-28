export {ResultWithSim, SearchTerm};

//class to hold the values of the Results  from the API's
class ResultWithSim{
    
    constructor(mood, moodScore){
        this.mood = mood;
        this.moodScore = moodScore;
    }
}

//class to hold the values of the search term from the API's
class SearchTerm{
    constructor(mood, moodScore){
        this.mood = mood;
        this.moodScore = moodScore;
    }
}