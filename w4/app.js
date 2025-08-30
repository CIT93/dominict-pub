console.log('Hello from app.js! Your JavaScript is connected and running!');

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("greetingForm");
  const nameInput = document.getElementById("nameInput");
  const greetingOutput = document.getElementById("greetingOutput");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    

