//import logo from './logo.svg';
import ZZ5H from './ZZ5H.gif';
import './App.css';
import React,{Component} from "react";
//import axios from 'axios';


class App extends Component {

  state = {
    logo_on:'',
    setup:'',
    joke:''
  }

  next = () => {

    this.setState({
      logo_on:"true",
      setup:'',
      joke:''
    })
    const https = require("https"); // Native module, no need to explicitly install

  
const baseURL = "https://v2.jokeapi.dev";
const categories = [ "Pun", "Spooky", "Christmas","Programming","Misc"];
//"Misc",
//,"Programming",
const params = [
    "blacklistFlags=religious,racist",
    "idRange=0-100"
];

//nsfw,

console.log("hi em");

https.get(`${baseURL}/joke/${categories.join(",")}?${params.join("&")}`, res => {
    console.log("\n");
    res.on("data", chunk => {
        // On data received, convert it to a JSON object
        let randomJoke = JSON.parse(chunk.toString());

        if(randomJoke.type === "single")
        {
            // If type == "single", the joke only has the "joke" property
            
            this.setState({joke:randomJoke.joke});
            console.log(this.state.joke);
            console.log("\n");
            console.log("King wins");
        }
        else
        {
            // If type == "twopart", the joke has the "setup" and "delivery" properties
            console.log(randomJoke.setup);
            setTimeout(() => {
                console.log(randomJoke.delivery);
                this.setState({setup:randomJoke.setup,joke:randomJoke.delivery});
                console.log("king");
            }, 3000);
        }
    });

    res.on("error", err => {
        // On error, log to console
        console.error(`Error: ${err}`);
        console.log("king loss");
    });
});
  }

componentDidMount(){

  this.next();

  }

render(){
  return (
    <div className="App">
      <div>
        {this.state.logo_on && <p className="welcome_text">Noknok</p>}
         <p className="joke">{this.state.setup}</p>
        <p className="joke">{this.state.joke}</p>
        {!this.state.joke && <img src={ZZ5H} alt="loading..." />}
      </div>
      <div>
        {this.state.joke && <button onClick ={()=>this.next()}>
          next {'>>'}
        </button>}
      </div>
    </div>
  );
}

 
}

export default App;
