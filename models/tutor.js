// Create the schema for the tutor collection
//author: Mohammed Ahmed Alkharusi
//date: 24/05/2023

const mongoose = require('mongoose');

// Define the schema
const tutorSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ['Mx', 'Ms', 'Mr', 'Mrs', 'Miss', 'Other'],
    required: true
  },
  otherSpecify: {
    // Make otherSpecify required if title is 'Other'
    type: String,
    required: function () {
      return this.title === 'Other';
    }
  },
  firstName: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  homeAddress: {
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: String,
    town: {
      type: String,
      required: true
    },
    county: {
      type: String,
      required: true
    },
    eircode: { 
      type: String
    }
  }
  
});

// Create the schema for the tutorial collection
module.exports = mongoose.model('tutor', tutorSchema);
