const homeworkTable = document.getElementById('homeworkTable');
const homeworkTableBody = homeworkTable.querySelector('tbody');
const noEntriesMessage = document.getElementById('noEntriesMessage');

let _currentCallbacks = {};
let currentConfirmingRowElement = null;
let currentConfirmTimeoutId = null;
const clearAllDataButton = document.getElementById('clearAllDataButton');

const showDeleteConfirmingButtons = (actionCell, id, onDeleteCallback) => {
    // Hide original buttons
    const editButton = actionCell.querySelector('.action-button.edit');
    const deleteButton = actionCell.querySelector('.action-button.delete');
    if(editButton) editButton.style.display = 'none';
    if(deleteButton) deleteButton.style.display = 'none';

    // Create and append confirmation buttons
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm Delete';
    confirmBtn.classList.add('action-button', 'confirm') // Add styling class
    confirmBtn.dataset.id = id;

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('action-button', 'cancel') // Add styling class
    cancelBtn.dataset.id = id;

    // update table with new confirmation buttons
    actionCell.appendChild(confirmBtn);
    actionCell.appendChild(cancelBtn);

    // Set timeout to revert buttons if no action
    currentConfirmTimeoutId = setTimeout(() => {
        resetRowConfirmationState();
    }, 3000)

    confirmBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onDeleteCallback(id);
        resetRowConfirmationState();
    });

    cancelBtn.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        resetRowConfirmationState();
    })
    console.log(`Asking for confirmation for row id ${id}`)
};

const hideDeleteConfirmationButtons = () => {
    const editButton = currentConfirmingRowElement.querySelector('.action-button.edit');
    const deleteButton = currentConfirmingRowElement.querySelector('.action-button.delete');
    const confirmButton = currentConfirmingRowElement.querySelector('.action-button.confirm');
    const cancelButton = currentConfirmingRowElement.querySelector('.action-button.cancel');
    if(editButton) editButton.style.display = 'inline-block';
    if(deleteButton) deleteButton.style.display = 'inline-block';
    if(confirmButton) confirmButton.remove();
    if(cancelButton) cancelButton.remove();

}

export const resetRowConfirmationState = () => {
    if(currentConfirmingRowElement) {
        if(currentConfirmTimeoutId) {
            clearTimeout(currentConfirmTimeoutId);
            currentConfirmTimeoutId = null;
        }
        hideDeleteConfirmationButtons();
        currentConfirmingRowElement = null;
    }
}

const formatRadioValue = (value) => {
    switch (value) {
        case 'great': return 'Great';
        case 'okay': return 'Okay';
        case 'poor': return 'Poor';
        case 'high': return 'High';
        case 'neutral': return 'Neutral';
        case 'low': return 'Low';
        default: return value;
    }
};

const formatDateForDisplay = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
    });
};

const formatHomeworkAssignmentDisplay = (assignmentCount, isOverwhelmed) => {
    if(isOverwhelmed) {
        return 'Overwhelmed.'
    } else {
        return `${assignmentCount.toFixed(0)} `
    };
};

const createTableRow = (entry) => {
    const row = document.createElement('tr');
    row.dataset.id = entry.id;
    row.innerHTML = `
        <td>${formatDateForDisplay(entry.timestamp)}</td>
        <td>${formatRadioValue(entry.sleepQuality)}</td>
        <td>${formatRadioValue(entry.moodLevel)}</td>
        <td>${formatDateForDisplay(entry.dueDate)}</td>
        <td>${formatHomeworkAssignmentDisplay(entry.assignmentCount)}</td>
        <td>${entry.totalScore}</td>
        <td>${entry.homeworkDecision}</td>
        <td class="action-cell">
            <button class="action-button edit" data-id="${entry.id}">Edit</button>
            <button class="action-button delete" data-id="${entry.id}">Delete</button>
        </td>
    `;    
    return row
};

export const renderTable = (entries, callbacks) => {
    _currentCallbacks = callbacks;
    homeworkTableBody.innerHTML = '';
    if (entries.length === 0) {
        homeworkTable.style.display = 'none';
        noEntriesMessage.style.display = 'block';
        clearAllDataButton.style.display = 'none';
        console.log(`No entries to display Table hidden`);
        return;
    } else {
        homeworkTable.style.display = 'table';
        noEntriesMessage.style.display = 'none';
        clearAllDataButton.style.display = 'block';
    }

    const sortedEntries = [...entries].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    for (const entry of sortedEntries) {
        const rowElement = createTableRow(entry);
        homeworkTableBody.appendChild(rowElement);
    };
};

const handleTableClick = (event) => {
    const target = event.target;
    const id = target.dataset.id;
    const actionCell = target.closest('td');
    //console.log(target);
    if(target.classList.contains('delete') && typeof _currentCallbacks.onDelete === 'function') {
        currentConfirmingRowElement = actionCell; 
        showDeleteConfirmingButtons(actionCell, id, _currentCallbacks.onDelete);
    } else if (target.classList.contains('edit') && typeof _currentCallbacks.onEdit === 'function'){
        resetRowConfirmationState();
        _currentCallbacks.onEdit(id);
        //console.log('Edit will be coded later!')
    }

};

homeworkTableBody.addEventListener('click', handleTableClick);