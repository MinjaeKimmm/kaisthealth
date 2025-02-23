const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');

const authRouter = require('./routes/auth.js');
const searchRouter = require('./routes/search.js');
const userRouter = require('./routes/user.js')
const publicRouter = require('./routes/public.js')

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());

const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'tnfqkrtm',
    database: 'db'
});

module.exports = {
    init: function () {
      return mysql.createConnection(db_info);
    },
    connect: function (conn) {
      conn.connect(function (err) {
        if (err) console.error("mysql connection error : " + err);
        else console.log("mysql is connected successfully!");
      });
    },
};

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      //domain: "neymar.newbie.sparcsandbox.com",
      //secure: true,
      //path: '/'
      maxAge: 60 * 60 * 1000
    }
  })
);

const whitelist = ['http://localhost:3000', 'https://neymar.newbie.sparcsandbox.com'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "OPTIONS", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/public', publicRouter);
app.use('/auth', authRouter);
app.use('/search', searchRouter);
app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})