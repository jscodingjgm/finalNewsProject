const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const News = require('../models/News');

router.get('/', async (req, res) => {
    const news = await News.findAllNews();
    res.render('body', {
        news : news,
        temp : '',
        cityName: ''
    });
});

router.get('/sports', async (req, res) => {
    const news = await News.find({category : 'sports'});
    res.render('sports', {
        news : news
    });
});

router.get('/contact-us', async (req, res) => {
    res.render('contactUS');
});

router.get('/about-us', async (req, res) => {
    res.render('aboutUS');
});

module.exports = router