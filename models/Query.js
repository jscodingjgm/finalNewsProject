const mongoose = require('mongoose');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const validator = require('validator');

const querySchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    query: {
        type: String,
        required: true,
        trim: true
    }
});

querySchema.statics.findAllQueries = async () => {
    const queries = await Query.find({})
    
    return queries;
}

const Query = mongoose.model('query', querySchema);

module.exports = Query;