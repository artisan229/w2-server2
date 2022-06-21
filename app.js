const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const v1Router = require('./routes/v1');
const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 8001);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    })

if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
    app.use(morgan('combined'));
    app.use(helmet({ contentSeurityPolicy: false }));
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
};
if (process.env.NODE_ENV === 'production') {
    sessionOption.proxy = true;
}
app.use(session(sessionOption));

// app.use(cors({
//     origin: ["https://willywood.co.kr",
//         "https://www.willywood.co.kr",
//         "http://localhost:3000"],
//     credentials: true,
// }))

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/v1', v1Router);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500).render('error');
});

module.exports = app;

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})