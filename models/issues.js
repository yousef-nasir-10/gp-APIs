const { string, date } = require('joi')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const { Schema } = mongoose;

const IssueSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    title: {type: String, required: true },
    description: {type:String},
    isSolved: {type:Boolean, default:false},
    sentBy: { type: Schema.Types.ObjectId, ref: 'Users' }

})


module.exports = mongoose.model('Issues', IssueSchema) 