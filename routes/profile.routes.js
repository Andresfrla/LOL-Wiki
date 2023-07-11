const express = require('express');
const {
  getLOLPlayerDataFromApi,
  getGameLOLDataFromApi,
  getChampionsData
} = require('../utils/lol-service'); 
const router = express.Router();
const Team = require('../models/Team.model');
const Champion = require('../models/Champion.model')
const User = require('../models/User.model')
const isLoggedIn = require('../middleware/isLoggedIn');
const mongoose = require('mongoose');

router.get('/', isLoggedIn, async (req, res, next) => {
    res.render("profile") 
})

router.get('/:id', isLoggedIn, async (req, res, next) => {

    req.params.id
    const result = 
    await User.findById(req.params.id) 
    res.render("profile", result) 
})

router.post('/', isLoggedIn, async (req, res, next) => {
    const { _id : userId } = req.session.currentUser
    const newTeam = []

    const championsNames = Object.values(req.body)[0]
    const urls = Object.values(req.body)[1]
    const items1 = Object.values(req.body)[2]
    const items2 = Object.values(req.body)[3]
    const items3 = Object.values(req.body)[4]
    const items4 = Object.values(req.body)[5]
    const items5 = Object.values(req.body)[6]
    const newTeamSaved = await Team.create({
        color: 'red',
        userId,
        champions: []
    })
    const doc = await Team.findById(newTeamSaved._id)

    console.log('newTeamSaved: ', newTeamSaved)
    for(let i=0; i < 5; i++){
        const champion = {
            championName: championsNames[i],
            url: urls[i],
            item1: items1[i],
            item2: items2[i],
            item3: items3[i],
            item4: items4[i],
            item5: items5[i],
        }
        newTeam.push(champion)
    } 


    const otrafuncion = async (newTeam) => {
        const championIdArr = newTeam.map(async newChampion => {
            const result = await  
            Champion.create(newChampion)
            return result._id
        })
        return championIdArr
    }

    otrafuncion(newTeam).then(p => {
        console.log('p: ', p)
    })

/*     championIdArr.forEach(async champId => {
        doc.champions.push(champId)
        await doc.save()
    }) */
    
    console.log('newTeam: ', newTeam)
    res.redirect(`/profile/${userId}`)
})

module.exports = router;