const express = require("express");
let dotenv = require("dotenv").config();
const app = express();

const cors = require("cors");
const { mistralAIChat } = require("./utils/models/mistralai");
const { openAIChat } = require("./utils/models/openai");

const router = express.Router();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

app.get("/test", async (req, res) => {
  let data;
  const response = await mistralAIChat("what is 100/5?");
  res.send("Hello World!" + process.env.MISTRAL_API_KEY + response);

  console.log("Chat:");
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

  // const response = await openAIChat([]);
  const response = await mistralAIChat(queryText);
  // const data = response.data;
  const data = JSON.stringify(response);

  // const data = JSON.stringify(queryText)
  console.log("solved", queryText);
  res.send(data);
});
app.listen(process.env.PORT || 3001);
