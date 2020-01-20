var mongoose = require("mongoose");

var ParagrapheSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:String,
    title:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        unique:true
    },
    author:String,
    published:Boolean,
    publishedOn:Date,
    craetedOn:Date,
    updatedOn:Date
})
ParagrapheSchema.pre('save',function(collback) {
    var paragraphe = this;
    var now = new Date();
    paragraphe.updatedOn = now;
    if(!paragraphe.craetedOn){
        paragraphe.craetedOn = now;
    }
    if (!paragraphe.publishedOn && paragraphe.published) {
      paragraphe.publishedOn = now;
    }
    collback();
})
module.exports = mongoose.model("paragraphe", ParagrapheSchema);