//Mohammed Ahmed Alkharusi
//24/05/2023
//This is the fetch API file for the tutorial booking system
//This file is used to send and receive data from the server


//check if others title chosen for creating new tutor
const titleSelect = document.querySelector('#title');
const otherSpecifyField = document.querySelector('#otherSpecifyField');
const otherSpecifyInput = document.querySelector('#otherSpecify');

titleSelect.addEventListener('change', () => {
    if (titleSelect.value === 'Other') { //if other is chosen
        otherSpecifyField.style.display = 'block'; //show otherSpecifyField
        otherSpecifyInput.setAttribute('required', 'required'); //make otherSpecifyInput required
    } else {
        otherSpecifyField.style.display = 'none'; //hide otherSpecifyField
        otherSpecifyInput.removeAttribute('required'); //make otherSpecifyInput not required
    }
});
//check if others title chosen for updating tutor
const updatetitleSelect = document.querySelector('#updatetitle');
const updateotherSpecifyField = document.querySelector('#updateotherSpecifyField');
const updateotherSpecifyInput = document.querySelector('#updateotherSpecify');

updatetitleSelect.addEventListener('change', () => {
    if (updatetitleSelect.value === 'Other') {
        updateotherSpecifyField.style.display = 'block'; //show otherSpecifyField
        updateotherSpecifyInput.setAttribute('required', 'required'); //make otherSpecifyInput required
    } else {
        updateotherSpecifyField.style.display = 'none'; //hide otherSpecifyField
        updateotherSpecifyInput.removeAttribute('required'); //make otherSpecifyInput not required
    }
});

//crate new tutor
const addNewTutorForm = document.querySelector('#addNewTutor'); //get the form

addNewTutorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //get the values from the form
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

    const tutorData = {
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
        }
    };

    try {
        const response = await fetch('http://localhost:7000/tutor', { //send the data to the server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tutorData) //convert the data to JSON
        });

        const data = await response.json(); //get the JSON response

        if (response.ok) {
            console.log('New tutor created:', data);
            // Reset the form
            addNewTutorForm.reset();
        } else {
            console.error('Error:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

//retrieve all tutors
const retrieveAllForm = document.querySelector('#retrieveAll'); //get the form
const tutorTableBody = document.querySelector('#tutorTable tbody'); //get the table body

retrieveAllForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:7000/tutor'); //send the request to the server
        const data = await response.json(); //get the JSON response

        if (response.ok) {
            populateTutorTable(data); //call the function to populate the table
        } else {
            console.error('Error:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function populateTutorTable(tutor) { //populate the table
    tutorTableBody.innerHTML = '';//clear the table
    tutor.forEach((tutor) => {
        const row = document.createElement('tr');
        row.innerHTML = `
    <td>${tutor._id}</td>
    <td>${tutor.title === 'Other' ? tutor.otherSpecify : tutor.title}</td>
      <td>${tutor.firstName}</td>
      <td>${tutor.surname}</td>
      <td>${tutor.phoneNumber}</td>
      <td>${tutor.emailAddress}</td>
      <td>${getFormattedAddress(tutor.homeAddress)}</td>
    `;

        tutorTableBody.appendChild(row); //add the row to the table
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
    return date.toLocaleDateString('en-US');
}


//retrieve tutor by id
const retrieveTutorForm = document.querySelector('#retrieveTutorForm'); //get the form
retrieveTutorForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tutorId = document.querySelector('#tutorId').value; //get the tutor id

    try {
        const response = await fetch(`http://localhost:7000/tutor/${tutorId}`); //send the request to the server
        const data = await response.json();

        if (response.ok) {
            populateTutorInfo(data); //call the function to populate the table
        } else {
            console.error('Error:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function populateTutorInfo(tutor) { //populate the table
    const tutorInfo = document.querySelector('#tutorInfo');

    if (tutor) {
        // Create the table
        const table = document.createElement('table');
        table.id = 'tutorTable';
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <th>Title</th>
      <th>First Name</th>
      <th>Surname</th>
      <th>Phone Number</th>
      <th>Email Address</th>
      <th>Home Address</th>
    `;
        thead.appendChild(tr);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${tutor.title}</td>
      <td>${tutor.firstName}</td>
      <td>${tutor.surname}</td>
      <td>${tutor.phoneNumber}</td>
      <td>${tutor.emailAddress}</td>
      <td>${getFormattedAddress(tutor.homeAddress)}</td>
    `;
        tbody.appendChild(row);
        table.appendChild(tbody);

        // Remove existing table and show the new table
        tutorInfo.innerHTML = '';
        tutorInfo.appendChild(table); //add the table to the page
    } else {
        tutorInfo.innerHTML = 'Tutor not found';
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

//update tutor by id
const updateTutorForm = document.querySelector('#updateTutorForm'); //get the form
updateTutorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //get the values from the form
    const tutorId = document.querySelector('#updatetutorId').value;
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

    const updatedTutor = {
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
        }
    };

    try {
        const response = await fetch(`http://localhost:7000/tutor/${tutorId}`, { //send the request to the server
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTutor) //convert the object to a JSON string
        });

        const data = await response.json(); //convert the response to JSON

        if (response.ok) {
            console.log('Tutor updated successfully:', data);

            // Reset the form inputs
            updateTutorForm.reset();
        } else {
            console.error('Error updating tutor:', data.message);
            // Handle error
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


//delete tutor by id
const deleteTutorForm = document.querySelector('#deleteTutorForm'); //get the form
deleteTutorForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tutorId = document.querySelector('#deletetutorId').value; //get the tutor id

    try {
        const response = await fetch(`http://localhost:7000/tutor/${tutorId}`, { //send the request to the server
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Tutor deleted successfully');
            // Reset the form inputs
            deleteTutorForm.reset();
        } else {
            console.error('Error deleting Tutor');
            // Handle error
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

