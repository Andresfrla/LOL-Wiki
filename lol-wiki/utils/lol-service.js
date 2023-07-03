const axios = require('axios');
const BASE_URL = 'https://americas.api.riotgames.com/';
const API_KEY = process.env.API_KEY;
const lolService = axios.create({
    baseURL: BASE_URL
})

function lolService(endpoint, searchParameter) {
    const url = `${endpoint}/${searchParameter}?api_key=${API_KEY}`;
    return lolService.get(url)
}

module.exports = getLOLData;