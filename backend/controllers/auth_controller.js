const bcrypt = require("bcryptjs");
const { getUserCollection } = require("../models/index");

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const users = getUserCollection();
        const userExists = await users.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };

        const result = await users.insertOne(newUser);
        const savedUser = result.insertedId ? await users.findOne({ _id: result.insertedId }) : newUser;

        req.session.user = {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
        };

        res.status(201).json({
            message: "Signup successful",
            user: req.session.user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Registration failed" });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = getUserCollection();
        const user = await users.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        req.session.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };

        res.json({
            message: "Signin successful",
            user: req.session.user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.clearCookie("connect.sid");
        res.json({ message: "Logged out successfully" });
    });
};

module.exports = { signup, signin, logout };
