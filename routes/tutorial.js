//desc: This file contains the routes for the tutorial collection
//author: Mohammed Ahmed Alkharusi
//date: 24/05/2023

const express = require('express');
const router = express.Router();
const Tutorial = require('../models/tutorial');

// create a new tutorial
router.post('/', async (req, res) => {
  try {
    // Create a new tutorial object based on the request body
    const newTutorial = new Tutorial(req.body);

    // Save the tutorial object to the database
    const savedTutorial = await newTutorial.save();

    res.status(201).json(savedTutorial);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle any errors
  }
});

// get all tutorials
router.get('/', async (req, res) => {
  try {
    const tutorials = await Tutorial.find(); // Find all tutorials in the collection
    res.json(tutorials); // Respond with the tutorials
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get one tutorial by id
router.get('/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id); // Find the tutorial with the enterd id parameter
    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' }); // If the tutorial is not found return a 404 error
    }
    res.json(tutorial); // If the tutorial is found return the tutorial
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update one tutorial by id
router.patch('/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id); // Find the tutorial with the enterd id parameter
    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' }); // If the tutorial is not found return a 404 error 
    }

    // Update filled fields from the request body 
    if (req.body.tutorialDate !== undefined && req.body.tutorialDate !== '') {
      tutorial.tutorialDate = req.body.tutorialDate;
    }

    if (req.body.tutorialTime !== undefined && req.body.tutorialTime !== '') {
      tutorial.tutorialTime = req.body.tutorialTime;
    }

    if (req.body.students !== undefined && req.body.students !== '') {
      tutorial.students = req.body.students;
    }

    if (req.body.tutor !== undefined && req.body.tutor !== '') {
      tutorial.tutor = req.body.tutor;
    }

    if (req.body.fee !== undefined && req.body.fee !== '') {
      tutorial.fee = req.body.fee;
    }

    if (req.body.tutorialNumber !== undefined && req.body.tutorialNumber !== '') {
      tutorial.tutorialNumber = req.body.tutorialNumber;
    }

    if (req.body.tutorialAttendance !== undefined && req.body.tutorialAttendance !== '') {
      tutorial.tutorialAttendance = req.body.tutorialAttendance;
    }

    if (req.body.tutorialSubject !== undefined && req.body.tutorialSubject !== '') {
      tutorial.tutorialSubject = req.body.tutorialSubject;
    }

    if (req.body.tutorialNotes !== undefined && req.body.tutorialNotes !== '') {
      tutorial.tutorialNotes = req.body.tutorialNotes;
    }

    const updatedTutorial = await tutorial.save();
    res.json(updatedTutorial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// delete one tutorial by id
router.delete('/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id); // Find the tutorial with the enterd id parameter and delete it
    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' }); // If the tutorial is not found return a 404 error
    }
    res.json({ message: 'Tutorial deleted' }); // If the tutorial is found return the tutorial
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// export the router
module.exports = router;