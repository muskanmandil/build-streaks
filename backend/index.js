const express = require("express");
const connectDB = require('./config/db');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes')
const questionRoutes = require('./routes/questionRoutes')
const userRoutes = require('./routes/userRoutes')
const otherRoutes = require('./routes/otherRoutes')
require("dotenv").config();

const port = 4000;
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
    res.send("Express app is running");
});

app.use('/auth', authRoutes);
app.use('/question', questionRoutes);
app.use('/user', userRoutes);
app.use('', otherRoutes);

app.listen(port, (error) => {
    if (!error) {
        console.log("server is running on port : " + port);
    } else {
        console.log("Error : " + error);
    }
});
