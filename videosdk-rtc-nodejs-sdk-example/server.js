require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { default: fetch } = require("node-fetch");
const jwt = require("jsonwebtoken");

const PORT = 9000;
const app = express();
/* my part*/
/* my code here */
const apps = require('http').createServer(app)

const io = require('socket.io')(apps)
io.on('connection', socket => {
        socket.on('message', ({ name, message }) => {
            io.emit('message', { name, message })
        })
    })
    /* my part */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//
app.get("/get-token", (req, res) => {
    const API_KEY = process.env.VIDEOSDK_API_KEY;
    const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;
    console.log(API_KEY);

    const options = { expiresIn: "10m", algorithm: "HS256" };

    const payload = {
        apikey: API_KEY,
        permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
    };

    const token = jwt.sign(payload, SECRET_KEY, options);
    res.json({ token });
});

//
app.post("/create-meeting/", (req, res) => {
    const { token, region } = req.body;
    const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
    const options = {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({ region }),
    };

    fetch(url, options)
        .then((response) => response.json())
        .then((result) => res.json(result)) // result will contain meetingId
        .catch((error) => console.error("error", error));
});

//
app.post("/validate-meeting/:meetingId", (req, res) => {
    const token = req.body.token;
    const meetingId = req.params.meetingId;

    const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;

    const options = {
        method: "POST",
        headers: { Authorization: token },
    };

    fetch(url, options)
        .then((response) => response.json())
        .then((result) => res.json(result)) // result will contain meetingId
        .catch((error) => console.error("error", error));
});

//
app.listen(PORT, () => {
    console.log(`API server listening at http://localhost:${PORT}`);
});
apps.listen(5000, () => {
    console.log(`API server listening at http://localhost:${5000}`);
});