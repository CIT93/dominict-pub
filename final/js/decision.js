
const calculateSleepPoints = (sleepQuality) => {
    switch (sleepQuality) {
        case 'great': return 3;
        case 'okay': return 2;
        case 'poor': return 1;
        default: return 0;
    }    
};
const calculateMoodPoints = (moodLevel) => {
    switch (moodLevel) {
        case 'high': return 3;
        case 'neutral': return 2;
        case 'low': return 1;
        default: return 0;
    }
};

const calculateUrgencyPoints = (dueDate) => {
    if (!dueDate) return 0;

    const [year, month, day] = dueDate.split("-").map(Number);
    const due = new Date(year, month - 1, day);

    const today = new Date();
    const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.round((due - todayLocal) / msPerDay);

    if(diffDays <= 0) return 3;
    else if(diffDays === 1) return 2;
    else if(diffDays <=3) return 1;
    return 0;
};

const calculateAssignmentPoints = (assignmentCount, isOverwhelmed) => {
    if(isOverwhelmed) return 0;
    else if(assignmentCount >= 5) return 3;
    else if(assignmentCount >= 3) return 2;
    else if(assignmentCount >= 1) return 1;
    return 0;
};

export const calculateHomeworkDecision = (data) => {
    const sleepPoints = calculateSleepPoints(data.sleepQuality);
    const moodPoints = calculateMoodPoints(data.moodLevel);
    const urgencyPoints = calculateUrgencyPoints(data.dueDate);
    const assignmentPoints = calculateAssignmentPoints(data.assignmentCount, data.isOverwhelmed);
    
    const totalScore  = sleepPoints + moodPoints + urgencyPoints + assignmentPoints;

    let homeworkDecision

    if (totalScore >=12) {
        homeworkDecision = "Start working on it.";
    } else if (totalScore >=9) {
        homeworkDecision = "Would be a good choice to work on it."; 
    } else if (totalScore >= 7) {
        homeworkDecision = "Should wait till you feel better.";
    } else {
        homeworkDecision = "You can do it another day.";
    }

    return {
        totalScore,
        sleepPoints,
        moodPoints,
        urgencyPoints,
        assignmentPoints,
        homeworkDecision 
    };
};