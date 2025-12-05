
const resultsContainer = document.getElementById('results');

const totalScoreDisplay = resultsContainer.querySelector('#totalScore');
const sleepFormDisplay = resultsContainer.querySelector('#sleepForm');
const moodFormDisplay = resultsContainer.querySelector('#moodForm');
const priorityFormDisplay = resultsContainer.querySelector('#priorityForm');
const assignmentFormDisplay = resultsContainer.querySelector('#assignmentForm');
const homeworkDecisionDisplay = resultsContainer.querySelector('#homeworkDecision');


export const ui = (results) => {
    totalScoreDisplay.textContent = `Total Score: ${results.totalScore}.`;
    sleepFormDisplay.textContent = `Sleep Quality: ${results.sleepPoints} Points`;
    moodFormDisplay.textContent = `Mood Level: ${results.moodPoints} Points`;
    priorityFormDisplay.textContent = `Urgency: ${results.urgencyPoints} Points`;
    assignmentFormDisplay.textContent = `# of Homework Assignments: ${results.assignmentPoints} Points`;
    homeworkDecisionDisplay.textContent = `Do Homework Today?: ${results.homeworkDecision}`;

    resultsContainer.style.display = 'block';
};

export const hideResults = () => {
    resultsContainer.style.display = 'none';

};