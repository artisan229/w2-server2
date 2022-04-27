const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { Domain } = require('../models');
const { isLoggedIn } = require('./middleware');
const User = require('../models/user');

const router = express.Router();

router.get('/profile', (req, res) => {
    res.json({ title: '내 정보 - NodeBird' });
});

router.get('/', (req, res, next) => {
    res.json([
        {
            id: 12312,
            name: 'luke',
        },
        {
            id: 83294,
            name: 'sam',
        }
    ]);
});

router.get('/join', (req,res) => {
    res.sendFile(__dirname + 'join.html');
})

router.post('/domain', isLoggedIn, async (req, res, next) => {
    try {
        await Domain.create({
            UserId: req.user.id,
            host: req.body.host,
            type: req.body.type,
            clientSecret: uuidv4(),
        });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;