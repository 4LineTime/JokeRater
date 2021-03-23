//api calls for jokes
const joke_api_url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,explicit&type=single'
const jokeofhteday_api_url = 'https://api.jokes.one/jod?category='
//Current user object broken down because there were errors with limiting the api calls related to this object
let current_user_name =""
let current_user_jokes = []

//Categories
let JOD_categories = ['jod','animal','blonde','knock-knock']

//Debugging joke list
//current_user_jokes = [{"foo":"bar"},{"foo":"bar"},{"foo":"bar"},{"foo":"bar"},{"foo":"bar"},{"foo":"bar"},{"foo":"bar"},{"foo":"bar"},{"foo":"bar"},{"foo":"bar"},]

//Define variables for ui elements from index.html

let nameText = document.querySelector('#user-name')
let nameSubmitButton = document.querySelector('#submit-name')
let nameSpace = document.querySelector('#name-space')


//Takes string and assigns it to the current user as name. Also updates the ui to display the name.
function set_user_name(new_name){
    //TODO Validate User String
    current_user_name = new_name
    nameSpace.innerHTML=("User: " + current_user_name)
}

//Name submission event listener
nameSubmitButton.addEventListener('click', function() {set_user_name(nameText.value)})

//Joke API Fetch Function
function getJoke() {
    fetch(joke_api_url)
        .then( response => response.json()).then( (result) =>{
            //console.log(result)
            let jokeString = result.joke
            let apiName = 'JokeAPI'
            let jokeObj = {"JokeString":jokeString,"Source":apiName,"Rating": 0}
            current_user_jokes.push(jokeObj)
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
        //console.log(response.contents.jokes[0].description)
	    // Access the result here
        let jokeString = response.contents.jokes[0].joke.text
        let apiName = response.contents.jokes[0].description
        let jokeObj = {"JokeString":jokeString,"Source":apiName,"Rating": 0}
        current_user_jokes.push(jokeObj)
         
	 }
    };
    xhttp.open("GET", `https://api.jokes.one/jod?category=${category}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("X-JokesOne-Api-Secret", "YOUR API HERE");
    xhttp.send();
}

//TODO create function that removes duplicates from list.

//TODO create function that sorts list by rating. This will be refreshed each time the user rates a joke.

//JOD_categories.forEach((category) => {get_joke_of_the_day(category)})
console.log(current_user_jokes)

function wait(delay) {
    const beginning = Date.now()
    let current = 0
    while ((current - beginning) < delay){current = Date.now()}
    console.log(beginning,current)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const waitPromise = new Promise((resolve, reject) => {

})

function fillJokeList() {

    do {getJoke()} while (current_user_jokes.length < 10)
    //  {
    //     console.log(current_user_jokes.length)

    //     getJoke().then(console.log(current_user_jokes.length))

    //     //debugging joke list filler
    //     // let jokeObj = {"JokeString":"jokeString","Source":"apiName","Rating": 0}
    //     // current_user_jokes.push(jokeObj)

    // }
    // console.log('Joke list completed')
    // console.log(current_user_jokes)
}

function bring_out_the_kraken() {

    JOD_categories.forEach((category) => {get_joke_of_the_day(category)})

    //This seems to happen before the above line of code and I don't know why.
    // fillJokeList()
    console.log(current_user_jokes.length)
    

}

bring_out_the_kraken()
console.log(current_user_jokes)
