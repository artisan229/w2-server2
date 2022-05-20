const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res, done) => {
    try {
        console.log(req.body);
        const exUser = await User.findOne({
            where: { snsId: req.body.snsId, provider: 'kakao' },
        });
        if (exUser) {
            done(null, exUser);
        } else {
            const newUser = await User.create({
                email: req.body.email,
                nick: req.body.nick,
                snsId: req.body.snsId,
                provider: 'kakao',
            });
            done(null, newUser);
        }
    } catch (error) {
        console.error(error);
        done(error);
    }
})

module.exports = router;