require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const equipmentRouter = require('./routes/public/equipments.js');
const gymRouter = require('./routes/public/gyms.js');
const postRouter = require('./routes/user/posts.js');
const profileRouter = require('./routes/user/profiles.js');
const scheduleRouter = require('./routes/user/schedules.js');
const authRouter = require('./routes/auth.js');
const searchRouter = require('./routes/search.js');

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

const whitelist = ['http://localhost:3000'];

app.use('/equipments', equipmentRouter);
app.use('/gyms', gymRouter);
app.use('/posts', postRouter);
app.use('/profiles', profileRouter);
app.use('/schedules', scheduleRouter);
app.use('/auth', authRouter);
app.use('/search', searchRouter);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})