var express = require('express');
var passport = require('passport');
var Data = require('../models/data');
var bodyParser= require('body-parser');
var router = express.Router();
var multer  = require('multer');
var uuidV1 = require('uuid/v1');
var upload = multer({ dest: 'uploads/' })


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add',isLoggedIn, function(req, res) {
  res.render('AddNew.ejs');
});

router.post('/add',isLoggedIn,upload.single('pic'),function(req,res){
console.log(req.file);
  var pic = req.file;
  var random = uuidV1();
  // Use the mv() method to place the file somewhere on your server

      var newData = Data({
     description: req.body.description,
     linkToRepo: req.body.link,
     linkToPic: 'http://localhost:3000/uploads/'+pic.filename+'.png'
    });

    // save the user
    newData.save(function(err) {
     if (err) throw err;

     console.log('Data created!');
     res.render('profile.ejs', { user: req.user });
});
});


router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs', { user: req.user });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));

module.exports = router;
