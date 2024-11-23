const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

// Obter perguntas por categoria e dificuldade
router.get('/', async (req, res) => {
    const { category, difficulty } = req.query;

    try {
        const questions = await Question.find({ category, difficulty });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
