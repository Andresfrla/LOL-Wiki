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
const { setDefaultResultOrder } = require('dns');

router.get('/:id', isLoggedIn, async (req, res, next) => {
    const user = await User.findById(req.params.id); 
    const teams = await Team.find({ userId: req.params.id }).populate('champions'); 
    res.render("profile", { user: user, teams: teams }) 
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


    const getSaveTeam = async (newTeam) => {
        const championIdArr = newTeam.map(newChampion => {
            return Champion.create(newChampion)
        })
            return Promise.all(championIdArr) 
    }
    const saveTeam = await getSaveTeam(newTeam)
    const updatedTeam = await Team.findByIdAndUpdate(newTeamSaved._id, { $push: { champions: saveTeam.map(champion => champion._id) } },{ new: true } )
    
    console.log('updatedTeam: ', updatedTeam)

    res.redirect(`/profile/${userId}`)
})

router.get('/:id/delete', isLoggedIn, (req,res) =>{
    const { id } = req.params;
    Team.findByIdAndDelete(id)
    .then(() => res.redirect(`/profile/${userId}`))
    .catch(err => res.render)
}) 

module.exports = router;