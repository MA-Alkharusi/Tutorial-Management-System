//Mohammed Ahmed Alkharusi
//24/05/2023
//description: This file contains the code for the student fetch API


//check if othersc chosen
const titleSelect = document.querySelector('#title'); //get the title select element
const otherSpecifyField = document.querySelector('#otherSpecifyField'); //get the other Specify Field 
const otherSpecifyInput = document.querySelector('#otherSpecify'); //get the other Specify input

titleSelect.addEventListener('change', () => { 
    if (titleSelect.value === 'Other') { //check if the value of the title is other
        otherSpecifyField.style.display = 'block'; //display the other Specify Field
        otherSpecifyInput.setAttribute('required', 'required'); //make the other Specify input required
    } else {
        otherSpecifyField.style.display = 'none'; //hide the other Specify Field
        otherSpecifyInput.removeAttribute('required'); //remove the required attribute 
    }
});

//check if others is selected in title
const updatetitleSelect = document.querySelector('#updatetitle'); //get the title select element
const updateotherSpecifyField = document.querySelector('#updateotherSpecifyField'); //get the other Specify Field
const updateotherSpecifyInput = document.querySelector('#updateotherSpecify'); //get the other Specify input

updatetitleSelect.addEventListener('change', () => { 
    if (updatetitleSelect.value === 'Other') { //check if the value of the title is other
        updateotherSpecifyField.style.display = 'block'; //display the other Specify Field
        updateotherSpecifyInput.setAttribute('required', 'required'); //make the other Specify input required
    } else {
        updateotherSpecifyField.style.display = 'none'; //hide the other Specify Field
        updateotherSpecifyInput.removeAttribute('required'); //remove the required attribute
    }
});


//add new customer
const addNewStudentForm = document.querySelector('#addNewStudent'); //get the add new student form
addNewStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault(); //prevent the default behaviour of the form
    //get the values from the form by id
    var title = document.querySelector('#title').value;
    if (title === 'Other') {
        var otherSpecify = document.querySelector('#otherSpecify').value;
    }
    const firstName = document.querySelector('#firstName').value;
    const surname = document.querySelector('#surname').value;
    const phoneNumber = document.querySelector('#phoneNumber').value;
    const emailAddress = document.querySelector('#emailAddress').value;
    const homeAddressLine1 = document.querySelector('#homeAddressLine1').value;
    const homeAddressLine2 = document.querySelector('#homeAddressLine2').value;
    const homeTown = document.querySelector('#homeTown').value;
    const homeCounty = document.querySelector('#homeCounty').value;
    const homeEircode = document.querySelector('#homeEircode').value;
    const dateOfBirth = document.querySelector('#dateOfBirth').value;
    const parentName = document.querySelector('#parentName').value;
    const virtualAttendance = document.querySelector('#virtualAttendance').value;
    const gender = document.querySelector('#gender').value;
    const subject = document.querySelector('#subject').value;
    //check if the student is under 18
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const isUnder18 = age < 18;
    //check if the parent name is required
    if (isUnder18 && !parentName) {
        alert('Parent/Guardian name is required for students under 18');
        return;
    }
    const studentData = { //create a student object
        title,
        otherSpecify,
        firstName,
        surname,
        phoneNumber,
        emailAddress,
        homeAddress: {
            addressLine1: homeAddressLine1,
            addressLine2: homeAddressLine2,
            town: homeTown,
            county: homeCounty,
            eircode: homeEircode
        },
        additionalDetails: {
            dateOfBirth,
            parentGuardianName: parentName,
            virtualAttendance,
            gender,
            subject
        }
    };

    try {
        const response = await fetch('http://localhost:7000/student', { //send a post request to the server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData) //convert the student object to JSON
        });

        const data = await response.json(); 

        if (response.ok) {
            console.log('New student created:', data); 
            // Reset the form
            addNewStudentForm.reset();
        } else {
            console.error('Error:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


//retrieve all students
const retrieveAllForm = document.querySelector('#retrieveAll'); //get the retrieve all form
const studentTableBody = document.querySelector('#studentTable tbody'); //get the student table body

retrieveAllForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:7000/student'); //send a get request to the server
        const data = await response.json(); //convert the response to JSON

        if (response.ok) {
            populateStudentTable(data); //populate the student table
        } else {
            console.error('Error:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function populateStudentTable(students) { //populate the student table
    studentTableBody.innerHTML = ''; //clear the table body

    students.forEach((student) => { //loop through the students
        const row = document.createElement('tr'); //create a table row with the student data
        row.innerHTML = `
    <td>${student._id}</td>
    <td>${student.title === 'Other' ? student.otherSpecify : student.title}</td>
      <td>${student.firstName}</td>
      <td>${student.surname}</td>
      <td>${student.phoneNumber}</td>
      <td>${student.emailAddress}</td>
      <td>${getFormattedAddress(student.homeAddress)}</td>
      <td>${formatDate(student.additionalDetails.dateOfBirth)}</td>
      <td>${student.additionalDetails.parentGuardianName || ''}</td>
      <td>${student.additionalDetails.virtualAttendance}</td>
      <td>${student.additionalDetails.gender}</td>
      <td>${student.additionalDetails.subject || ''}</td>
      <td>${student.additionalDetails.recordCreationDate}</td>
    `;

        studentTableBody.appendChild(row); //disply the row to the table body
    });
}

function getFormattedAddress(address) { //format the address
    const { addressLine1, addressLine2, town, county, eircode } = address;
    let formattedAddress = addressLine1;

    if (addressLine2) {
        formattedAddress += ', ' + addressLine2;
    }

    formattedAddress += ', ' + town + ', ' + county + ', ' + eircode;

    return formattedAddress;
}

function formatDate(dateString) { //format the date
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US'); //convert the date to a string
}

// Retrieve a single student by ID
const retrieveStudentForm = document.querySelector('#retrieveStudentForm'); //get the retrieve student form
retrieveStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.querySelector('#studentId').value; //get the student id

    try {
        const response = await fetch(`http://localhost:7000/student/${studentId}`); //send a get request to the server
        const data = await response.json(); //convert the response to JSON

        if (response.ok) {
            populateStudentInfo(data);
        } else {
            console.error('Error:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function populateStudentInfo(student) { //populate the student info
    const studentInfo = document.querySelector('#studentInfo');

    if (student) { //check if the student exists
        const table = document.createElement('table'); //create a table
        table.id = 'studentTable'; 
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <th>Title</th>
      <th>First Name</th>
      <th>Surname</th>
      <th>Phone Number</th>
      <th>Email Address</th>
      <th>Home Address</th>
      <th>Date of Birth</th>
      <th>Parent/Guardian Name</th>
      <th>Virtual Attendance</th>
      <th>Gender</th>
      <th>Subject</th>
      <th>Record Creation Date</th>
    `;
        thead.appendChild(tr);
        table.appendChild(thead); 

        const tbody = document.createElement('tbody');
        const row = document.createElement('tr'); //create a table row with the student data
        row.innerHTML = `
      <td>${student.title}</td>
      <td>${student.firstName}</td>
      <td>${student.surname}</td>
      <td>${student.phoneNumber}</td>
      <td>${student.emailAddress}</td>
      <td>${getFormattedAddress(student.homeAddress)}</td>
      <td>${formatDate(student.additionalDetails.dateOfBirth)}</td>
      <td>${student.additionalDetails.parentGuardianName || ''}</td>
      <td>${student.additionalDetails.virtualAttendance}</td>
      <td>${student.additionalDetails.gender}</td>
      <td>${student.additionalDetails.subject || ''}</td>
        <td>${student.additionalDetails.recordCreationDate}</td>
    `;
        tbody.appendChild(row);
        table.appendChild(tbody);

        // Remove existing table and display the new table
        studentInfo.innerHTML = '';
        studentInfo.appendChild(table);
    } else {
        studentInfo.innerHTML = 'Student not found';
    }
}

function getFormattedAddress(address) { //format the address
    const { addressLine1, addressLine2, town, county, eircode } = address;
    let formattedAddress = addressLine1;

    if (addressLine2) {
        formattedAddress += ', ' + addressLine2;
    }

    formattedAddress += ', ' + town + ', ' + county + ', ' + eircode;

    return formattedAddress;
}

function formatDate(dateString) { //format the date
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
}


// Update student
const updateStudentForm = document.querySelector('#updateStudentForm'); //get the update student form

updateStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get the student data from the form fields 
    const studentId = document.querySelector('#updateStudentId').value;
    const title = document.querySelector('#updatetitle').value;
    const otherSpecify = document.querySelector('#updateotherSpecify').value;
    const firstName = document.querySelector('#updatefirstName').value;
    const surname = document.querySelector('#updatesurname').value;
    const phoneNumber = document.querySelector('#updatephoneNumber').value;
    const emailAddress = document.querySelector('#updateemailAddress').value;
    const homeAddressLine1 = document.querySelector('#updatehomeAddressLine1').value;
    const homeAddressLine2 = document.querySelector('#updatehomeAddressLine2').value;
    const homeTown = document.querySelector('#updatehomeTown').value;
    const homeCounty = document.querySelector('#updatehomeCounty').value;
    const homeEircode = document.querySelector('#updatehomeEircode').value;
    const dateOfBirth = document.querySelector('#updatedateOfBirth').value;
    const parentName = document.querySelector('#updateparentName').value;
    const virtualAttendance = document.querySelector('#updatevirtualAttendance').value;
    const gender = document.querySelector('#updategender').value;
    const subject = document.querySelector('#updatesubject').value;
    // Create a new student object
    const updatedStudent = {
        title,
        otherSpecify,
        firstName,
        surname,
        phoneNumber,
        emailAddress,
        homeAddress: {
            addressLine1: homeAddressLine1,
            addressLine2: homeAddressLine2,
            town: homeTown,
            county: homeCounty,
            eircode: homeEircode
        },
        additionalDetails: {
            dateOfBirth,
            parentGuardianName: parentName,
            virtualAttendance,
            gender,
            subject
        }
    };

    try {
        const response = await fetch(`http://localhost:7000/student/${studentId}`, { //send a patch request to the server
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedStudent) //convert the student object to JSON
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Student updated successfully:', data);

            // Reset the form inputs
            updateStudentForm.reset();
        } else {
            console.error('Error updating student:', data.message);
            // Handle errors
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Delete student
const deleteStudentForm = document.querySelector('#deleteStudentForm'); //get the delete student form

deleteStudentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.querySelector('#deletestudentId').value; //get the student id

    try {
        const response = await fetch(`http://localhost:7000/student/${studentId}`, { //send a delete request to the server
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Student deleted successfully');
            // Reset the form inputs
            deleteStudentForm.reset();
        } else {
            console.error('Error deleting student');
            // Handle errors
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

