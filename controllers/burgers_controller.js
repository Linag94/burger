// importing for file
var express = require('express');
var router = express.Router();
var burger = require('../models/burger')

//Setup Routes

// Index Redirect
router.get('/', function (req, res) 
{
  res.redirect('/index');
});

// Index Page 
router.get('/index', function (req, res) 
{
  burger.selectAll(function(data) 
  {
    var burgerObject = { burgers: data };
    //console.log(burgerObject);
    res.render('index', burgerObject);
  });
});



// Create a New Burger
router.post('/burger/create', function (req, res) 
{
  burger.insertOne(req.body.burger_name, function() 
  {
    res.redirect('/index');
  });
});

// Devour a Burger
router.post('/burger/eat/:id', function (req, res) 
{
  burger.updateOne(req.params.id, function() 
  {
    res.redirect('/index');
  });
});

// Export routes
module.exports = router;