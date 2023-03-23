import React, { useState } from "react";
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
        
         <input type="text" id='Search' onChange={(e => setSearchText(e.target.value))}></input>
         <p></p>
          <button onClick={e => searchForPlayer(e)}>Search for player</button> 
        
        
      </div>

        {
        //if we have a valid object, continue
        JSON.stringify(playerData) !='{}' ? 
        <>  
         <p className='SummonerName'>
         <img width="100" height="100" id="profileIcon" src={"http://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/"+playerData.profileIconId+".png"}></img>
          <br></br>
          {playerData.name}
        </p>
         <p className='SummonerLevel'>
          Summoner Level {playerData.summonerLevel}
          
          </p>
        </>
        :
        <><p></p></>
        
        }
      


    </div>
    

    
  );
}

export default App;
