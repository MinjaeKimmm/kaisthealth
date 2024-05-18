const express = require('express');
const cors = require('cors');

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