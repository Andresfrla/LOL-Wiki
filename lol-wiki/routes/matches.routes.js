const express = require('express');
const {
  getChampionsData,
  getLOLPlayerDataFromApi,
  getGameLOLDataFromApi
} = require('../utils/lol-service'); 
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
      res.render("matches/match-search")
    } catch (error) {
      console.error(error)
    }
  });

router.post("/match-search", async (req,res,next) => {
  try {
    const { summonerName } = req.body;
    console.log("summonerName: ", summonerName);
    if (summonerName === ""){
      res.status(400).render("matches/match-search", {
        errorMessage:
          "Write a summoner name to see a list of matches",
      });
    }

    const summonerEndpoint = `/lol/summoner/v4/summoners/by-name/${summonerName}`;
    const summoner = await getLOLPlayerDataFromApi(summonerEndpoint);

    const puuid = summoner.data.puuid;
    const endpoint = `/lol/match/v5/matches/by-puuid/${puuid}/ids`
    const {data} = await getGameLOLDataFromApi(endpoint);

    const matches = []
    for (let i = 0; i < 5; i++) {
      
      const endpoint = `/lol/match/v5/matches/${data[i]}`; 
      const {data: match} = await getGameLOLDataFromApi(endpoint);

      const teamOne = match.info.participants.slice(0,5).map(p => {
        return ({
          url: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${p.championName}_0.jpg`,
          name: p.championName  
        })
      })
      const teamTwo = match.info.participants.slice(5).map(p => {
        return ({
          url: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${p.championName}_0.jpg`,
          name: p.championName  
        })
      })

      const singleMatch = {
        matchId: data[i],  
        teamOne ,
        teamTwo 
      }

      matches.push(singleMatch)
      console.log("matches: ", matches)
    }        
    res.render("matches/match-list", { matches })  
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;