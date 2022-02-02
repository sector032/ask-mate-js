// EXPRESS JS
const express = require("express");
const app = express();
const port = 3000;
var fs = require("fs");
app.set("view engine", "ejs");
const { response } = require("express");
const {
	getQuestion,
	getQuestions,
	getAnswers,
	writeQuestion,
	writeAnswer,
	deleteQuestion,
	updateVotes,
	something,
} = require("./data_manager");
const { CLIENT_RENEG_LIMIT } = require("tls");

app.use(
	express.urlencoded({
		extended: false,
	})
);

app.get("/", async (req, res) => {
	const questions = await getQuestions();
	res.render("index", { questions: questions });
});

app.get("/question/:id", async (req, res) => {
	const id = req.params.id;
	const question = await getQuestion(id);
	const answers = await getAnswers(id);
	res.render("question", { question: question, id: id, answers: answers });
});

app.get("/add", (req, res) => {
	res.render("ask-question");
});

app.post("/add", (req, res) => {
	const { title, message } = req.body;
	const date = Date.now();
	const id = Math.floor(Math.random() * 100000);
	const voteNumber = 0;
	const viewNumber = 0;
	const image = false;
	writeQuestion(id, date, viewNumber, voteNumber, title, message, image);
	res.redirect("/");
});

app.get("/question/:id/new-answer", (req, res) => {
	const questionId = req.params.id;
	res.render("add-answer", { questionId: questionId });
});

app.post("/question/:id/new-answer", (req, res) => {
	const { message } = req.body;
	const questionId = req.params.id;
	const date = Date.now();
	const id = Math.floor(Math.random() * 100000);
	const voteNumber = 0;
	const image = false;
	writeAnswer(id, date, voteNumber, questionId, message, image);
	res.redirect(`/question/${questionId}`);
});

app.get("/delete/:id", (req, res) => {
	const { id } = req.params;
	deleteQuestion(id);
	res.send("Hi");
});

app.get("/question/up/:id", async (req, res) => {
	const { id } = req.params;
	//updateVotes(id);
	something(id)
});

app.post("/question/vote-up", (req, res) => {
	console.log("hi");
});

/// PORT
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
