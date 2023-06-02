//description: This file contains the schema for the student data
//author: Mohammed Ahmed Alkharusi
//date: 24/05/2023

const mongoose = require('mongoose');

// Define the schema
const studentSchema = new mongoose.Schema({
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
  },
  additionalDetails: {
    dateOfBirth: {
      type: Date,
      required: true
    },
    parentGuardianName: {
      type: String,
      required: function () {
        // Make parentGuardianName required if age is under 18
        const ageDiff = new Date().getFullYear() - this.additionalDetails.dateOfBirth.getFullYear();
        return ageDiff < 18;
      }
    },
    virtualAttendance: {
      type: String,
      enum: ['Y', 'N'],
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    subject: String,
    recordCreationDate: {
      // Set the default value to the current date
      type: Date,
      default: Date.now
    }
  }
});

// Create the schema for the student data
module.exports = mongoose.model('student', studentSchema);


