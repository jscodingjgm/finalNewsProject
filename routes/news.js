const express = require('express');
const News = require('../models/News');
const Query = require('../models/Query');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/saveNews', async (req, res) => {
    // Create a new user
    try {
        req.body.date = new Date();
        const news = new News(req.body);
        await news.save();
        res.redirect('/admin/addnews');
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/getWeather/:loc', async (req, res) => {
    var location = req.params.loc.split(':');
    function getWeatherDetails(location){
        return fetch('http://api.openweathermap.org/data/2.5/weather?lat='+location[0]+'&lon='+location[1]+'&appid=75632430ef93dc51cc8857cdadd89f8d');
    }
    try {
        const news = await News.findAllNews();
        const getWeather = await getWeatherDetails(location);
        const getJSONData = await getWeather.json();
        res.json({temp : getJSONData.main.temp, cityName : getJSONData.name})
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/saveQuery', async (req, res) => {
    try {
        console.log('req.body>>>>>.', req.body);
        const query = new Query(req.body);
        await query.save();
        res.redirect('/news/contact-us');
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;