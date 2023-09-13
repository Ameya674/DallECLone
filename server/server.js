const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/images", async (req, res) => {

    try {
        const response = await openai.createImage({
            prompt: req.body.message,
            n: 2,
            size: "1024x1024",
          });
          console.log(response.data.data);
          res.send(response.data.data)
    }
    catch(error) {
        console.error(error);
    }
  
});

app.listen(4000, () => {
  console.log(`Server running on port: ${4000}`);
});
