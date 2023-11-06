const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserModel = require("./Models/user");
const password = "guidito11";
const dbname = "verifarmafakeflix";
const uri = `mongodb+srv://guidopawluk:${password}@${dbname}.bmawzzg.mongodb.net/?retryWrites=true&w=majority`;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(uri);

const users = [];

app.get("/", (req, res) => {
	res.json(users);
});

app.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new UserModel({
			username,
			password: hashedPassword,
		});

		user.save();

		res.status(201).send("User registered successfully");
	} catch (error) {
		console.error(error);
		res.status(500).send("Error registering user");
	}
});

const PORT = 4040;
app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});
