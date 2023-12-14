const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {urlencoded} = require("express");
const userRouter = require('./routes/userRoutes');
const tweetRouter = require('./routes/tweetRoutes');
const feedsRouter = require('./routes/feedsRoutes');
const {dbUrl} = require("./constants");
const path = require('path')


const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));

let frontend_dir = path.join(__dirname, '..', 'frontend', 'public')
app.use(express.static(frontend_dir));

app.use('/user', userRouter);
app.use('/tweet', tweetRouter);
app.use('/feeds', feedsRouter);

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error('Could not connect to MongoDB', err));


app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});

app.listen(8080, () => {
    console.log('Server running on port 8080');
});
