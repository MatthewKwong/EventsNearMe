const fetch = require('node-fetch');
//  calling that we're using the express library
const express = require('express');
//  get me that url -- we want the response
const handlebars = require('express-handlebars');
//  calling that we're using the Mongoose db library
const mongoose = require('mongoose');

const server = express();

// mongoose.connect('mongodb://localhost/example-app');
server.use(express.static('public'));

server.engine('handlebars', handlebars({ defaultLayout: 'index' }));
server.set('view engine', 'handlebars');

//  database stuff
// const Person = mongoose.model('person', {
//   name: String,
//   age: Number,
//   gender: String,
// });
//


server.get('/', (req, res) => {
  res.render('home')
})

//  Events variable
server.get('/search', (req, res) => {
  const eventType = req.query.eventType;
  const location = req.query.location;
  const radius = req.query.radius;

  fetch(`https://www.eventbriteapi.com/v3/events/search/?token=3OKSLFI7FNX2MJJFRLGY&q=${eventType}&location.address=${location}&location.within=${radius}mi&sort_by=date`)
    //  going to the store with money and im returning with X
    .then(response => response.json()) // .json is the TYPE WE WANT
    //  we have the stuff make ___ - THIS IS HANDLEBARS -.render is part of handlbars
    .then((json) => {
      // console.log(JSON.stringify(events.name.['text']))
      console.log(json.events[0].url);
      res.render('home', { events: json.events })
    }).catch(err => console.log(err));
});

//  put on localhost:3000
server.get('/', (req, res) => {
  Person.find()
    .then(person => res.render('home', { Person }));
});

server.listen(3000, () => {
  console.log("We're on port 3000");
});
