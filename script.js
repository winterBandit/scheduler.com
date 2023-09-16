const employeeForm = document.getElementById('employee-form');
const employeeList = document.getElementById('employee-list');
const downloadButton = document.getElementById('download-btn');

let idCounter = 1;

// Load existing employee data from local storage when the page loads
window.addEventListener('load', function () {
    const savedEmployeeData = JSON.parse(localStorage.getItem('employeeData')) || [];
    idCounter = savedEmployeeData.length + 1; // Update the ID counter

    savedEmployeeData.forEach(function (employee) {
        addEmployeeToDOM(employee);
    });
});

// Function to add an employee to the list and save to local storage
function addEmployeeToDOM(employee) {
    const listItem = document.createElement('li');
    // Create the HTML for the employee here (similar to what you did before)
    listItem.innerHTML = `
        <span>ID: ${employee.id}</span>
        <span>Name: ${employee.name}</span>
        <span>Age: ${employee.age} years old</span>
        <span>Start Date: ${employee.startDate}</span>
        <span>Training: ${employee.training}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Add the employee to the list
    employeeList.appendChild(listItem);

    // Save the updated employee data to local storage
    const savedEmployeeData = JSON.parse(localStorage.getItem('employeeData')) || [];
    savedEmployeeData.push(employee);
    localStorage.setItem('employeeData', JSON.stringify(savedEmployeeData));
}

// Function to remove an employee from the list and update local storage
function removeEmployeeFromDOM(listItem) {
    // Remove the employee from the list
    employeeList.removeChild(listItem);

    // Remove the employee from local storage
    const savedEmployeeData = JSON.parse(localStorage.getItem('employeeData')) || [];
    const id = parseInt(listItem.querySelector('span#id').textContent);
    const updatedEmployeeData = savedEmployeeData.filter(employee => employee.id !== id);
    localStorage.setItem('employeeData', JSON.stringify(updatedEmployeeData));
}

// Update your submit event listener to call addEmployeeToDOM and store data
employeeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // ...

    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const startDateInput = document.getElementById('start-date');
    const fridgeTrainedCheckbox = document.getElementById('fridge-trained');
    const narcoticsTrainedCheckbox = document.getElementById('narcotics-trained');
    const casesTrainedCheckbox = document.getElementById('cases-trained');
    const shippingTrainedCheckbox = document.getElementById('shipping-trained');

    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const startDate = new Date(startDateInput.value);

    // Create an array to hold training details
    const trainingDetails = [];

    // Add training details based on checkbox status
    if (fridgeTrainedCheckbox.checked) {
        trainingDetails.push('❄️ Fridge');
    }
    if (narcoticsTrainedCheckbox.checked) {
        trainingDetails.push('💊 Narcotics');
    }
    if (casesTrainedCheckbox.checked) {
        trainingDetails.push('📦 Cases');
    }
    if (shippingTrainedCheckbox.checked) {
        trainingDetails.push('🚚 Shipping');
    }

    if (name && age && startDate) {
        const employee = {
            id: idCounter,
            name: name,
            age: age,
            startDate: startDate.toDateString(),
            training: trainingDetails.join(', ')
        };

        addEmployeeToDOM(employee);

        // Reset form fields and checkboxes
        nameInput.value = '';
        ageInput.value = '';
        startDateInput.value = '';
        fridgeTrainedCheckbox.checked = false;
        narcoticsTrainedCheckbox.checked = false;
        casesTrainedCheckbox.checked = false;
        shippingTrainedCheckbox.checked = false;

        idCounter++;
    }
});

// Update your delete event listener to call removeEmployeeFromDOM and update data
employeeList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const listItem = e.target.parentElement;
        removeEmployeeFromDOM(listItem);
    }
});

downloadButton.addEventListener('click', function () {
    const records = getEmployeeRecordsAsText();
    downloadTxtFile(records);
});

// Helper functions
function getEmployeeRecordsAsText() {
    const employeeRecords = Array.from(employeeList.children).map(item => item.textContent.trim()).join('\n');
    return employeeRecords;
}

function downloadTxtFile(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employee_records.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
