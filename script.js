//api calls for jokes
let joke_apis = [
    {"name":"JokeAPI","url":'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,explicit&type=single', "called": false}
]

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

// This function causes the browser to hang
function getJoke() {
    {        
        fetch(joke_apis[0].url).then( response => response.json()).then( (result) =>{
            let jokeString = result.joke
            let apiName = api.name
            let jokeObj = {"JokeString":jokeString,"Source":apiName,"Rating": 0}
            current_user_jokes.push(jokeObj)
        }
        ).catch( error => {
            alert('Something went wrong')  // user friendly - most users can't do anything about a stack trace
            console.log(error)  // for the developer to debug the app
            window.stop()
        })

    })

}


//Updated getJoke function to address the hanging issues
function get_joke_API(apiURL) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
         let response = this.responseText.json()
	     // Access the result here
            let jokeString = result.joke
            let apiName = api.name
            let jokeObj = {"JokeString":jokeString,"Source":apiName,"Rating": 0}
            current_user_jokes.push(jokeObj)
         //console.log(this.responseText)
	 }
    };
    xhttp.open("GET", apiURL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("X-JokesOne-Api-Secret", "YOUR API HERE");
    xhttp.send();
}



//From https://jokes.one/api/joke/#js
function get_joke_of_the_day(category) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
         let response = this.response.json()
         console.log(typeof(response))
         console.log(`https://api.jokes.one/jod?category=${category}`)
         console.log(response.success)
	     // Access the result here
         let jokeString = response.contents.jokes[0].joke
         let apiName = response.contents.jokes[0].description
         let jokeObj = {"JokeString":jokeString,"Source":apiName,"Rating": 0}
        //  current_user_jokes.push(jokeObj)
         
	 }
    };
    xhttp.open("GET", `https://api.jokes.one/jod?category=${category}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("X-JokesOne-Api-Secret", "YOUR API HERE");
    xhttp.send();
}









function wait(delay) {
    const beginning = Date.now()
    let current = 0
    while ((current - beginning) < delay){current = Date.now()}
    console.log(beginning,current)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//console.log(typeof(current_user_jokes))

function createJokeList() {
    //let i = 0
    JOD_categories.forEach((category) => {get_joke_of_the_day(category)})
    while (current_user_jokes.length < 10) {
        joke_apis.forEach((api) => {get_joke_API(api)})
        //debugging
        let jokeObj = {"JokeString":"jokeString","Source":"apiName","Rating": 0}
        current_user_jokes.push(jokeObj)

    }
    console.log('Joke list completed')
    console.log(current_user_jokes)
}

createJokeList()