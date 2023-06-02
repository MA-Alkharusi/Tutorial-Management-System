//Mohammed Ahmed Alkharusi
//24/05/2023
//This is the server file for the tutorial booking system
//This file is used to connect to the database and start the server
//This file also contains the code to test the backend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRouter = require('./routes/student');
const tutorRouter = require('./routes/tutor');
const tutorialRouter = require('./routes/tutorial');
const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
mongoose.connect('mongodb+srv://your mongodb link');

// Get a reference to the database
const db = mongoose.connection;

db.on('error', (error) => console.error(error));

db.once('open', () => console.log('Connected to Database'));
// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Use the student router for requests to the /student path
app.use('/student', studentRouter);

// Use the tutor router for requests to the /tutor path
app.use('/tutor', tutorRouter);

// Use the tutorial router for requests to the /tutorial path
app.use('/tutorial', tutorialRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    }
);

// to test the student backend
// http://localhost:3000/student
/*{
    "title": "Mr",
    "firstName": "mark",
    "surname": "McCormack",
    "phoneNumber": "083887437843",
    "emailAddress": "mark@mu.com",
    "homeAddress": {
      "addressLine1": "Maynooth University",
      "addressLine2": "Apt 21",
      "town": "Maynooth",
      "county": "kildare",
      "eircode": "W21FHM"
    },
    "additionalDetails": {
      "dateOfBirth": "1997-05-24",
      "parentGuardianName": "",
      "virtualAttendance": "Y",
      "gender": "Male",
      "subject": "Computer Science",
    }
  }*/

// to test the tutor backend
// http://localhost:3000/tutor

  /*{
  "title": "Mr",
  "firstName": "Mark",
  "surname": "McCormack",
  "phoneNumber": "083887437843",
  "emailAddress": "mark@mu.ie",
  "homeAddress": {
    "addressLine1": "Maynooth University",
    "addressLine2": "Apt 21",
    "town": "Maynooth",
    "county": "Kildare",
    "eircode": "W21FHM"
  }
}*/

// to test the tutorial backend
// http://localhost:3000/tutorial
/*{
  "tutorialDate": "2023-05-25",
  "tutorialTime": "14:00",
  "students": ["646ec1f387e5e7524de285b9", "646ebee787e5e7524de285ad"],
  "tutor": "646ec55887e5e7524de285d2",
  "fee": 50,
  "tutorialNumber": 3,
  "tutorialAttendance": "Attended",
  "tutorialSubject": "Maths",
  "tutorialNotes": "This is a tutorial note."
}*/