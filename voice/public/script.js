// Updated script.js
document.getElementById('userInput').addEventListener('keyup', async function(event) {
    // Check if the pressed key was the Enter/Return key
    if (event.keyCode === 13) {
        event.preventDefault();  // Prevent the default action
        document.getElementById('submitQuery').click();
    }
});

document.getElementById('submitQuery').addEventListener('click', async function() {
    const userInput = document.getElementById('userInput').value;
    const response = await fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userInput })
    });
    const data = await response.json();
    document.getElementById('assistantResponse').innerText = data.response;
});

document.getElementById('clearInput').addEventListener('click', function() {
    document.getElementById('userInput').value = '';
    document.getElementById('assistantResponse').innerText = '';
});
