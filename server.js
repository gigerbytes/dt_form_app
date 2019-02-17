// server.js
// load the things we need
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const fs = require('fs')
var app = express()

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));


// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/form', (req, res) => {
  res.render('form')
})

app.post('/submit', (req, res) => {
  console.log(req.body.name)
  fs.appendFileSync('data/names.txt', req.body.name+'\n')
  res.render('submit')
})

app.get('/view', (req, res) => {
  let data  = fs.readFileSync('data/names.txt', 'utf8')
  console.log(data)
  res.render('view', {'data': data})
})

app.listen(3000);
console.log('3000 is the magic port');
