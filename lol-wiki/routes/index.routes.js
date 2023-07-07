const express = require('express');
const {
  getChampionsData
} = require('../utils/lol-service'); 
const router = express.Router();

/* GET champions*/
router.get("/", async (req, res, next) => {
  try {
    const { data } = await getChampionsData();

    const championsNames = Object.keys(data.data); // [Aatrox,Ahri, akali]
    const champions = [];
    // data.data.forEach(a => console.log(a))
    // console.log(data.data)
    championsNames.forEach(p => {
      champions.push({
        url: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${p}_0.jpg`, 
        name: p,
        description: data.data[p].blurb 
      })
    })
    
    res.render('index', {champions})
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;