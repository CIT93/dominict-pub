console.log('Hello from app.js! Your JavaScript is connected and running!');

import { populateFormForEdit, getFormInputs, clearForm} from "./form-handler.js";
import { calculateHomeworkDecision} from "./decision.js";
import { ui, hideResults} from "./ui.js";
import { saveEntries, generateUniqueId, loadEntries, clearAllEntries} from "./data-store.js";
import { renderTable} from "./table-renderer.js";
import { loadAndDisplayAqi } from "./aqi-integrator.js";
import { loadAndDisplayWeather } from "./weather-integrator.js";

// Holds all enries in memory by declaring a 'const' array
const homeworkEntries = []; 

// Reference to main homework form element
const homeworkForm = document.getElementById('homeworkForm');

const sleepQualityError = homeworkForm.querySelector('#sleepQualityError');
const moodLevelError = homeworkForm.querySelector('#moodLevelError');
const dueDateError = homeworkForm.querySelector('#dueDateError');
const assignmentCountError = homeworkForm.querySelector('#assignmentCountError');

const clearFormButton = document.getElementById('clearFormButton');

const clearAllDataButton = document.getElementById('clearAllDataButton');

let isConfirmingClearAll = false;
let clearAllTimeoutId = null;

const resetClearAllButton = () => {
    console.log(clearAllTimeoutId);
    if(clearAllTimeoutId) {
        clearTimeout(clearAllTimeoutId);
    }
    isConfirmingClearAll = false;
    clearAllDataButton.textContent = 'Clear All Saved Data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');
    clearAllDataButton.classList.add('danger-button');
}

const resetAllUIStates = () => {
    clearErrorMessage();
    resetClearAllButton();
}

const clearErrorMessage = () => {
    sleepQualityError.textContent = '';
    sleepQualityError.style.display = 'none';

    moodLevelError.textContent = '';
    moodLevelError.style.display = 'none';

    dueDateError.textContent = '';
    dueDateError.style.display = 'none';

    assignmentCountError.textContent = '';
    assignmentCountError.style.display = 'none';
}

const validateForm= (formData) => {
    clearErrorMessage();
    let isValid = true;
    // Rule 1: Sleep Quality must be selected (one of the dropdown options) 
    if(!formData.sleepQuality) {
        sleepQualityError.textContent = 'Please select your sleep quality.'
        sleepQualityError.style.display = 'block'; 
        isValid = false;
    }
    
    // Rule 2: Mood Level must be selected (on of the radio options)
    if(!formData.moodLevel) {
        moodLevelError.textContent = 'Please select your mood level.'
        moodLevelError.style.display = 'block'; 
        isValid = false;
    }

    // Rule 3: If Due Date is Not selected (one of the dates on the calender), then Today must be selected
   if(!formData.dueDate) {
        dueDateError.textContent = 'Please select a date.'
        dueDateError.style.display = 'block'; 
        isValid = false;
   }

   // Rule 4: # of Homework Assignments must be positive or checkbox must be clicked if overwhelmed
   if(!formData.isOverwhelmed && formData.assignmentCount <= 0) {
        assignmentCountError.textContent = '# of HW Assignmnets cannot be negative.'
        assignmentCountError.style.display = 'block';
        isValid = false;
   }
    return isValid
}

const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = getFormInputs();
    if(!validateForm(formData)) {
        console.log("Form validation failed. Stopping submission.")
        return;
    }
    console.log("Form validation passed. Proceeding with submission.");

    const calculatedResults = calculateHomeworkDecision(formData);

    const entryToSave = {
        ...formData,
        ...calculatedResults,
        //id: dataStore.generateUniqueId(),
        //timestamp: new Date().toISOString()
    };

    if(formData.id) {
        const index = homeworkEntries.findIndex((entry) => {
            return entry.id === formData.id;
        })

        if (index !== -1) {
            entryToSave.timestamp = homeworkEntries[index].timestamp;
            homeworkEntries[index] = entryToSave;
        } else {
            console.warn(`Attempted to update entry with id ${formData.id}, but it was not found, adding as new`);
            entryToSave.id = generateUniqueId();
            entryToSave.timestamp = new Date().toISOString();
            homeworkEntries.push(entryToSave);
        }
    
    } else {
        entryToSave.id = generateUniqueId();
        entryToSave.timestamp = new Date().toISOString();
        homeworkEntries.push(entryToSave);
    }
    
    //homeworkEntries.push(entry);
    saveEntries(homeworkEntries);
    ui(calculatedResults);
    renderTable(homeworkEntries, {
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry
        });
    clearForm();     
    resetAllUIStates();
}

const performClearAllData = () => {
    homeworkEntries.length = 0;
    console.log("In-memory array cleared:", homeworkEntries);
    clearAllEntries();
    renderTable(homeworkEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
    clearForm();
    hideResults();
    resetAllUIStates();
};

const handleClearForm = () => {
  clearForm();
  hideResults()
  console.log('Clear button clicked');
  resetAllUIStates();
}

const handleDeleteEntry = (id) => {
    console.log(`Edit button clicked for ID: ${id} functionality added in step 3`);
    const indexToDelete = homeworkEntries.findIndex((entry) => {
        return entry.id === id;
    });
    if(indexToDelete !== -1) {
        homeworkEntries.splice(indexToDelete, 1);
        console.log(`Entry removed from memory`);
        saveEntries(homeworkEntries);
        renderTable(homeworkEntries, {
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry
        });
        if(homeworkEntries. length === 0){
            hideResults();
            clearForm();
        }
        resetAllUIStates();
    } else {
        //console.log(`Did not find index`)
        resetAllUIStates();
    }
    
};

const handleEditEntry = (id) => {
    console.log(`Edit button clicked for ID: ${id} functionality added in step 3`);
    const entryToEdit = homeworkEntries.find((entry) => {
        return entry.id === id;
    })
    if(entryToEdit) {
        populateFormForEdit(entryToEdit);
        window.scrollTo({top: 0, behavior: 'smooth'});
        console.log(`Editing entry id ${id} form populated`);
        resetAllUIStates()
    }
    resetAllUIStates();
};

const init = () => {
  console.log('App initialized: DOM is ready! Try submitting the form or clearing it.')
  homeworkForm.addEventListener('submit' , handleFormSubmit);
  clearFormButton.addEventListener('click', handleClearForm);
  hideResults();
  const loadedEntries = loadEntries();
  if(loadedEntries.length > 0) {
      homeworkEntries.push(...loadedEntries);
      console.log('Entries loaded from LocalStorage')
  } else {
    console.log('No Entries found in localStorage Starting fresh')
  }


  renderTable(homeworkEntries, {
    onDelete: handleDeleteEntry,
    onEdit: handleEditEntry
  });
  loadAndDisplayAqi();
  loadAndDisplayWeather();
  clearAllDataButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if(isConfirmingClearAll) {
         performClearAllData();
    } else {
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = 'Are you sure? Click again';
            clearAllDataButton.classList.add('confirm-state');
            clearAllTimeoutId = setTimeout(() => {
                resetClearAllButton();
                console.log('Clear All confirmation timed out');
            }, 3000);
        }

  });

  document.addEventListener('click', (event) => {
        //console.log(event.target)
        if(isConfirmingClearAll && event.target !== clearAllDataButton) {
            resetClearAllButton();
        }
    });
};

document.addEventListener('DOMContentLoaded', init);