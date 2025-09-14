Project Title: "Personal Decision Making App - Step 1: UI Setup, Basic Input Handling & Modular Output"

Description 
This app helps to see whether or not I should do my homework today depending on the quality of sleep I got, what mood I'm in, and when it's due. Step 1 sets up the basic look and gets input capture and console logging working using a modular approach.

My Decision Focus
This app is specifically used to help me to decide if I should do my homework today. It's based on three factors:

1. Sleep quality: How well did I sleep the night before tp determine energy
2. Mood level: How am I feeling as of right now to determine if I'm in the mood to do anything
3. Urgency: When the homework is due

My Decision Logic
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

Example Outputs:
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

Input Types Used
    Dropdown - Sleep Quality
    Dropdown - Mood Level
    Date Input - Homework Due Date 

Color Palette
Background: #F5f3EF
Text: #2C2C2C
Border Left: #A9C9D1
Submit Button: #8AA899
Clear Form Button: #B8A89F