const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: 'http://localhost:3000',
}), (req, res) => {
    res.redirect('http://localhost:3000');
});

router.get('/logout', (req, res)=>{
    req.logout();
    // res.clearCookie('name', {
    //     domain: .kakao.com
    // })
    res.redirect('http://localhost:3000');
})

module.exports = router;