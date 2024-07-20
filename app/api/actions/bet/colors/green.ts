const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Replace with your desired port number

app.use(bodyParser.json());

// Define your route for /api/actions/bet/green
app.post('/api/actions/bet/green', async (req, res) => {
    try {
        // Assuming you have a function to handle the transaction
        const transaction = await transferSolTransaction({ from: req.body.account, color: 'GREEN', amount: 1 });

        // Assuming you have a function to create the response payload
        const payload = await createPostResponse({
            fields: {
                transaction,
                message: `You bet on GREEN!`,
            },
        });

        // Respond with the payload
        res.json(payload);
    } catch (error) {
        console.error('Error processing bet on GREEN:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000`);
});
