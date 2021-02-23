const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 8080;
const morgan = require('morgan')

const Workout = require("./models/workout.js");

const app = express();
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Routes-html
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));

});

app.get("/exercise", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/stats.html"));
});


app.listen(PORT, ()=> console.log("app running on " + PORT))

// routes-api
app.post("/api/workouts", function(req, res) {
	Workout.create({}).then(workoutObject => 
		res.json(workoutObject)).catch(err => res.json(err))

});

app.put("/api/workouts/:id", function(req, res){
	Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } },{ new: true, runValidators: true}).then(workoutObject => 
		res.json(workoutObject)).catch(err => res.json(err))
});

app.get("/api/workouts/range", function(req, res){
	Workout.aggregate([
		{
			$addFields:{
				totalDuration:{
					$sum:"$exercises.duration"
				},
			},
		},
	]).sort({_id:-1}).limit(7).then(workoutObject => 
		res.json(workoutObject)).catch(err => res.json(err))
});

app.get("/api/workouts", function(req, res){
	Workout.aggregate([
		{
			$addFields:{
				totalDuration:{
					$sum:"$exercises.duration"
				},
			},
		},
	]).then(workoutObject => 
		res.json(workoutObject)).catch(err => res.json(err))
	});

	app.delete("/api/workouts", function(req, res){
		Workout.findByIdAndDelete(body.id).then(()=> res.json(true)).catch(err => res.json(err))
	});