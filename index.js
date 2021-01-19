const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = 9090;

app.engine( 'hbs', exphbs({
    extname: 'hbs', // configures the extension name to be .hbs instead of .handlebars
    defaultView: 'main', // this is the default value but you may change it to whatever you'd like
    layoutsDir: path.join(__dirname, '/views/layouts'), // Layouts folder
    partialsDir: path.join(__dirname, '/views/partials'), // Partials folder
  }));

  
  app.set('view engine', 'hbs');

  app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', function(req, res) {
    // The render function takes the template filename (no extension - that's what the config is for!)
    // and an object for what's needed in that template
    res.render('home', {
    })
});

app.get('/login', function(req, res) {
    res.render('login', {
      title: 'Welcome',
    })
  });

  app.get('/tenant', function(req, res) {
    res.render('tenantlist', {
      tenants:[
        {UnitNo:"1004",Name:"Ryan Yao", email:"ryan_yao@dlsu.edu.ph",contact:"09064515880",daypayment:"7th", Rent:"5000", Momis:"2"},
        {UnitNo:"1005",Name:"Ronald Yao", email:"ronaldyao@gmail.com",contact:"09065615778",daypayment:"15th", Rent:"3000", Momis:"3"}
      ]});
  });

  app.get('/rent-calendar', function(req, res) {
    res.render('calendar', {
     
    });
  });
  app.get('/registration-status', function(req, res) {
    res.render('registerlist', {
      reglist:[
        { Name:"Kimberly Yao", email:"kimberlyao@gmail.com",contact:"09064515880",UnitNo:"1004", DayChecking:"January 30, 2020", iday:"30", status:"Pending"},
        {Name:"Charlene Yao", email:"charleneyaoo@dlsu.edu.ph",contact:"09064515880",UnitNo:"1005", DayChecking:"January 30, 2020",  iday:"30",status:"Pending"}
      ]});
  });
  app.get('/problem-status', function(req, res) {
    res.render('problemlist', {
      problist:[
        { probid:"0001", unitno:"1005",probtype:"Plumbing",problemdes:"Water not falling down", probstatus:"Contacting.."}
    
      ]});
  });

  app.use(express.static('public'));

// Listening to the port provided
app.listen(port, function() {
  console.log('App listening at port '  + port)
});