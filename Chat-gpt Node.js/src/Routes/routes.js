const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({apiKey:'api-key'}); // Replace 'your-api-key' with your actual API key

router.use(express.json());

router.post('/chatbot', async (req, res) => {
    const { message } = req.body;

    try {
        console.log(message.toString(), "message");

        const gptResponse = await openai.completions.create({
            engine: 'davinci',
            model: 'gpt-3.5-turbo', // Specify the model parameter
            prompt: message.toString(),
            maxTokens: 150,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ['\n', 'testing']
        });
    
        console.log(gptResponse.data ,"gptResponse");
        
        // Send the response back to the client
        res.json({ response: gptResponse.data.choices[0].text });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
