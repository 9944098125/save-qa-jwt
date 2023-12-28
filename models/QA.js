const mongoose = require("mongoose");

const qaSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true,
		},
		answer: {
			type: String,
			required: true,
		},
		importance: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true }
);

const Qa = mongoose.model("Qa", qaSchema);

module.exports = Qa;
