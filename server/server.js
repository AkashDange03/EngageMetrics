import express from "express";
import cors from "cors"
import axios from "axios";
import 'dotenv/config'

const app = express()


app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;


app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.post("/chat",async (req,res)=>{
    try{
        const {input_value} = req.body;
        const response = await axios.post(
            'https://api.langflow.astra.datastax.com/lf/56dfbd7b-ecff-4927-b7f5-05c44871f7f1/api/v1/run/507b955a-c503-42d5-9d2e-279e40ab2be2?stream=false',
            {
                input_value,
                output_type: 'chat',
                input_type: 'chat',
                tweaks: {
                    "ParseData-bU2Lk": {},
                    "SplitText-s45X9": {},
                    "OpenAIModel-Bunci": {},
                    "ChatOutput-8sI0F": {},
                    "AstraDB-66x6b": {},
                    "File-j3YRd": {},
                    "ChatInput-iAwEu": {},
                    "CombineText-1kBZ6": {},
                    "TextInput-upHmt": {}
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.APPLICATION_TOKEN}`
                }
            }
        );

        const message = response.data.outputs[0].outputs[0].results.message.text;
        console.log(message);
        res.send(message);
    }catch(e){
        console.log(e);
    }
})

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})