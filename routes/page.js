const express = require('express');

const router = express.Router();

router.get('/profile', (req, res) => {
    res.json({ title: '내 정보 - NodeBird' });
});

router.get('/join', (req, res) => {
    res.json({ title: '회원가입 - NodeBird' });
});

router.get('/', (req, res, next) => {
    res.json([
        res.body
    ]);
});

module.exports = router;