const express = require("express");
const { connection } = require("./db");
const { UserRoute } = require("./routes/User.Route");
const axios = require("axios")
const cors = require('cors')

const server = express();
server.use(express.json());

server.use("/user", UserRoute);

server.use(cors())

server.get("/recipes/search", async (req, res) => {
  const { query } = req.query;

  try {
    let apiUrl =
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=90adf2e6f0344635a5f8c78d1506aaa4&number=20";

    if (query) {
      apiUrl += `&query=${query}`;
    }

    // Make a request to the Spoonacular API
    const response = await axios.get(apiUrl);

    // Return the recipe search results
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Spoonacular API:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

server.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to database");
    console.log("server is running on port 8080");
  } catch (error) {
    console.log(error);
  }
});
