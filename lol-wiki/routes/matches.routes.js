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
    } catch (error) {
      console.error(error)
    }
  });

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