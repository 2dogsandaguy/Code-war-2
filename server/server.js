const express = require("express");
const path = require("path");
require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");

// Since we're using GraphQL, we do not need a 'routes' directory.
// const routes = require("./routes");

const { authMiddleware } = require("./utils/auth.js");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

// Start Apollo Server before applying middleware
const startApolloServer = async () => {
  try {
    await server.start();

    // Middleware for parsing JSON and URL-encoded data
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Apollo Server middleware
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: authMiddleware,
      })
    );

    // Static assets for production
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../client/dist")));

      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
      });
    }

    // Custom error handling middleware
    app.use((err, req, res, next) => {
      console.error("Error:", err.message);
      console.error("Stack trace:", err.stack);
      res.status(500).send("Internal Server Error");
    });

    db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });
  } catch (error) {
    console.error("Error starting Apollo Server:", error);
    console.error("Error details:", error.networkError?.result?.errors);
  }
};

// Call the async function to start the server

startApolloServer();
