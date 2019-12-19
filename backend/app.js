const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const gameRoutes = require('./routes/game');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middlewares
app.use('/posts', () => {
	console.log('hello, middleware here!!!!!');
});


app.use('/game', gameRoutes);

app.get('/', (req, res) => {
	res.send('We are here boys!');
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
	console.log('connected to mongoDB');
});

app.listen(3000);
