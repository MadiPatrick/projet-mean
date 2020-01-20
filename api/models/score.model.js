var mongoose = require("mongoose");

var ScoreSchema = new mongoose.Schema({
    joueur: String,
    paragraphe: String,
    heure_debut: String,
    heure_fin:String,
    published: Boolean,
    publishedOn: Date,
    craetedOn: Date,
    updatedOn: Date
})
ScoreSchema.pre('save', function (collback) {
    var score = this;
    var now = new Date();
    score.updatedOn = now;
    if (!score.craetedOn) {
        score.craetedOn = now;
    }
    if (!score.publishedOn && score.published) {
        score.publishedOn = now;
    }
    collback();
})
module.exports = mongoose.model("score", ScoreSchema);