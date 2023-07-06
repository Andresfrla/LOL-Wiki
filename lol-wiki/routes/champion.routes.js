const express = require('express');
const router = express.Router();
const {
  getChampionsData
} = require('../utils/lol-service'); 

router.get("/", async (req, res, next) => {
  try {
    const { data } = await getChampionsData();
    const champions = data.data;
    const championsNames = Object.keys(champions);
    const urls = []

    championsNames.forEach(p => {
      urls.push({
        url: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${p}_0.jpg`
      })
    })
    res.render('index', {urls})
  } catch (error) {
    console.error(error)
  }
});

router.get("/detail/:name", async (req, res, next) => {
  try {
    const { name } = req.params; 
    const { data } = await getChampionsData();
    const champion = data.data[name];

    console.log("champion", champion)

    const championsDetail = {
      name: name,
      url: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_0.jpg`,
      description: champion.blurb
    }

    res.render('champions/champDetail', championsDetail)
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
