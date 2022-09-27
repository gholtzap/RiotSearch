import logo from './logo.svg';
import React, { useState } from "react";
import background from "./img/bg.jpg"
import axios from 'axios';


import './css/App.css';
import "./css/styles.css"

const bg = new URL("./img/bg.jpg", import.meta.url)

function App() {

  const [searchText, setSearchText] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [playerData,setPlayerData] = useState({});

  function searchForPlayer(event){
    // Set up the correct API call

    let APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
    +searchText + "?api_key="+API_KEY;


    // Handle the API call

    axios.get(APICallString).then(function (response){
      // Success
      setPlayerData(response.data);
    }).catch(function (error){
      //Error
      console.log(error);

    });
  }

  console.log(playerData);

  return (

    <div>
      <div className="App">

        <div className='title'>
         <h3>RIOT Player Searcher</h3>
        </div>
        
        
        
        <input type="text" onChange={(e => setSearchText(e.target.value))}></input>
        <button onClick={e => searchForPlayer(e)}>Search for player</button> 
      </div>

        {
        //if we have a valid object, continue
        JSON.stringify(playerData) !='{}' ? 
        <>  
         <p>{playerData.name}</p>
         <p>Summoner Level {playerData.summonerLevel}</p>
        </>
        :
        <><p> No player data.</p></>
        
        }
      


    </div>
    

    
  );
}

export default App;
