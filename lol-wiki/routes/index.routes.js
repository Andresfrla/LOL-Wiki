const express = require('express');
const {
  getChampionsData
} = require('../utils/lol-service'); 
const router = express.Router();

/* GET champions*/
router.get("/", async (req, res, next) => {
  try {
    const { data } = await getChampionsData();
    const champions = data.data;
    const championsNames = Object.keys(champions);
    const urls = []
    const names = []

    championsNames.forEach(p => {
      urls.push({
        url: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${p}_0.jpg`
      })
      names.push({
        name: `${p}`
      })
    })

    res.render('index', {urls, names})
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;