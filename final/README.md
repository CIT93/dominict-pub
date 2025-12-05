# Project Title: "Personal Decision Making App - Step 1: UI Setup, Basic Input Handling & Modular Output"

# Description 
This app helps to see whether or not I should do my homework today depending on the quality of sleep I got, what mood I'm in, and when it's due. Step 1 sets up the basic look and gets input capture and console logging working using a modular approach.

# My Decision Focus
This app is specifically used to help me to decide if I should do my homework today. It's based on three factors:

# My Plans for Step 4

# New Feature: Number of Assignments/Homework
I want to add a new input that allows you to enter a number value that indicates how many assignments/homework that you have to better help you to decide whether or not you should start working on it.

In the form there will be a new value input field that allows you to enter a number to indicate your number of assignments.

I would need to add another table row that includes the number of assignments and is displayed as part of the final result. It also needs to be taken into account as part of the final score so that it can help influence the final result given to the user by seeing how many assignments there are.

1. Sleep quality: How well did I sleep the night before tp determine energy
2. Mood level: How am I feeling as of right now to determine if I'm in the mood to do anything
3. Urgency: When the homework is due

# My Decision Logic
1. Sleep Quality Logic:
    When Sleep Quality is 'great', then the value is 3.
    When Sleep Quality is 'okay', then the value is 2.
    When Sleep Quality is 'poor', then the value is 1.
    When Sleep Quality is unknown, then the value is 0.

2. Mood Level Logic:
    When Mood Level is 'high', then the value is 3.
    When Mood Level is 'neutral', then the value is 2.
    When Mood Level is 'poor', then the value is 1.
    When Mood Level is unknown, then the value is 0.

3. Urgency Logic:
    When diffDay is less than or equal to 0, then the value is 3.
    When diffDay is equal to 1, then the value is 2.
    When diffDay is less than or equal to 3, then the value is 1.
    When diffDay is unknown, then the value is 0.

4. Final Decision Logic:
    If the score is greater than or equal to 7, then a message pops up telling you to start working on it.
    If the score is greater than or equal to 5, then it suggest that you should do your work.
    If the score is greater than or equal to 3, then it'll tell you wait until you feel better.
    If the score is 0, then it'll tell you to do it another day.

# Example Outputs:
 Ex. 1: Start working on homework
    Sleep Quality: Great
    Mood Level: High
    Homework Due Date: Next Day
    Decision: "Start Working on it."

Ex. 2: Good choice
    Sleep Quality: Okay
    Mood Level: Neutral
    Homework Due Date: In 2 Days
    Decision: "Would be a good choice to work on it."
    
Ex. 3: Wait till better
    Sleep Quality: Poor
    Mood Level: Low
    Homework Due Date: In 3 Days
    Decision: "Should wait till you feel better."    

# Input Types Used (Updated)
    Radio Buttons (changed from dropdown) - Sleep Quality: A dropdown will appear when you click which allows you to choose between great, okay, or poor depending on how well you slept the night before. If you don't select any of those options, then an error message will pop up telling you that you must select one of the options.
    
    Radio Buttons (changed from dropdown) - Mood Level: Gives you a choice to choose between high, neutral, or low depending on your mood. If you don't choose any of the options, then an error message will pop up telling you that you must select one of the options (New Logic/Functionality).
    
    Date Input - Homework Due Date: Must select the date of when your homework assignment is due. There is also a checkbox with the 'today' title that you can click if the homework is due the day of when you're doing the form. If you don't choose a date or check the box, A error message pops us that tells you to either select a date or check the box
    
    Value Input - # of Homework Assignments: Allows you to enter the number of assignments you have that will then give a higher score if you have more assignments or less points if there is less assignments. There is also a checkbox that you can click if you feel overwhelmed that wull tell you that you should wait until you feel better (Multiple Logic Checks).

# Color Palette
Background: #F5f3EF
Text: #2C2C2C
Border Left: #A9C9D1
Submit Button: #8AA899
Clear Form Button: #B8A89F