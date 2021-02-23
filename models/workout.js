const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// new schema
const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },

exercises: [
    {
        type: {
            type: String,
            trim: true
        },
        name: {
            type: String,
            trim: true,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        sets: {
            type: Number,
            required: true
        },
        reps: {
            type: Number,
            required: true
        },
        distance: {
            type: Number,
            required: true
        },
    }]
});


const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;