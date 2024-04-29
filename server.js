const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

// OpenAI API integration
app.use(express.json()); // to accept json data as we are taking input from fronten
const port = 6000;
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.API_KEY  
});


app.post("/text", async (request, response) => {
  const { chats } = request.body;
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: chats,
  });

  response.json({
    output: chatCompletion.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});