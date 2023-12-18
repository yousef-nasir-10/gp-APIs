const { string } = require('joi')
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProjectSchema = new mongoose.Schema({

    title: {type:String, required: true},
    catagory: {type:String, required: true},
    creationDate:{type:Number},
    students: {type: Array},
    isCompleated: {type: Boolean, default: true},
    like: [
        {type:String, ref:"Users"}
    ], 
    view: [
        {type:String, ref:"Users"}
    ],
    introduction: {type:String, default: "no intoduction added!"},
    abstract: {type:String, default: "no abstract added!"},
    
    tools: {type: Array},
    superVisors: {type: Array},
    urls: {type: Array},
        // postedBy: {type:String, default: "unknown"},
   
    comments: [
        {
            text: {type: String},
            created: {type: Date, default: Date.now},
            sentBy: { type: Schema.Types.ObjectId, ref: 'Users' }

        }
    ]
    

})

module.exports = mongoose.model('Projects', ProjectSchema)