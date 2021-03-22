//api calls for jokes
let joke_apis = [
    {"name":"JokeAPIDev","url":'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit'},
    {"name":"JokesOne","url":'https://api.jokes.one/jod?category=animal'},

]

//Current user object
let current_user = {
    "name":"",
    "Jokes":[
        {"JokeString":"","Source":"","Rating": 0}

    ]
        
    
}

function set_user_name(new_name){
    //TODO Validate User String
    if (new_name == true) {
        current_user
    }

}


function getJokes() {
    for (api in joke_apis) {

    }

}
