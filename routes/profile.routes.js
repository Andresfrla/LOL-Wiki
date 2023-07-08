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
router.get('/', isLoggedIn, async (req, res, next) => {
    res.render("profile", {team}) 
})

router.post('/', async (req, res, next) => {
    console.log('req.body: ', req.body)
    const newTeam = []
    for (const team of Object.keys(req.body)) {
        console.log(team)

    }
    res.redirect('/profile')
})

module.exports = router;