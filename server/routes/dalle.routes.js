import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';



dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


router.route('/').get((req,res) => {
    res.status(200).json({message:"Hello from dalle routes"})
})


router.route('/').post(async(req,res)=>{
    try{
        const {prompt} = req.body;
        
        if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
            return res.status(400).json({ message: "Prompt is required and must be a non-empty string." });
        }

        console.log("Received prompt:", prompt);
        const response = await openai.images.generate({
            model: "dall-e-2", 
            prompt: prompt,
            n: 1,
            size: '256x256',
            response_format: 'b64_json',
        //    style: "vivid",
        });

        
        const image  = response.data[0].b64_json;
        res.status(200).json({photo: image});
       

    }catch(error){
        console.error("requesr post error:",error);
        res.status(500).json({message:"System went wrong:("})
    }
})



export default router;