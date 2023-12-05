const express = require('express');
const path = require('path');
const {Workout} = require("./models")
const routes = require("./routes");
const db = require('./config/connection.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/seed', async (req, res) => {
    await Workout.create([
        {
            workout_name: "Pull Workout"
        },
        {
            workout_name: "Push Workout"
        }
    ])
    res.json({message:"Seeded!"})
});


app.get('/test', async(req, res) => {
    let workouts = await Workout.find({})
    res.json(workouts);
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}


db.once('open', () => {

      app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
            //console.log("cool beans butt facebook facebook")
      });
  });

