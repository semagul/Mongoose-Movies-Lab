const mongoose = require("mongoose");

const Celebrity = require("./models/Celebrity");

require("dotenv/config");
const mongouri = process.env.MONGODB_URI;
mongoose.connect(mongouri);


const celebrities = [
    {
        name : "Anthonio Banderas",
        occupation : "Actor",
        catchPhrase : "You only live once"
    },

    {
        name : "Madonna",
        occupation : "Singer",
        catchPhrase : "Sky is the limit"
    },

    {
        name : "Steven Spielberg",
        occupation : "Director",
        catchPhrase : "Directing is creating a new universe"
    },
];

Celebrity.insertMany(celebrities)
  .then((celebritiesFromDB) => {
    console.log(
      `Success - ${celebritiesFromDB.length} celebrities got created`
    );
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));