const express = require('express');
const {
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
          url: `http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${p.championName}.png`,
          name: p.championName ,
          summoner: p.summonerName,
          kills: p.kills,
          deaths : p.deaths,
          assists : p.assists,
          role : p.teamPosition,
          item1 : p.item1,
          item2 : p.item2,
          item3 : p.item3,
          item4 : p.item4,
          item5 : p.item5,
          item6 : p.item6,
        })
      })
      const teamTwo = match.info.participants.slice(5).map(p => {
        return ({
          url: `http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${p.championName}.png`,
          name: p.championName,
          summoner: p.summonerName,
          kills: p.kills,
          deaths : p.deaths,
          assists : p.assists,
          role : p.teamPosition,
          item1 : p.item1,
          item2 : p.item2,
          item3 : p.item3,
          item4 : p.item4,
          item5 : p.item5,
          item6 : p.item6,
        })
      })

      const singleMatch = {
        matchId: data[i],  
        teamOne ,
        teamTwo 
      }

      matches.push(singleMatch)
    }        
    res.render("matches/match-list", { matches })  
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;