const csv = require("csvtojson"); //parsing csv into json
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

const getQuestions = async function () {
	return await csv().fromFile("questions.csv");
};

const getQuestion = async function (id) {
	const questions = await csv().fromFile("questions.csv");
	return questions.find((question) => question.id === id);
};

const getAnswers = async function (id) {
	const answers = await csv().fromFile("answers.csv");
	return answers.filter((answer) => answer.question_id === id);
};

const writeQuestion = function (
	id,
	date,
	viewNumber,
	voteNumber,
	title,
	message,
	image
) {
	const csvWriter = createCsvWriter({
		path: "questions.csv",
		append: true,
		header: [
			{ id: "id", title: "id" },
			{ id: "date", title: "date" },
			{ id: "viewNumber", title: "viewNumber" },
			{ id: "voteNumber", title: "voteNumber" },
			{ id: "title", title: "title" },
			{ id: "message", title: "message" }, // a title az oszlop neve a csv-ben, az id pedig amivel
			{ id: "image", title: "image" },
		],
		recordDelimiter: "\r\n",
	});
	const records = [
		{
			id: id,
			date: date,
			viewNumber: viewNumber,
			voteNumber: voteNumber,
			title: title,
			message: message,
			image: image,
		},
	];
	csvWriter
		.writeRecords(records) // returns a promise
		.then(() => {
			console.log("...Done");
		});
};

const writeAnswer = function (
	id,
	date,
	voteNumber,
	questionId,
	message,
	image
) {
	const csvWriter = createCsvWriter({
		path: "answers.csv",
		append: true,
		header: [
			{ id: "id", title: "id" },
			{ id: "date", title: "date" },
			{ id: "voteNumber", title: "voteNumber" },
			{ id: "questionId", title: "questionId" },
			{ id: "message", title: "message" }, // a title az oszlop neve a csv-ben, az id pedig amivel
			{ id: "image", title: "image" },
		],
	});
	const records = [
		{
			id: id,
			date: date,
			voteNumber: voteNumber,
			questionId: questionId,
			message: message,
			image: image,
		},
	];
	csvWriter
		.writeRecords(records) // returns a promise
		.then(() => {
			console.log("...Done");
		});
};

const deleteRow = function (
	id,
	date,
	viewNumber,
	voteNumber,
	title,
	message,
	image
) {
	const csvWriter = createCsvWriter({
		path: "questions.csv",
		header: [
			{ id: "id", title: "id" },
			{ id: "date", title: "date" },
			{ id: "viewNumber", title: "viewNumber" },
			{ id: "voteNumber", title: "voteNumber" },
			{ id: "title", title: "title" },
			{ id: "message", title: "message" }, // a title az oszlop neve a csv-ben, az id pedig amivel
			{ id: "image", title: "image" },
		],
		recordDelimiter: "\r\n",
	});
	const records = [
		{
			id: id,
			date: date,
			viewNumber: viewNumber,
			voteNumber: voteNumber,
			title: title,
			message: message,
			image: image,
		},
	];
	csvWriter.writeRecords(records).then(() => {
		console.log("...Done");
	});
};

const deleteQuestion = async function (id) {
	/// ki kell javíteni a renderelési és törlési hibát
	const questions = await getQuestions();
	const deleted = questions.find((question) => question.id === id);
	if (deleted) {
		const removed = questions.filter((question) => question.id !== id);
		for (let remove of removed) {
			deleteRow(
				remove.id,
				remove.date,
				remove.viewNumber,
				remove.voteNumber,
				remove.title,
				remove.message,
				remove.image
			);
		}
	} else {
		console.log("Not okay!");
	}
};

const updateVotes = async function (id) {
	const question = await getQuestion(id);
	//const deleted = questions.find((question) => question.id === id);
	var newVoteNumber = parseInt(question.voteNumber) + 1;
	question.voteNumber = newVoteNumber + "";
	//át kell írni a jsonben a votenumber számát.
	console.log(question);
	writeQuestion(
		question.id,
		question.date,
		question.viewNumber,
		question.voteNumber,
		question.title,
		question.message,
		question.image
	);
};

const something = async function (id) {
	const question = await getQuestion(id);
	var newVoteNumber = parseInt(question.voteNumber) + 1;
	var newStuff = (question.voteNumber = newVoteNumber + "");
	var res = question.voteNumber.replace(question.voteNumber, newStuff);
	const newQuestion = await getQuestion(id);
	if (questions[id - 1].id === id) {
		var newShit = question.voteNumber;
		console.log(question.voteNumber.replace(question.voteNumber, newShit));
	} else {
		console.log("no");
	}
	console.log(newQuestion);
};

module.exports = {
	getQuestion,
	getQuestions,
	getAnswers,
	writeQuestion,
	writeAnswer,
	deleteQuestion,
	updateVotes,
	something,
};
