const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const port = 4000;

const app = express()
app.use(cors());
app.get("/", (req, res) => {
    res.send("Express app is running")
})

app.listen(port, (error) => {
    if (error) {
        console.log("error:" + error);
    } else {
        console.log("server is running on port " + port)
    }
})