//desc: tutor routes for the tutorial booking system
//author: Mohammed Ahmed Alkharusi
//date: 24/05/2023

const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');

// create a new tutor
router.post('/', async (req, res) => {
  try {
    // Create a new tutor object based on the request body
    const newTutor = new Tutor(req.body);

    // Save the tutor object to the database
    const savedTutor = await newTutor.save();

    res.status(201).json(savedTutor);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle any errors
  }
});

// get all tutors
router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find(); // Find all tutors in the collection
    res.json(tutors); // Respond with the tutors  
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
});

// get one tutor by id
router.get('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id); // Find the tutor with the enterd id parameter
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' }); // If the tutor is not found return a 404 error
    }
    res.json(tutor); // If the tutor is found return the tutor
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
});


// Update one tutor by id
router.patch('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id); // Find the tutor with the enterd id parameter
    if (!tutor) {
      console.log('Tutor not found');
      return res.status(404).json({ message: 'Tutor not found' });
    }

    // Update the tutor object with non empty fields from the request body
    if (req.body.title !== undefined && req.body.title !== '') {
      tutor.title = req.body.title;
    }

    if (req.body.otherSpecify !== undefined && req.body.otherSpecify !== '') {
      tutor.otherSpecify = req.body.otherSpecify;
    }

    if (req.body.firstName !== undefined && req.body.firstName !== '') {
      tutor.firstName = req.body.firstName;
    }

    if (req.body.surname !== undefined && req.body.surname !== '') {
      tutor.surname = req.body.surname;
    }

    if (req.body.phoneNumber !== undefined && req.body.phoneNumber !== '') {
      tutor.phoneNumber = req.body.phoneNumber;
    }

    if (req.body.emailAddress !== undefined && req.body.emailAddress !== '') {
      tutor.emailAddress = req.body.emailAddress;
    }

    if (req.body.homeAddress !== undefined) {
      if (req.body.homeAddress.addressLine1 !== undefined && req.body.homeAddress.addressLine1 !== '') {
        tutor.homeAddress.addressLine1 = req.body.homeAddress.addressLine1;
      }

      if (req.body.homeAddress.addressLine2 !== undefined && req.body.homeAddress.addressLine2 !== '') {
        tutor.homeAddress.addressLine2 = req.body.homeAddress.addressLine2;
      }

      if (req.body.homeAddress.town !== undefined && req.body.homeAddress.town !== '') {
        tutor.homeAddress.town = req.body.homeAddress.town;
      }

      if (req.body.homeAddress.county !== undefined && req.body.homeAddress.county !== '') {
        tutor.homeAddress.county = req.body.homeAddress.county;
      }

      if (req.body.homeAddress.eircode !== undefined && req.body.homeAddress.eircode !== '') {
        tutor.homeAddress.eircode = req.body.homeAddress.eircode;
      }
    }

    const updatedTutor = await tutor.save();
    res.json(updatedTutor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete one tutor by id
router.delete('/:id', async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndDelete(req.params.id); // Find the tutor with the enterd id parameter and delete it
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' }); // If the tutor is not found return a 404 error
    }
    res.json({ message: 'Tutor deleted' }); // If the tutor is found return the tutor
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// export the router
module.exports = router;