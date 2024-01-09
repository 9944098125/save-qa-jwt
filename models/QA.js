const mongoose = require("mongoose");

const qaSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
		},
		toolId: {
			type: String,
			required: true,
		},
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
