const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();


app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
	res.send("It's working");
})

app.post('/signin', (req, res) => {
	signIn.handleSignIn(req, res, db, bcrypt)
})

app.post('/register', (req, res) => { 
	register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
	profile.getProfile(req, res, db)
})

app.put('/image', (req, res) => {
	image.handleImage(req, res, db)
})

app.post('/imageapi', (req, res) => {
  image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 4001, () => {
	console.log("app is running on port ${process.env.PORT}")
})