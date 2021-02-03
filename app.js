const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("HelloWorld");
});

app.get('/test', (req, res) => {
  res.send("toast");
});

app.listen(3000, () => console.log("Listening"));
