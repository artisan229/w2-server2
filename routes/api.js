const express = require('express');
const cors = require('cors');

const User = require('../models/user');
const Movie = require('../models/movie');

const router = express.Router();

router.get("/user/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: { id: id }
        });
        res.send(user);
    } catch (err) {
        console.error(err);
    }
})

router.get("/movie", cors(), async (req, res, next) => {
    try {
        const movies = await Movie.findAll();
        res.send(movies);
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;