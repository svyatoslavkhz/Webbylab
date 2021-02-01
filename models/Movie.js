const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    year: {type: Number, min: 1895, max: 2100, required: true},
    format: {type: String, required: true},
    actors: [{type: String, required: true}]
})


module.exports = model('Movie', schema)