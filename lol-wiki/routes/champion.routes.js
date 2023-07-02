const express = require('express');
const router = express.Router();

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

module.exports = router;
