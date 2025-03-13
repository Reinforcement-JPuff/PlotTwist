const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// parse text from html forms
app.use(express.urlencoded({ extended: true }));
// parse JSON
app.use(express.json());

// serve static assests in build folder
app.use(express.static(path.resolve(__dirname, '../assets')));

// route for root
app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
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