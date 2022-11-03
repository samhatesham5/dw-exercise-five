const express = require('express');
const app = express();
const port = 4000; 

const indexRoute = require('./routes/index.js');

app.use ("/", indexRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}); 

