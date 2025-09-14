# Personal Decision Making App – Step 1: UI Setup, Basic Input Handling & Modular Output

## Description
This app helps to see whether or not I should do my homework today depending on the quality of sleep I got, what mood I'm in, and when it's due.  
Step 1 sets up the basic look and gets input capture and console logging working using a modular approach.

## My Decision Focus
This app is specifically used to help me decide if I should do my homework today.  
It’s based on three factors:

1. **Sleep quality:** How well did I sleep the night before to determine energy  
2. **Mood level:** How am I feeling right now to determine if I’m in the mood to do anything  
3. **Urgency:** When the homework is due  

## My Decision Logic

### 1. Sleep Quality Logic
- When Sleep Quality is **`great`**, then the value is **3**.  
- When Sleep Quality is **`okay`**, then the value is **2**.  
- When Sleep Quality is **`poor`**, then the value is **1**.  
- When Sleep Quality is unknown, then the value is **0**.  

### 2. Mood Level Logic
- When Mood Level is **`high`**, then the value is **3**.  
- When Mood Level is **`neutral`**, then the value is **2**.  
- When Mood Level is **`poor`**, then the value is **1**.  
- When Mood Level is unknown, then the value is **0**.  

### 3. Urgency Logic
- When `diffDay <= 0`, then the value is **3**.  
- When `diffDay = 1`, then the value is **2**.  
- When `diffDay <= 3`, then the value is **1**.  
- When `diffDay` is unknown, then the value is **0**.  

### 4. Final Decision Logic
- If the score is **≥ 7**, then the message is: **“Start working on it.”**  
- If the score is **≥ 5**, then the message is: **“You should do your work.”**  
- If the score is **≥ 3**, then the message is: **“Wait until you feel better.”**  
- If the score is **0**, then the message is: **“Do it another day.”**  

---

## Example Outputs

**Ex. 1**  
Sleep Quality: Great  
Mood Level: High  
Homework Due Date: Next Day  
**Decision:** Start working on it.  

**Ex. 2**  
Sleep Quality: Okay  
Mood Level: Neutral  
Homework Due Date: In 2 Days  
**Decision:** Would be a good choice to work on it.  

**Ex. 3**  
Sleep Quality: Poor  
Mood Level: Low  
Homework Due Date: In 3 Days  
**Decision:** Should wait till you feel better.  

---

## Input Types Used
- Dropdown – Sleep Quality  
- Dropdown – Mood Level  
- Date Input – Homework Due Date  

---

## Color Palette
- **Background:** `#f5f3ef`  
- **Text:** `#2c2c2c`  
- **Border Left:** `#a9c9d1`  
- **Submit Button:** `#8aa899`  
- **Clear Form Button:** `#8a8a9f`  
