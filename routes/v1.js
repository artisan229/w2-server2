const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/token', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findOne({
            where: { snsId: userId },
            attributes: ['nick', 'id'],
        })
        const token = jwt.sign({
            id: User.id,
            nick: User.nick,
        }, process.env.JWT_SECRET, {
            expiresIn: '1m',
            issuer: 'w2_server',
        });
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다.',
            token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
});

router.get('/test', verifyToken, (req, res) => {
    res.json(req.decoded);
});

module.exports = router;