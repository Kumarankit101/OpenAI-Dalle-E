import express from "express"
import * as dotenv from "dotenv";
import OpenAI from "openai"

dotenv.config();

const router = express.Router();
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// })

const openai = new OpenAI();

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "gpt-3.5-turbo",
//   });
//   console.log(completion.choices[0]);
// }

//   router.route('/').get((req,res) =>{
//     res.send("hello openai")
//     main()
//   })
  router.route('/').post(async (req,res) =>{
    try {
        const {prompt} = req.body
        console.log(prompt)
        const aiResponse = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json'
          });
          
         const image = aiResponse.data[0].b64_json;
        //  console.log(aiResponse.data[0])
         res.status(200).json({photo: image})
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.aiResponse.data.error.message)
    }
  })
//   console.log(completion.choices[0]);


export default router
