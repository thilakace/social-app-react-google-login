require('dotenv').config();
const express = require('express')
const app = express()
const http = require('http');
const cors = require('cors');
es6Renderer = require('express-es6-template-engine');
var bodyParser = require('body-parser');


// view engin  // npm i express-es6-template-engine --save
app.engine('html', es6Renderer);
app.set('views', 'app/views');
app.set('view engine', 'html');

// public folder made here
app.use(express.static(__dirname + '/public'));

// form submit
app.use(bodyParser.json({limit: '50mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true,  limit: '500mb', parameterLimit: 100000, })); // for parsing application/x-www-form-urlencoded

// set port from env
app.set('port', process.env.PORT || 3008)
app.listen(app.get('port'))

app.use(cors())
// for routes
app.use(require('./app/routes/route'))

module.exports = app // for testings





