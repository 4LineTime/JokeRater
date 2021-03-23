//api calls for jokes
let joke_apis = [
    {"name":"JokeAPI","url":'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,explicit&type=single', "called": false}
]

//Current user object
let current_user_name =""
let current_user_jokes = []

//Define variables for data from index.html

let nameText = document.querySelector('#user-name')
let nameSubmitButton = document.querySelector('#submit-name')
let nameSpace = document.querySelector('#name-space')

function set_user_name(new_name){
    //TODO Validate User String
    current_user_name = new_name
    nameSpace.innerHTML=("User: " + current_user_name)
}

nameSubmitButton.addEventListener('click', function() {set_user_name(nameText.value)})


function getJoke() {
    joke_apis.forEach((api) => {        
        fetch(api.url).then( response => response.json()).then( (result) =>{
            let jokeString = result.joke
            let apiName = api.name
            let jokeObj = {"JokeString":jokeString,"Source":apiName,"Rating": 0}
            current_user_jokes.push(jokeObj)
        }
        ).catch( error => {
            //alert('oops! something went wrong')  // user friendly - most users can't do anything about a stack trace
            console.log(error)  // for the developer to debug the app
        })

    })

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

console.log(typeof(current_user_jokes))

function createJokeList() {
    let i = 0
    while (i < 10) {
        getJoke()
        sleep(5000)        
        current_user_jokes.forEach(obj => i++)

    }
    console.log(current_user_jokes)
}

createJokeList()