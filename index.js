const express = require('express');
const index = express();
const expressHandlebars = require('express-handlebars');
const recipes = require('./controllers/recipes');

const handlebarsOptions = { defaultLayout: 'main' };
const handlebarsConfig = expressHandlebars(handlebarsOptions);
index.engine('handlebars', handlebarsConfig);
index.set('view engine', 'handlebars');

let bodyParser = require('body-parser');
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false }));

index.use(express.static('public'));
var methodOverride = require('method-override');
var app = express('_method');
app.use(methodOverride('X-HTTP-Method-Override'));

// logger
const logger = (req, res, next) => {
  console.log(req.method);
  next();
};

index.use(logger);
index.use('/recipes', recipes);

// LISTENER
index.listen(8081, () => {
  console.log('Listening on port 8081');
});
