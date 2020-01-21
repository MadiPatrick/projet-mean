var bodyParser = require('body-parser')
const http = require('http');
const express = require('express');
var mongoose = require('mongoose');
var paragrapheController = require("./controllers/paragraphe.controller");
var modelParagraphe = require("./models/paragraphe.model");
var scoreController = require("./controllers/score.controller");
var modelScore = require("./models/score.model");

const app = new express();
var router = express.Router();

var dbName = "Scanner";
mongoose.connect("mongodb://localhost:27017/" + dbName);
app.use(
  bodyParser.urlencoded({
    extented: true
  })
);
var port = process.env.PORT || 3000





app.set('port', port);
const server = http.createServer(app);
var io = require('socket.io').listen(server)

// Gestion des paragraphes

router.get("/", function (req, res) {
  res.json({ message: "welcome to app" });
});
router.route("/paragraphe")
  .post(paragrapheController.postParagraphe)
  .get(paragrapheController.getParagraphes);

router.route("/paragraphe/:paragraphe_id")
  .get(paragrapheController.getParagraphe)
  .put(paragrapheController.updateParagraphe)
  .delete(paragrapheController.deleteParagraphe);

// Gestion des Scores
router.route("/score")
  .post(scoreController.postScore)
  .get(scoreController.getScores);

router.route("/score/:score_id")
  .get(scoreController.getScore)
  .put(scoreController.updateScore)
  .delete(scoreController.deleteScore);

// Tramement et connexion des socket io

io.on('connection', (socket) => {

  console.log("Une nouvelle connexion : " + socket.id);

  socket.on('join', function (data) {
    socket.join(data.room);
    console.log(data.user + " joined de room " + data.room);
    socket.broadcast.to(data.room).emit("new user joined", ({user: data.user, message: "has joined this room." }))
  })

  socket.on('save_score', function (data) {
    var score = new modelScore();
    score.joueur = data.joueur;
    score.paragraphe = data.paragraphe;
    score.heure_debut = data.heure_debut;
    score.heure_fin = data.heure_fin;
    score.published = true;
    score.save(function (err, savedScore) {
      if (err)
      {
        console.log(err);
      }
      else
      {
        console.log("Score has been saved successfully");
      }
    });

  })
  // socket.on('get_scores', function (data) {
  //   var paragraphe = new modelParagraphe();

  //   paragraphe.find(function (err, paragraph) {
  //     if (err) {
  //       console.log(err)
  //     }
  //     if (!score)
  //     {
  //       console.log("The score is no in the database");
  //     }
  //     else
  //     {
  //       emit('get scores',{paragraphe:paragraph})
  //     }
  //   });
  // })

})
var mes_paragraphe = scoreController.getScores;


app.use("/api", router);
server.listen(port);
console.log("le serveur est maitenant en marche sur le port : " + port);



function new_paragraphe(title, slug, content, author)
{
  var paragraphe = new modelParagraphe();
  paragraphe.title = title;
  paragraphe.slug = slug;
  paragraphe.content = content;
  paragraphe.author = author;
  return paragraphe;
}

