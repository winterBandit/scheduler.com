const employeeForm = document.getElementById('employee-form');
const employeeList = document.getElementById('employee-list');
const downloadButton = document.getElementById('download-btn');

let idCounter = 1;

employeeForm.addEventListener('submit', function (e) {
    e.preventDefault();

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
    const isFridgeTrained = fridgeTrainedCheckbox.checked;
    const isNarcoticsTrained = narcoticsTrainedCheckbox.checked;
    const isCasesTrained = casesTrainedCheckbox.checked;
    const isShippingTrained = shippingTrainedCheckbox.checked;

    const currentDate = new Date();

    if (name && age && startDate) {
        // Create an array to hold training details
        const trainingDetails = [];

        // Add training details based on checkbox status
        if (isFridgeTrained) {
            trainingDetails.push('❄️ Fridge');
        }
        if (isNarcoticsTrained) {
            trainingDetails.push('💊 Narcotics');
        }
        if (isCasesTrained) {
            trainingDetails.push('📦 Cases');
        }
        if (isShippingTrained) {
            trainingDetails.push('🚚 Shipping');
        }

        // Add the employee to the list with training details
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>ID: ${idCounter}</span>
            <span>Name: ${name}</span>
            <span>Age: ${age} years old</span>
            <span>Start Date: ${startDate.toDateString()}</span>
            <span>Training: ${trainingDetails.join(', ')}</span>
            <button class="delete-btn">Delete</button>
        `;
        employeeList.appendChild(listItem);

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

employeeList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const listItem = e.target.parentElement;
        employeeList.removeChild(listItem);
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
