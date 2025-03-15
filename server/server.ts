const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// for use of DB URI
require('dotenv').config();

// parse text from html forms
app.use(express.urlencoded({ extended: true }));
// parse JSON
app.use(express.json());

// serve static assests in build folder
app.use(express.static(path.resolve(__dirname, '../assets')));

// route for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
      log: 'Express error handler caught an error in middleware',
      status: 500,
      message: { err: 'An error occurred' }
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});