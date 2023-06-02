//Mohammed Ahmed Alkharusi
//24/05/2023
//This is the fetch API file for the tutorial booking system
//This file is used to send requests to the server
//This file also contains the code to test the frontend

//create tutorial
const tutorialForm = document.querySelector('#tutorialForm'); // get the form
tutorialForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Get the values from the form fields
  const tutorialDate = document.querySelector('#tutorialDate').value;
  const tutorialTime = document.querySelector('#tutorialTime').value;
  const students = document.querySelector('#students').value.split(',');
  const tutor = document.querySelector('#tutor').value;
  const fee = parseFloat(document.querySelector('#fee').value);
  const tutorialNumber = parseInt(document.querySelector('#tutorialNumber').value);
  const tutorialAttendance = document.querySelector('#tutorialAttendance').value;
  const tutorialSubject = document.querySelector('#tutorialSubject').value;
  const tutorialNotes = document.querySelector('#tutorialNotes').value;

  // Create the tutorial object
  const newTutorial = {
    tutorialDate,
    tutorialTime,
    students,
    tutor,
    fee,
    tutorialNumber,
    tutorialAttendance,
    tutorialSubject,
    tutorialNotes
  };

  try {
    const response = await fetch('http://localhost:7000/tutorial', { // Send a POST request to the server
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTutorial)
    });

    const data = await response.json(); // Get the JSON response from the server

    if (response.ok) {
      //reset the form
      tutorialForm.reset();
      console.log('Tutorial created successfully:', data);
    } else {
      console.error('Error creating tutorial:', data.message);
      // Handle error
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// retreive all tutorials
const retrieveTutorialsForm = document.querySelector('#retrieveTutorialsForm'); // get the form
const tutorialTable = document.querySelector('#tutorialTable tbody'); // get the table body

retrieveTutorialsForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:7000/tutorial'); // Send a GET request to the server
    const data = await response.json(); // Get the JSON response from the server
    //create table
    if (response.ok) {
      // Clear the table
      tutorialTable.innerHTML = '';
      data.forEach((tutorial) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tutorial._id}</td>
          <td>${tutorial.tutorialDate}</td>
          <td>${tutorial.tutorialTime}</td>
          <td>${tutorial.students.join(', ')}</td>
          <td>${tutorial.tutor}</td>
          <td>${tutorial.fee}</td>
          <td>${tutorial.tutorialNumber}</td>
          <td>${tutorial.tutorialAttendance}</td>
          <td>${tutorial.tutorialSubject}</td>
          <td>${tutorial.tutorialNotes}</td>
        `;

        tutorialTable.appendChild(row); // Add the row to the table
      });

      console.log('Tutorials retrieved successfully:', data);
    } else {
      console.error('Error retrieving tutorials:', data.message);
      // Handle error
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// retreive one tutorial by id
const retrieveTutorialForm = document.querySelector('#retrieveTutorialForm'); // get the form
const onetutorialTable = document.querySelector('#onetutorialTable tbody'); // get the table body

retrieveTutorialForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const tutorialId = document.querySelector('#tutorialId').value; // Get the tutorial ID from the form

  try {
    const response = await fetch(`http://localhost:7000/tutorial/${tutorialId}`); // Send a GET request to the server
    const data = await response.json();

    if (response.ok) {
      // Clear existing table rows
      onetutorialTable.innerHTML = '';

      // Create a single table row
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${data.tutorialDate}</td>
        <td>${data.tutorialTime}</td>
        <td>${data.students.join(', ')}</td>
        <td>${data.tutor}</td>
        <td>${data.fee}</td>
        <td>${data.tutorialNumber}</td>
        <td>${data.tutorialAttendance}</td>
        <td>${data.tutorialSubject}</td>
        <td>${data.tutorialNotes}</td>
      `;

      onetutorialTable.appendChild(row); // Add the row to the table

      console.log('Tutorial retrieved successfully:', data);
    } else {
      console.error('Error retrieving tutorial:', data.message);
      // Handle error
    }
  } catch (error) {
    console.error('Error:', error);
  }
});


// update tutorial
const updateTutorialForm = document.querySelector('#updateTutorialForm'); // get the form
updateTutorialForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Get the values from the form fields
  const tutorialId = document.querySelector('#updatetutorialId').value;
  const tutorialDate = document.querySelector('#updatetutorialDate').value;
  const tutorialTime = document.querySelector('#updatetutorialTime').value;
  const students = document.querySelector('#updatestudents').value;
  const tutor = document.querySelector('#updatetutor').value;
  const fee = document.querySelector('#updatefee').value;
  const tutorialNumber = document.querySelector('#updatetutorialNumber').value;
  const tutorialAttendance = document.querySelector('#updatetutorialAttendance').value;
  const tutorialSubject = document.querySelector('#updatetutorialSubject').value;
  const tutorialNotes = document.querySelector('#updatetutorialNotes').value;

  const updatedTutorial = {}; // Create an empty object
  //update the input fields if they are not empty
  if (tutorialDate !== '') {
    updatedTutorial.tutorialDate = tutorialDate;
  }

  if (tutorialTime !== '') {
    updatedTutorial.tutorialTime = tutorialTime;
  }

  if (students !== '') {
    updatedTutorial.students = students;
  }

  if (tutor !== '') {
    updatedTutorial.tutor = tutor;
  }

  if (fee !== '') {
    updatedTutorial.fee = fee;
  }

  if (tutorialNumber !== '') {
    updatedTutorial.tutorialNumber = tutorialNumber;
  }

  if (tutorialAttendance !== '') {
    updatedTutorial.tutorialAttendance = tutorialAttendance;
  }

  if (tutorialSubject !== '') {
    updatedTutorial.tutorialSubject = tutorialSubject;
  }

  if (tutorialNotes !== '') {
    updatedTutorial.tutorialNotes = tutorialNotes;
  }

  try {
    const response = await fetch(`http://localhost:7000/tutorial/${tutorialId}`, { // Send a PATCH request to the server
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTutorial)
    });

    const data = await response.json(); // Get the JSON response from the server

    if (response.ok) {
      //reset form
      updateTutorialForm.reset();
      console.log('Tutorial updated successfully:', data);
    } else {
      console.error('Error updating tutorial:', data.message);
      // Handle error
    }
  } catch (error) {
    console.error('Error:', error);
  }
});



// delete tutorial
const deleteTutorialForm = document.querySelector('#deleteTutorialForm'); // get the form

deleteTutorialForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const tutorialId = document.querySelector('#deletetutorialId').value; // Get the tutorial ID from the form

  try {
    const response = await fetch(`http://localhost:7000/tutorial/${tutorialId}`, { // Send a DELETE request to the server
      method: 'DELETE'
    });

    const data = await response.json(); // Get the JSON response from the server

    if (response.ok) {
      //reset form
      deleteTutorialForm.reset();
      console.log('Tutorial deleted successfully:', data);
    } else {
      console.error('Error deleting tutorial:', data.message);
      // Handle error
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
