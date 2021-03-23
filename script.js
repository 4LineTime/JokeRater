//api calls for jokes
const joke_apis = [
    {"name":"JokeAPIDev","url":'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit', "called": false},
    {"name":"JokesOne","url":'https://api.jokes.one/jod?category=animal', "called": false},
]

//Current user object
let current_user = {
    "name":"",
    "jokes":[
        {"JokeString":"","Source":"","Rating": 0}

    ]   
}




//Define variables for data from index.html

let nameText = document.querySelector('#user-name')
let nameSubmitButton = document.querySelector('#submit-name')
let nameSpace = document.querySelector('#name-space')

function set_user_name(new_name){
    //TODO Validate User String
    current_user.name = new_name
    nameSpace.innerHTML=current_user.name
}

nameSubmitButton.addEventListener('click', function() {set_user_name(nameText.value)})


function getJokes() {
    for (api in joke_apis) {
        console.log(api.url)
        fetch(api.url).then( response => response.json()).then( result =>{
            console.log(result)
        }
        ).catch( error => {
            alert('oops! something went wrong')  // user friendly - most users can't do anything about a stack trace
            console.log(error)  // for the developer to debug the app
        })

    }

}

// function get_joke_of_the_day() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
// 	 if (this.readyState == 4 && this.status == 200) {
// 	     // Access the result here
// 	     alert(this.responseText);
// 	 }
//     };
//     xhttp.open("GET", "https://api.jokes.one/jod?category=animal", true);
//     xhttp.setRequestHeader("Content-type", "application/json");
//     xhttp.setRequestHeader("X-JokesOne-Api-Secret", "YOUR API HERE");
//     xhttp.send();
// }

// get_joke_of_the_day()