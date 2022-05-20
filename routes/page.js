const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { Domain } = require('../models');
const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

const json = [
    {}
];

router.get('/', (req, res, next) => {
    res.json(json);
});

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