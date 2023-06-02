// Create the schema for the tutorial collection
//author: Mohammed Ahmed Alkharusi
//date: 24/05/2023

const mongoose = require('mongoose');
// Define the schema
const tutorialSchema = new mongoose.Schema({
  tutorialDate: {
    type: Date,
    required: true
  },
  tutorialTime: {
    type: String,
    required: true
  },
  students: {
    type: [
      {
        //stor mongodb student id in an array 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      }
    ],
    validate: {
      //validate that there is at least one student and no more than 5
      validator: function (students) {
        return students.length > 0 && students.length <= 5;
      },
      message: 'There must be at least one student and a maximum of five students.'
    }
  },
  tutor: {
    //store mongodb tutor id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  tutorialNumber: {
    type: Number,
    required: true
  },
  tutorialAttendance: {
    type: String,
    enum: ['Attended', 'Cancelled', 'No Show'],
    required: true
  },
  tutorialSubject: {
    type: String,
    enum: ['English', 'Irish', 'Maths', 'Biology', 'Chemistry',
      'Physics', 'Computer Science'],
    required: true
  },
  tutorialNotes: {
    type: String,
    required: true
  }
});

// Create the schema for the tutorial collection
module.exports = mongoose.model('tutorial', tutorialSchema);
