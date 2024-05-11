const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const port = 4000;

const app = express()
app.use(cors());
app.use(express.json())

mongoose.connect("mongodb+srv://muskanmandil:HInzJBl4A3AkLEO8@cluster0.c6wwyow.mongodb.net/");

app.get('/', (req, res) => {
    res.send("Express app is running")
})

// Schema for users
const Users = mongoose.model("Users", {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: "User with this email addresss already exists" })
    }
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_user');
    res.json({ success: true, token });
})

app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_user');
            res.json({ succes: true, token });
        } else {
            res.json({ success: false, error: "wrong password" })
        }
    } else {
        return res.json({ success: false, error: "no user found" })
    }
})


app.listen(port, (error) => {
    if (error) {
        console.log("error:" + error);
    } else {
        console.log("server is running on port " + port)
    }
})