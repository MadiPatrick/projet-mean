var Paragraphes = require('../models/paragraphe.model')

exports.postParagraphe = function(req,res) {
    var paragraphe = new Paragraphes();
    paragraphe.title = req.body.title;
    paragraphe.content = req.body.content;
    paragraphe.slug = req.body.slug;
    paragraphe.author = req.body.author;
    paragraphe.published = req.body.published;

    paragraphe.save(function(err, savedParagraphe) {
        if(err){
            return res.json({success:false,message:err}).status(500)
        }
        res.json({success:true,message:'Paragraphe has been saved successfully',data : savedParagraphe}).status(200);
    });
}
exports.getParagraphes = function(req, res) {
  Paragraphes.find(function(err, paragraphe) {
    if (err) {
      return res.json({ success: false, message: err }).status(500);
    }
    if (!paragraphe) {
      return res.json({success: false,message: "The is no paragraphe in the database"}).status(404);
    }
    res.json({ success: true,message: "Paragraphes has been retrived successfully",data: paragraphe}).status(200);
  });
};
exports.getParagraphe = function(req, res) {
  Paragraphes.findById(req.params.paragraphe_id,function(err,paragraphe){
      if (err) {
      return res.json({ success: false, message: err }).status(500);
    }
    res.json({ success: true,message: "Paragraphe has been retreived successfully",data: paragraphe}).status(200);
  })
};

//<=== Update ===>
exports.updateParagraphe = function (req, res) {
  Paragraphes.findById(req.params.paragraphe_id, function (err, paragraphe) {
    if (err) {
      return res.json({ success: false, message: err }).status(500);
    }
    if (req.body.title){paragraphe.title = req.body.title};
    if (req.body.content) { paragraphe.content = req.body.content };
    if (req.body.slug) { paragraphe.slug = req.body.slug };
    if (req.body.author) { paragraphe.author = req.body.author };
    if (req.body.published) { paragraphe.published = req.body.published };
    paragraphe.save(function (err, savedParagraphe) {
      if (err) {
        return res.json({ success: false, message: err }).status(500)
      }
      res.json({ success: true, message: 'Paragraphe has been update successfully', data: savedParagraphe }).status(200);
    });
  })
};

exports.deleteParagraphe = function (req, res) {
  Paragraphes.findByIdAndRemove(req.params.paragraphe_id, function (err, paragraphe) {
    if (err) {
      return res.json({ success: false, message: err }).status(500);
    }

    res.json({ success: true, message: 'Paragraphe has been deleted successfully'}).status(200);
  })
};
