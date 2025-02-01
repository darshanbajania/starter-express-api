const express = require("express");
let dotenv = require("dotenv").config();
const app = express();

const { Configuration, OpenAIApi } = require("openai");

const cors = require("cors");
const { mistralAIChat } = require("./utils/models/mistralai");

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

app.get("/test", async (req, res) => {
  let data;
  res.send("Hello World!" + process.env.MISTRAL_API_KEY);
  const response = await mistralAIChat();

  console.log("Chat:", response.choices[0].message.content);
});

app.post("/", async (req, resp) => {
  let gToken = req.body.gToken;
  let formData = new FormData();
  console.log("gtoken", gToken);
  formData.append("secret", process.env.gCaptchaKey);
  formData.append("response", gToken);
  try {
    fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("rechaptcha data", data);
        resp.send(data);
      });
  } catch (error) {
    console.log("gtoken error", error);
    resp.send({
      success: false,
      message: "captcha error",
    });
  }
});
app.post("/solve", async (req, res) => {
  const queryText = req.body.queryText;
  const promptText = `You answer mathematics problems like below:

Q: sum of 5 and 4
A:9

Q: What is the solution of (255+5)/2
A:130

Q: ${queryText}
A:`;
  const response = await openai.createCompletion({
    model: "gpt-4o-mini",
    prompt: promptText,
    temperature: 0,
    max_tokens: 7,
  });

  const data = response.data;
  // const data = JSON.stringify(queryText)
  console.log("solved", queryText);
  res.send(data);
});
app.listen(process.env.PORT || 3001);
