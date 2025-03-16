const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');

const AuthController = require('./controllers/AuthController');
const CreateStoryController = require('./controllers/CreateStoryController');

// for use of DB URI
require('dotenv').config();

// parse text from html forms
app.use(express.urlencoded({ extended: true }));
// parse JSON
app.use(express.json());
// parse cookies
app.use(cookieParser());

// serve static assests in build folder
app.use(express.static(path.resolve(__dirname, '../assets')));

// route for root
app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// route for login & auth
app.post('/login', AuthController.checkCookie, AuthController.verifyUser, (req: any, res: any) => {
  res.status(200).send(`Welcome, ${res.locals.verifiedUser}`).redirect('/home');
});

// route for new logins, redirect to login after a new account is made
app.post('/newLogin', AuthController.verifyUser,(req: any, res: any) => {
  res.status(200).redirect('/login');
});

// route for story creation (new story nodes)
app.post('/storyCreator', /* CreateStoryController,*/ (req: any, res: any) => {
  res.status(200).json(/*res.locals.newStoryNode*/);
});

// global error handler
app.use((err: any, req: any, res: any, next: any) => {
  const defaultError = {
      log: 'Express error handler caught an error in middleware',
      status: 500,
      message: { err: 'An error occurred' }
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});