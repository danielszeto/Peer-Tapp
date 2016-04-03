var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Beer = require('./models/beer'),
    Comment = require('./models/Comments');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)s
app.set('view engine', 'hbs');

// connect to mongodb
mongoose.connect('mongodb://localhost/peertapp');

app.get('/api/beers', function (req, res) {
    Beer.find(function (err, allBeers) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allBeers);
    }
  });
});

app.post('/api/beers', function (req, res) {
    var newBeer = new Beer(req.body);
  newBeer.save(function (err, savedBeer) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedBeer);
    }
  });
});

app.get('/api/beers/:id', function (req, res) {
// get beer id from url params (`req.params`)
  var beerId = req.params.id;


  // find beer in db by id
  Beer.findOne({ _id: beerId }, function (err, foundBeer) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(foundBeer);
    }
  });


});

//update Beer
app.put('/api/beers/:id', function (req, res) {
    var id = req.params.id;
    console.log('hit update route');
    Beer.findById({_id: id}, function (err, foundBeer){
        if (err) console.log(err);
        foundBeer.name = req.body.name;
        foundBeer.type = req.body.type;
        foundBeer.style = req.body.style;
        foundBeer.image = req.body.image;
        foundBeer.upvotes = req.body.upvotes;
        foundBeer.save(function (err, saved){
            if (err) { console.log(err);}
            res.json(saved);
        });
    });
});

app.delete('/api/beers/:id', function (req, res) {
	var id = req.params.id;
	Beer.remove({_id:id}, function (err) {
		if (err)
		console.log(err);
  });
});

//comments
app.get('/api/comments', function (req, res) {
    Comment.find(function (err, allComments) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allComments);
    }
  });
});

app.post('/api/comments', function (req, res) {
    var newComment = new Comment(req.body);
  newComment.save(function (err, savedComment) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(savedComment);
    }
  });
});

app.get('/api/comments/:id', function (req, res) {
// get beer id from url params (`req.params`)
  var commentId = req.params.id;


  // find beer in db by id
  Comment.findOne({ _id: beerId }, function (err, foundComment) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(foundComment);
    }
  });


});

//update Beer
app.put('/api/comments/:id', function (req, res) {
    var id = req.params.id;
    console.log('hit update route');
    Comment.findById({_id: id}, function (err, foundBeer){
        if (err) console.log(err);
        foundComment.author = req.body.author;
        foundComment.body = req.body.body;
        foundComment.upvotes = req.body.upvotes;
        foundComment.save(function (err, saved){
            if (err) { console.log(err);}
            res.json(saved);
        });
    });
});

app.delete('/api/comments/:id', function (req, res) {
  var id = req.params.id;
  Comment.remove({_id:id}, function (err) {
    if (err)
    console.log(err);

  });

});

app.get('*', function (req, res) {
  res.render('index');
});

// listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});