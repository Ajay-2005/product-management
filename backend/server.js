require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database_connection");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));


app.use(express.json());
const session = require("express-session");
connectDB();

app.use(session({
    secret: "mysession",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));


app.use("/api", require("./routes/index"));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
