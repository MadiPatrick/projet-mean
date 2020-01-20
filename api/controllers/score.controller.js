var Scores = require('../models/score.model')

exports.postScore = function (req, res) {
    var score = new Scores();
    score.joueur = req.body.joueur;
    score.paragraphe = req.body.paragraphe;
    score.heure_debut = req.body.heure_debut;
    score.heure_fin = req.body.heure_fin;
    score.published = req.body.published;

    score.save(function (err, savedScore) {
        if (err) {
            return res.json({ success: false, message: err }).status(500)
        }
        res.json({ success: true, message: 'Score has been saved successfully', data: savedScore }).status(200);
    });
}
exports.getScores = function (req, res) {
    Scores.find(function (err, score) {
        if (err) {
            return res.json({ success: false, message: err }).status(500);
        }
        if (!score) {
            return res.json({ success: false, message: "The score is no in the database" }).status(404);
        }
        res.json({ success: true, message: "Scores has been retrived successfully", data: score }).status(200);
    });
};
exports.getScore = function (req, res) {
    Scores.findById(req.params.score_id, function (err, score) {
        if (err) {
            return res.json({ success: false, message: err }).status(500);
        }
        res.json({ success: true, message: "Score has been retreived successfully", data: score }).status(200);
    })
};

//<=== Update ===>
exports.updateScore = function (req, res) {
    Scores.findById(req.params.score_id, function (err, score) {
        if (err) {
            return res.json({ success: false, message: err }).status(500);
        }
        if (req.body.paragraphe) { score.paragraphe = req.body.paragraphe };
        if (req.body.heure_debut) { score.heure_debut = req.body.heure_debut };
        if (req.body.heure_fin) { score.heure_fin = req.body.heure_fin };
        if (req.body.joueur) { score.joueur = req.body.author };
        if (req.body.published) { score.published = req.body.published };
        score.save(function (err, savedScore) {
            if (err) {
                return res.json({ success: false, message: err }).status(500)
            }
            res.json({ success: true, message: 'Score has been update successfully', data: savedScore }).status(200);
        });
    })
};

exports.deleteScore = function (req, res) {
    Scores.findByIdAndRemove(req.params.score_id, function (err, score) {
        if (err) {
            return res.json({ success: false, message: err }).status(500);
        }

        res.json({ success: true, message: 'Score has been deleted successfully', data: score }).status(200);
    })
};
