const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category : {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: true
    }
});


newsSchema.statics.findAllNews = async () => {
    const news = await News.find({})
    
    return news;
}

const News = mongoose.model('news', newsSchema);

module.exports = News;