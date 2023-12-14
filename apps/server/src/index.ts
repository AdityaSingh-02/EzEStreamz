const express = require('express');

const app = express();

app.get("/",(req:any, res:any) => {
    res.send("Hello world")
})

app.listen(8080);