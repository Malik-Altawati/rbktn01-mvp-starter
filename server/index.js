var express = require('express');
var bodyParser = require('body-parser');
var user = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json())
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/user', urlencodedParser, function (req, res) {
  user.create(req.body, (err, dat) => {
    if (dat) {
      console.log("New User Was Created")
      res.send("New User Was Created")
      res.end()
    }
    if (err) {
      res.send("Username Has to be Unique")
      res.end()
    }
  })
});

app.get('/removeAll', urlencodedParser, function (req, res) {
  user.removeAll({}, (err, dat) => {
    if (dat) {
      res.send("Everything is Deleted")
      res.end()
    }
  })
});

app.post('/removeOne', urlencodedParser, function (req, res) {
  user.removeOne(req.body, (err, dat) => {
    if (dat) {
      res.send("User Was Deleted")
      res.end()
    } else {
      res.send(err)
      res.end()
    }
  })
});

app.post('/updateOne', urlencodedParser, function (req, res) {
  // console.log(req.body.username, req.body.password)

  user.updateOne({ username: req.body.username }, { password: req.body.password }, (err, dat) => {
    if (dat) {
      res.send("User Was updated")
      res.end()
    }
  })
});

app.get('/users', function (req, res) {
  user.selectAll(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});


app.listen(3000, function () {
  console.log('listening on port 3000!');
});

