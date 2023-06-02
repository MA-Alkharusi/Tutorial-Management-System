//desc: This file contains the routes for the student collection
//author: Mohammed Ahmed Alkharusi
//date: 24/05/2023

const express = require('express');
const router = express.Router();
const Student = require('../models/student');

//create a new student
router.post('/', async (req, res) => {
  try {
    // Create a new student object based on the request body
    const newStudent = new Student(req.body);

    // Save the student to the database
    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent); // Respond with the saved student
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle any errors
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find(); // Find all students in the collection
    res.json(students); // Respond with the students
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
});

// Get student by id
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id); // Find student by id
    if (!student) {
      return res.status(404).json({ message: 'Student not found' }); // If student doesn't exist return 404 error
    }
    res.json(student); // If student exists return the student
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
});

// Update student by id
router.patch('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id); // Find student by id
    if (!student) {
      console.log('Student not found');
      return res.status(404).json({ message: 'Student not found' }); // If student doesn't exist return 404 error
    }

    // Update the student object with non empty fields from the request body
    if (req.body.title !== undefined && req.body.title !== '') {
      student.title = req.body.title;
    }

    if (req.body.otherSpecify !== undefined && req.body.otherSpecify !== '') {
      student.otherSpecify = req.body.otherSpecify;
    }

    if (req.body.firstName !== undefined && req.body.firstName !== '') {
      student.firstName = req.body.firstName;
    }

    if (req.body.surname !== undefined && req.body.surname !== '') {
      student.surname = req.body.surname;
    }

    if (req.body.phoneNumber !== undefined && req.body.phoneNumber !== '') {
      student.phoneNumber = req.body.phoneNumber;
    }

    if (req.body.emailAddress !== undefined && req.body.emailAddress !== '') {
      student.emailAddress = req.body.emailAddress;
    }

    if (req.body.homeAddress !== undefined) {
      if (req.body.homeAddress.addressLine1 !== undefined && req.body.homeAddress.addressLine1 !== '') {
        student.homeAddress.addressLine1 = req.body.homeAddress.addressLine1;
      }

      if (req.body.homeAddress.addressLine2 !== undefined && req.body.homeAddress.addressLine2 !== '') {
        student.homeAddress.addressLine2 = req.body.homeAddress.addressLine2;
      }

      if (req.body.homeAddress.town !== undefined && req.body.homeAddress.town !== '') {
        student.homeAddress.town = req.body.homeAddress.town;
      }

      if (req.body.homeAddress.county !== undefined && req.body.homeAddress.county !== '') {
        student.homeAddress.county = req.body.homeAddress.county;
      }

      if (req.body.homeAddress.eircode !== undefined && req.body.homeAddress.eircode !== '') {
        student.homeAddress.eircode = req.body.homeAddress.eircode;
      }
    }

    if (req.body.additionalDetails !== undefined) {
      if (req.body.additionalDetails.dateOfBirth !== undefined && req.body.additionalDetails.dateOfBirth !== '') {
        student.additionalDetails.dateOfBirth = req.body.additionalDetails.dateOfBirth;
      }

      if (req.body.additionalDetails.parentGuardianName !== undefined && req.body.additionalDetails.parentGuardianName !== '') {
        student.additionalDetails.parentGuardianName = req.body.additionalDetails.parentGuardianName;
      }

      if (req.body.additionalDetails.virtualAttendance !== undefined && req.body.additionalDetails.virtualAttendance !== '') {
        student.additionalDetails.virtualAttendance = req.body.additionalDetails.virtualAttendance;
      }

      if (req.body.additionalDetails.gender !== undefined && req.body.additionalDetails.gender !== '') {
        student.additionalDetails.gender = req.body.additionalDetails.gender;
      }

      if (req.body.additionalDetails.subject !== undefined && req.body.additionalDetails.subject !== '') {
        student.additionalDetails.subject = req.body.additionalDetails.subject;
      }
    }

    const updatedStudent = await student.save(); // Save the updated student to the database
    res.json(updatedStudent); // Respond with the updated student
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle any errors
  }
});



// Delete student by id
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id); // Find student by id and delete
    if (!student) {
      return res.status(404).json({ message: 'Student not found' }); // If student doesn't exist return 404 error
    }
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
});


// Export the router
module.exports = router;