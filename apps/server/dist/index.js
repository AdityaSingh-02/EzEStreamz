"use strict";
const express = require('express');
const app = express();
app.get("/", (req, res) => {
    res.send("Helo world");
});
app.listen(8080);
