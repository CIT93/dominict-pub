console.log('Hello from app.js! Your JavaScript is connected and running!');

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("greetingForm");
  const nameInput = document.getElementById("nameInput");
  const greetingOutput = document.getElementById("greetingOutput");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    // Used AI: didn't understand the how to add the greeting string that happens after inputing the name so I asked why doesn't my greeting show up after I put a name. 
    // The AI gave me some lines I can use so I tried to use the eventlistener setup as an example of how to add it with the help of the AI.
    const name = nameInput.value.trim();
    if (name) {
      greetingOutput.textContent = `Hello, ${name}!`;
      form.reset(); 
    } else {
      greetingOutput.textContent = "Please enter your name.";
    }
  });
});
