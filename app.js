const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const mongoose = require('./models/connection');
const bodyParser = require('body-parser');
const session = require('express-session');

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

const app = express();
const port = 3000;

const authsRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const clientRouter = require('./routes/clientRoutes');
const adminRouter = require('./routes/adminRoutes');

 // Listening to the port provided
 app.listen(port, function() {
  console.log('App listening at port '  + port)
});

app.engine( 'hbs', exphbs({
    extname: 'hbs', 
    defaultView: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'), 
    partialsDir: path.join(__dirname, '/views/partials'), 
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    
  }));

  app.set('view engine', 'hbs');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));

app.use(session({
  secret: 'somegibberishsecret',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 1 * 7 }
}));

app.use(flash());
// Global messages vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});
// Listening to the port provided


app.use('/', authsRouter);
app.use('/',indexRouter);
app.use('/user/',clientRouter);
app.use('/admin/',adminRouter);