const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

const app = express()

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('dist'))

console.log(__dirname)

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
let input = []

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
let request = async function requestHandler(req, res) {
    input = req.body.url;
    const apiURL = `${baseURL}key=${apiKey}&url=${input}&lang=en`
    const response = await fetch(apiURL)
    const formatedData = await response.json()
    res.send(formatedData)
}

app.post('/api', request)

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})