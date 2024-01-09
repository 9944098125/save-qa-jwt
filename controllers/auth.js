const Users = require("../models/Users");
const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
	const { username, email, password, phone, image } = req.body;
	try {
		const existingUser = await Users.findOne({ email });
		console.log(existingUser);
		if (existingUser !== null) {
			return res.status(403).json({
				message:
					"User Already Exists with this Email 😒, Please try some other Email Address !",
			});
		}
		const hashRounds = bcryptJs.genSaltSync(10);
		const hashedPassword = bcryptJs.hashSync(password, hashRounds);
		const newUser = new Users({
			username,
			email,
			password: hashedPassword,
			phone,
			image,
		});
		await newUser.save();
		res.status(201).json({ message: "User Created Successfully 🤩" });
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const validUser = await Users.findOne({ email });
		if (!validUser) {
			return res.status(404).json({ message: "No User with this Email ❌ !" });
		}
		const passwordMatching = await bcryptJs.compare(
			password,
			validUser.password
		);
		if (!passwordMatching) {
			return res.status(302).json({ message: "Wrong Password Folk 😒 !" });
		}
		const userWithoutPassword = await Users.findOne({ email }).select(
			"-password"
		);
		const token = jwt.sign({ userId: validUser._id }, process.env.SECRET_TOKEN);
		res.status(200).json({
			message: "Login Success 😀",
			user: userWithoutPassword,
			token: token,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = { register, login };
