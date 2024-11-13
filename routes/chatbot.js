const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const LAMBDA_API_URL =process.env.URILAMA

router.get('/botreq', (req, res) => {
    res.render('chatbot');
});

router.post('/', async (req, res) => {
    const userInput = req.body.prompt;
    

    let botReply = '';

    try {
        // Send userInput as a JSON object instead of plain text
        const response = await axios.post(
            LAMBDA_API_URL,
            { prompt: userInput }, // Send input as a JSON object
            {
                headers: {
                    'Content-Type': 'text/plain', // Set Content-Type to application/json
                    'Accept': 'application/json'
                }
            }
        );

        // Parse Lambda response
        if (response.data && response.data.body) {
            const lambdaBody = JSON.parse(response.data.body);  // Parse JSON string in `body`
            botReply = lambdaBody.reply || 'Unexpected response format from Lambda.';
        } else {
            botReply = 'Unexpected response format from Lambda.';
        }
    } catch (error) {
        console.error('Error calling Lambda function:', error);
        botReply = 'There was an error processing your request. Please try again later.';
    }

    res.render('chatbot', {
        response: {
            prompt: userInput,
            reply: botReply
        }
    });
});

module.exports = router;
