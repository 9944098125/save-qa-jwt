const Qa = require("../models/QA");

const create = async (req, res, next) => {
	const { userId, toolId, question, answer, importance } = req.body;
	try {
		const newQA = new Qa({
			userId,
			toolId,
			question,
			answer,
			importance,
		});
		await newQA.save();
		res.status(201).json({ message: "QA created successfully 🤩" });
	} catch (err) {
		next(err);
	}
};

const read = async (req, res, next) => {
	const { userId, toolId } = req.params;
	try {
		const qaList = await Qa.find({
			userId,
			toolId,
		});
		res.status(200).json({
			message: "Fetched the list of Questions and answers 😁",
			qa: qaList,
		});
	} catch (err) {
		next(err);
	}
};

const updateQA = async (req, res, next) => {
	const { qaId } = req.params;
	const { userId, toolId, question, answer, importance } = req.body;
	try {
		const updatedQa = await Qa.findByIdAndUpdate(
			qaId,
			{
				$set: {
					userId,
					toolId,
					question,
					answer,
					importance,
				},
			},
			{ new: true }
		);
		res.status(200).json({
			message: "QA updated successfully 🤩",
			qa: updatedQa,
		});
	} catch (err) {
		next(err);
	}
};

const deleteQA = async (req, res, next) => {
	const { qaId } = req.params;
	try {
		await Qa.findByIdAndDelete(qaId);
		res.status(200).json({ message: "QA Deleted successfully 🗑️" });
	} catch (err) {
		next(err);
	}
};

module.exports = { create, read, updateQA, deleteQA };
