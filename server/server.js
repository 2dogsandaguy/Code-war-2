const express = require('express');
const path = require('path');
const { Workout } = require("./models")
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
// Since we're using GraphQL, we do not need a 'routes' directory.
// const routes = require("./routes");
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection.js');
const { authMiddleware } = require('./utils/auth.js');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
    }));


        // I'm not sure if we need this code when ApolloServer starts up?
    //
    // app.use(express.static(path.join(__dirname, '../client/dist')));
    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    // });

    // app.get('/seed', async (req, res) => {
    //     await Workout.create([
    //         {
    //             workout_name: "Pull Workout"
    //         },
    //         {
    //             workout_name: "Push Workout"
    //         }
    //     ])
    //     res.json({message:"Seeded!"})
    // });


    // app.get('/test', async(req, res) => {
    //     let workouts = await Workout.find({})
    //     res.json(workouts);
    // });


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
};

startApolloServer();
