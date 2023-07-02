const axios = require('axios');
const API_KEY = process.env.API_KEY;

// info de los jugadores 
const PLAYER_URL = 'https://la1.api.riotgames.com/';
const lolPlayerService = axios.create({
    baseURL: PLAYER_URL
})

// info del juego
const GAME_SERVICE_URL = 'https://americas.api.riotgames.com/';
const gameLOLService = axios.create({
    baseURL: GAME_SERVICE_URL
})

function getLOLPlayerDataFromApi(endpoint) {
    const url = `${endpoint}?api_key=${API_KEY}`;
    return lolPlayerService.get(url)
}

function getGameLOLDataFromApi(endpoint){
    const url = `${endpoint}?api_key=${API_KEY}`;
    return gameLOLService.get(url)
} 

function getChampionsData() {
    return axios.get('http://ddragon.leagueoflegends.com/cdn/11.14.1/data/en_US/champion.json');
}

module.exports = {
    getChampionsData,
    getLOLPlayerDataFromApi,
    getGameLOLDataFromApi
};
