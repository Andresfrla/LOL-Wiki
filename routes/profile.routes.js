const express = require('express');
const {
  getLOLPlayerDataFromApi,
  getGameLOLDataFromApi,
  getChampionsData
} = require('../utils/lol-service'); 
const router = express.Router();
const Teams = require('../models/Team.model');
const isLoggedIn = require('../middleware/isLoggedIn');

/* router.post('/', isLoggedIn, async (req, res,next) => {
    const newTeam = []
    for (const team of Object.keys(req.body)) {
        console.log(team)
    }
}) */

router.post('/', async (req, res, next) => {
    const newTeam = []
    for (const team of Object.keys(req.body)) {
        console.log(team)
    }
    res.render("profile", {team}) 
})

module.exports = router;