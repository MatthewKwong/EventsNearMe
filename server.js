const fetch = require('node-fetch');
//  calling that we're using the express library
const express = require('express');
//  get me that url -- we want the response
const handlebars = require('express-handlebars');
//  calling that we're using the Mongoose db library
const mongoose = require('mongoose');

const server = express();

const indexRouter = require('./routes/index');

server.use('/none', indexRouter);

// mongoose.connect('mongodb://localhost/example-app');
server.use(express.static('public'));

server.engine('handlebars', handlebars({
  defaultLayout: 'index'
}));
server.set('view engine', 'handlebars');

server.get('/', (req, res) => {
  res.render('results')
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
  console.log("Start time: " + startTime);

  endTime = year + "-" + month + "-" + day + "T" + endTime + ":00Z";
  console.log("End time: " + endTime);

  // const longitude = req.query.longitude;
  // const latitude = req.query.latitude;


  fetch(`https://www.eventbriteapi.com/v3/events/search/?token=3OKSLFI7FNX2MJJFRLGY&sort_by=date&q=${eventType}&location.address=${location}&start_date.range_start=${startTime}&start_date.range_end=${endTime}`)

    //  going to the store with money and im returning with X
    .then(response => response.json()) // .json is the TYPE WE WANT
    //  we have the stuff make ___ - THIS IS HANDLEBARS -.render is part of handlbars

    .then((json) => {
      // show the event time on each card
      json.events.map((event) => {
        event.start.formatted = new Date(event.start.local);
        console.log(event.start.local);

        // Start Hours
        event.start.hours = new Date(event.start.local).getHours();
        event.start.minutes = new Date(event.start.local).getMinutes();

        // End Hours
        event.end.hours = new Date(event.end.local).getHours();
        event.end.minutes = new Date(event.end.local).getMinutes();
        let dayOrNight = 'am';

        //  Start Hours
        if (new Date(event.start.local).getHours() > 12) {
          event.start.hours = new Date(event.start.local).getHours() - 12;
          dayOrNight = 'pm';
        }
        else if(new Date(event.start.local).getHours() === 12) {
          event.start.hours = new Date(event.start.local).getHours();
          dayOrNight = 'pm';
        }
        else if(new Date(event.start.local).getHours() === 0) {
          event.start.hours = 12;
          dayOrNight = 'am';
        }
        //  End Hours
        if (new Date(event.end.local).getHours() > 12) {
          event.end.hours = new Date(event.end.local).getHours() - 12;
          dayOrNight = 'pm';
        }
        else if(new Date(event.end.local).getHours() === 12) {
          event.end.hours = new Date(event.end.local).getHours();
          dayOrNight = 'pm';
        }
        else if(new Date(event.end.local).getHours() === 0) {
          event.end.hours = 12;
          dayOrNight = 'am';
        }

        // Start - Full complete output
        event.start.startOutput = (event.start.hours + ":" +  event.start.minutes + dayOrNight);

        //  If event needs :00
        if(new Date(event.start.local).getMinutes() === 0) {
          event.start.startOutput =  (event.start.hours + ":00" + dayOrNight);
        }

        else{
          event.start.startOutput = (event.start.hours + ":" +  event.start.minutes + dayOrNight);
        }
        console.log(event.start.startOutput);

        // End - Full complete output
        event.end.endOutput = (event.end.hours + ":" +  event.end.minutes + dayOrNight);

        //  If event needs :00
        if(new Date(event.end.local).getMinutes() === 0) {
          event.end.endOutput =  (event.end.hours + ":00" + dayOrNight);
        }
        else{
          event.end.endOutput = (event.end.hours + ":" +  event.end.minutes + dayOrNight);
        }
        console.log(event.end.endOutput);


        // Free Events
        if (event.is_free === true) {
          event.price = "FREE";
        }
        return event;
      });


      //  render page
      res.render('results', {
        events: json.events,
      });

    }).catch(err => console.log(err));
});





//  put on localhost:3000
// server.get('/', (req, res) => {
//   Person.find()
//     .then(person => res.render('results', { Person }));
// });

server.listen(3000, () => {

  console.log("We're on port 3000");
});
