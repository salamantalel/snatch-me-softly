let affirmations = [];
//Fetch affirmations from JSON server
fetch("http://localhost:3000/affirmations")
  .then(res => res.json())
  .then(data => {
    affirmations = data;
  })
  .catch(err => {
    console.error("Failed to fetch affirmations:", err);
  });

// Select all key DOM elements to be used later
const box = document.getElementById("affirmation-box");
const getBtn = document.getElementById("get-affirmation");
const filterInput = document.getElementById("filter-input");
const newAffirmationInput = document.getElementById("new-affirmation");
const submitBtn = document.getElementById("submit-affirmation");



// Event listener for random affirmation button
getBtn.addEventListener("click", () => {
    // Randomly select one affirmation from the array
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    // Update the text box to show that affirmation
    box.textContent = `"${random.text}"`;
});

// Live filtering as user types
filterInput.addEventListener("input", () => {
    // Convert user input to lowercase
    const keyword = filterInput.value.toLowerCase();

    // Filter affirmations that include the keyword
    const filtered = affirmations.filter(a => a.text.toLowerCase().includes(keyword));

    // Use map() to format each matching affirmation
    const resultText = filtered.map(a => `• ${a.text}`).join("\n");

    // Update the box to show results or fallback message
    box.textContent = resultText || "No matches found.";
});

// Adds new user affirmation to the array
submitBtn.addEventListener("click", () => {
    // Get value from input field
    const newText = (document.getElementById("new-affirmation")?.value || "").trim();
    console.log("You typed:", newText);


    //  Only add if input is not empty
    if (newText.length === 0) {
        alert("Please write something!");
        return;
    }

    //  Create new affirmation object with a unique ID
    const newAffirmation = {
        id: Date.now(),
        text: newText
    };

   //Send post request from the JSON server with the new affirmation
   fetch("http://localhost:3000/affirmations", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ text: newText })
})
  .then(res => res.json())
  .then(data => {
    affirmations.push(data);
    box.textContent = `"${data.text}"`;
    newAffirmationInput.value = "";
  })
  .catch(err => {
    alert("Failed to add affirmation. Try again.");
    console.error(err);
  });
   

    // Display it right away
    box.textContent = `"${newText}"`;

    // Clear input field
    newAffirmationInput.value = "";
}
);

