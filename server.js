const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


const port = process.env.PORT || 8000;

const USER_ID = "ishaanmanglik_27062003";
const EMAIL = "im3685@srmist.edu.in";
const ROLL_NUMBER = "Ra2111027010194";

app.use(cors());
app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            throw new Error("Invalid input: 'data' must be an array");
        }

        const numbers = data.filter(item => /^\d+$/.test(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
        const highestAlphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }) > 0 ? a : b)] : [];

        const response = {
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        };

        res.json(response);
    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});