
const homeworkForm = document.getElementById('homeworkForm');

const sleepQualityRadios = homeworkForm.querySelectorAll('input[name="sleepQuality"]');

const moodLevelRadios = homeworkForm.querySelectorAll('input[name="moodLevel"]');

const dueDateInput = homeworkForm.querySelector('#dueDate');

const assignmentCountInput = homeworkForm.querySelector('#assignmentCount');

const isOverwhelmedInput = homeworkForm.querySelector('#isOverwhelmed')

const entryIdInput = homeworkForm.querySelector('#entryId');

const submitButton = document.getElementById('submitButton');

const getSelectedRadioValue = (radioButtons) => {
    for (const radio of radioButtons) {
        if (radio.checked) {
            return radio.value;
        }
    }
};

const setSelectedRadioValue = (radioButtons, valueToSet) => {
    for (const radio of radioButtons) {
        if (radio.value === valueToSet){
            radio.checked = true;
            break;
        }
    }
};

export const populateFormForEdit = (entry) => {
    entryIdInput.value = entry.id;
    setSelectedRadioValue(sleepQualityRadios, entry.sleepQuality);
    setSelectedRadioValue(moodLevelRadios, entry.moodLevel);
    dueDateInput.value = entry.dueDate;
    assignmentCountInput.value = entry.assignmentCount;
    isOverwhelmedInput.checked = entry.isOverwhelmedInput;
    submitButton.textContent = 'Update Entry';
    console.log(`Form populated for editing entry id: ${entry.id}`)

}

export const getFormInputs = () => {
    return {
        id: entryIdInput.value || null,
        sleepQuality: getSelectedRadioValue(sleepQualityRadios),
        moodLevel: getSelectedRadioValue(moodLevelRadios),
        dueDate: dueDateInput.value,
        assignmentCount: parseInt(assignmentCountInput.value) || 0,
        isOverwhelmed: isOverwhelmedInput.checked
    };
};

export const clearForm = () => {
    homeworkForm.reset();
    moodLevelRadios.checked= true;
    submitButton.textContent = 'Submit';
    entryIdInput.value = '';
    console.log('Clear Form');
};