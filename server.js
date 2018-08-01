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

server.engine('handlebars', handlebars({
  defaultLayout: 'index'
}));
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
});

//  Events variable
server.get('/search', (req, res) => {
/* Start and End Times Events  */
  const eventType = req.query.eventType;
  const location = req.query.location;

  let startTime = req.query.startTime;
  let endTime = req.query.endTime;

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //  months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  startTime = year + "-" + month + "-" + day + "T" + startTime + ":00Z";
  console.log(startTime);

  endTime = year + "-" + month + "-" + day + "T" + endTime + ":00Z";
  console.log(endTime);




  fetch(`https://www.eventbriteapi.com/v3/events/search/?token=3OKSLFI7FNX2MJJFRLGY&q=${eventType}&location.address=${location}&start_date.range_start=${startTime}&start_date.range_end=${endTime}`)

    //  going to the store with money and im returning with X
    .then(response => response.json()) // .json is the TYPE WE WANT
    //  we have the stuff make ___ - THIS IS HANDLEBARS -.render is part of handlbars

    .then((json) => {
      // show the event time on each card
      json.events.map((event) => {
        event.start.formatted = new Date(event.start.local);
        console.log(event.start.local);


        //  formatted
        event.start.hour = (event.start.local).getHours();
        console.log(event.start.hour);

        event.start.minute = (event.start.local).getMinutes();
        console.log(event.start.minute);




        return event;








      });

      //  render page
      res.render('home', {
        events: json.events
      });
    }).catch(err => console.log(err));
});

//  put on localhost:3000
// server.get('/', (req, res) => {
//   Person.find()
//     .then(person => res.render('home', { Person }));
// });

server.listen(3000, () => {

  console.log("We're on port 3000");
});
