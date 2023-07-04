const express = require('express');
const {
  getChampionsData,
  getLOLPlayerDataFromApi,
  getGameLOLDataFromApi
} = require('../utils/lol-service'); 
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
      const {summonerName} = req.body;
      const summonerEndpoint = `/lol/summoner/v4/summoners/by-name/${summonerName}`;
      const summoner = await getLOLPlayerDataFromApi(summonerEndpoint);
  
      const puuid = summoner.data.puuid;
      const endpoint = `/lol/match/v5/matches/by-puuid/${puuid}/ids`
      const data = await getGameLOLDataFromApi(endpoint);
      console.log('data: ', data)
      res.render("matches/match-search", summonerName)
      const matches = []
      for (let i = 0; i < 5; i++) {

        const endpoint = `/lol/match/v5/matches/${matchId}`; 
        const { data: match } = await getGameLOLDataFromApi(endpoint);

        console.log(JSON.stringify(match))
/*         matches.push(match) */
      }
      res.render("matches/match-list", { matches })
    } catch (error) {
      console.error(error)
    }
  });

// hacer un for

router.post("/", async (req,res,next) => {
  try {
    const { summonerName } = req.body;
    
    if (summonerName === ""){
      res.status(400).render("matches/match-search", {
        errorMessage:
          "Write a summoner name to see a list of matches",
      });
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;