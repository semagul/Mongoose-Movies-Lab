const mongoose = require("mongoose");

const Celebrity = require("./models/Celebrity");

require("dotenv/config");
const mongouri = process.env.MONGODB_URI;
mongoose.connect(mongouri);


const celebrities = [
    {
        name : "Anthonio Banderas",
        occupation : "actor",
        catchPhrase : "YOLO"
    },

    {
        name : "Anthonio Saleme",
        occupation : "liar",
        catchPhrase : "I am the baddie"
    },

    {
        name : "Marie Antoinette",
        occupation : "queen",
        catchPhrase : "If you can't bread, have some Berliner"
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