const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("MongoDB Database connected successfully... 😀");
	} catch (err) {
		throw err;
	}
}

mongoose.connection.on("connected", () => {
	console.log("Database Connecting, please wait 🫸");
});
mongoose.connection.on("disconnected", () => {
	console.log("Database disconnecting, Something wrong 🚫");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/qa", require("./routes/qa"));

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMsg = err.message || "Something went wrong !";
	return res.status(errorStatus).json({
		message: errorMsg,
		status: errorStatus,
		stack: err.stack,
		success: false,
	});
});

const port = process.env.PORT;

app.listen(port, () => {
	connectDB();
	console.log(`App is now running 🏃‍♂️ on port ${port}`);
});
