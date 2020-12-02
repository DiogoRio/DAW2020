var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.get("/students/edit/:id", function (req, res) {
  Student.lookUp(req.params.id)
    .then(s => res.render('edit', { student: s }))
    .catch(error => res.render("error", {error: error}))
});



router.get('/students/register', function (req, res) {
  res.render('register');
});

router.get('/students/:id', function(req, res) {
  // Data retrieve
  Student.lookUp(req.params.id)
    .then(s => res.render('student', { student: s }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.put("/students/:id", function (req, res) {
  Student.update(req.params.id,{numero: req.body.number, nome: req.body.name, git: req.body.git})
    .then(res.redirect('/students/' + req.body.number))
    .catch(error => res.render("error", {error: error}))
});

router.post("/students", function (req, res) {
  Student.insert({numero: req.body.number, nome: req.body.name, git: req.body.git})
    .then(res.redirect('/students/' + req.body.number))
    .catch(error => res.render("error", {error: error}))
});


router.delete("/students/:id", function (req, res) {
  Student.delete(req.params.id)
    .catch(error => res.render("error", {error: error}))
});

module.exports = router;
