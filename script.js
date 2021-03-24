//api calls for jokes
const joke_api_url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,explicit&type=single'
const jokeofhteday_api_url = 'https://api.jokes.one/jod?category='
//Current user object broken down because there were errors with limiting the api calls related to this object
let current_user_name =""
let current_user_jokes = []


//Categories
let JOD_categories = ['jod','animal','blonde','knock-knock']

//joke sorting variables
let unrated_jokes = [{"JokeString":"Why did the chicken cross the road? No guts.","Source":"api","Rating": 0}]
let id = 0
let activatedJoke



//Debugging joke list
//unrated_jokes = [{"JokeString":"Why did the chicken cross the road? No guts.","Source":"api","Rating": 0},{"JokeString":"string","Source":"api","Rating": 0},{"JokeString":"string","Source":"api","Rating": 0},{"JokeString":"string","Source":"api","Rating": 0},{"JokeString":"string","Source":"api","Rating": 0},{"JokeString":"string","Source":"api","Rating": 0},{"JokeString":"string","Source":"api","Rating": 0},{"JokeString":"string","Source":"api","Rating": 0},{"JokeString":"string","Source":"api","Rating": 0},{"JokeString":"string","Source":"api","Rating": 0}]



//Define variables for ui elements from index.html

let nameText = document.querySelector('#user-name')
let nameSubmitButton = document.querySelector('#submit-name')
let nameSpace = document.querySelector('#name-space')
let activeJokeText = document.querySelector('#joke-active-text')
let activeDiv = document.querySelector('#joke-active')
let activeJokeSrc = document.querySelector('#joke-active-src')
let yesButton = document.querySelector('#funny-yes')
let noButton = document.querySelector('#funny-no')

//Takes string and assigns it to the current user as name. Also updates the ui to display the name.
function set_user_name(new_name){
    //TODO Validate User String
    current_user_name = new_name
    nameSpace.innerHTML=("User: " + current_user_name)
    
}

//Name submission event listener
//nameSubmitButton.addEventListener('click', function() {set_user_name(nameText.value)})


//Puts a new joke into the rating box
function prepare_joke_for_rating(prebaked){
    console.log(prebaked)
    let text = prebaked.JokeString
    let src = prebaked.Source
    activeJokeText.innerHTML=(text)
    activeJokeSrc.innerHTML=(src)
    
}

//resets the joke rating box and gets a new joke for the unrated joke list if it is low on jokes
function resetJoke(){
    activatedJoke = unrated_jokes.shift()
    if (unrated_jokes.length < 2) {getJoke()}
    prepare_joke_for_rating(activatedJoke)
}

//puts rated joke in current_user list
function rateJoke(rating) {
    activatedJoke.Rating = rating
    updateRatedJokeDisplay(activatedJoke.Rating,activatedJoke.JokeString,activatedJoke.Source)
    current_user_jokes.push(activatedJoke)
    resetJoke()

}

//Places rated joke in box below joke rating box
function updateRatedJokeDisplay(rating, joke_string, source){
    console.log('updateRated')
    let codeBlock = document.createElement('div')
    let parentDiv = document.getElementById('rated-jokes-list')
    codeBlock.setAttribute('class', 'row mx-sm-1 justify-content-center text-center m-2')
    codeBlock.setAttribute('id', 'joke-rated')
    let precedingElement = document.getElementById('joke-rated')
    if (rating == 1) {
        codeBlock.innerHTML = `
                

            <div class="col-6 border border-success text-center p-2 rounded-3 border-2" >
                <blockquote class="blockquote" id="joke-active-text">${joke_string}</blockquote>
                <figcaption class="blockquote-footer" id="joke-active-src">${source}</figcaption>
                <h5 id="rating">Funny</h5>
            </div>

    `
    parentDiv.insertBefore(codeBlock,precedingElement)
    } else {codeBlock.innerHTML =`

            <div class="col-6 border border-dark text-center p-2 rounded-3" >
                <blockquote class="blockquote" id="joke-active-text">${joke_string}</blockquote>
                <figcaption class="blockquote-footer" id="joke-active-src">${source}</figcaption>
                <h5 id="rating">Unfunny</h5>
            </div>

    `
    parentDiv.appendChild(codeBlock)
    }


}

//TODO create function that removes duplicates from list.

//TODO create function that sorts list by rating. This will be refreshed each time the user rates a joke.


//Joke API Fetch Function
function getJoke() {
    fetch(joke_api_url)
        .then( response => response.json()).then( (result) =>{
            //console.log(result)
            let jokeString = result.joke
            let apiName = 'JokeAPI'
            let jokeID = id++
            let jokeObj = {"JokeID": jokeID, "JokeString":jokeString,"Source":apiName,"Rating": 0}
            unrated_jokes.push(jokeObj)
    }
    )
    .catch( error => {
        alert('Something went wrong. JokeAPI.dev is unavailable.')  // user friendly - most users can't do anything about a stack trace
        console.log(error)  // for the developer to debug the app
        window.stop()
    })
}

//From https://jokes.one/api/joke/#js
function get_joke_of_the_day(category) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.response)
        //console.log(`https://api.jokes.one/jod?category=${category}`)
        // console.log(response.contents.jokes[0].description)
	    // Access the result here
        let jokeString = response.contents.jokes[0].joke.text
        let apiName = response.contents.jokes[0].description
        let jokeID = id++
        let jokeObj = {"JokeID": jokeID,"JokeString":jokeString,"Source":apiName,"Rating": 0}
        
        unrated_jokes.push(jokeObj)         
	 }
    };
    xhttp.open("GET", `https://api.jokes.one/jod?category=${category}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("X-JokesOne-Api-Secret", "YOUR API HERE");
    xhttp.send();
}

//Three unused functions attempting to pause the application and wait for data to load
function wait(delay) {
    const beginning = Date.now()
    let current = 0
    while ((current - beginning) < delay){current = Date.now()}
    console.log(beginning,current)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const waitPromise = new Promise((resolve, reject) => {})

function setup() {

    //Pull data from joke of the day
    

    const myPromise = new Promise((resolve, reject) => {
        console.log(resolve)
      });


    //let promise = new Promise(prepare_joke_for_rating())
    // for (let x = 0; x < 5; x++) {
    //     promises.push(fetchCatFact(url))
    // }

    myPromise
    .then(getJoke())
    .then(JOD_categories.forEach((category) => {get_joke_of_the_day(category)}))
    .then(console.log(unrated_jokes))
    .then(activatedJoke = unrated_jokes[0])
    .then(prepare_joke_for_rating(activatedJoke))
    .then(prepare_joke_for_rating(unrated_jokes[0]))
    .then(console.log(unrated_jokes))

    .catch(err => { console.log(err) });
    

    //TODO UI FUNCTIONS



    

}

setup()
console.log(current_user_jokes)
