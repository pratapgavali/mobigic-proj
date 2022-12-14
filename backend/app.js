require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// My Routes
const authRoutes = require("./routes/auth");
const fileRoutes = require("./routes/file");

// DB Connection
mongoose.set('strictQuery', true);
// set your own local db url here
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("DB CONNECTED");
});


// Middlewares
app.use(bodyParser.json());
app.use(cors());

// My Routes
app.use("/api", authRoutes);
app.use("/api", fileRoutes);
app.use('/api/uploads', express.static('uploads'));

// PORT
port = process.env.PORT || 8000;


// Sarting server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});