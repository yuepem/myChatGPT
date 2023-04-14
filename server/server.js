import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Hello, I am alive!'
    })
  })

app.post("/", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `${message}`
                    // content: "hi there"
                }
            ]
        });
        // console.log(response.data.choices[0].message);
        res.status(200).send({
            bot: response.data.choices[0].message.content
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
})

app.listen(5000, () => {
    console.log("Example app listening at http://localhost:5000")
})