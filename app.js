const startButton = document.getElementById('startButton');
const status = document.getElementById('status');

// Initialize SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = true;

// Initialize SpeechSynthesis (Text-to-Speech)
const synth = window.speechSynthesis;

function speakResponse(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = synth.getVoices().find(voice => voice.name === 'Google UK English Male') || synth.getVoices()[0]; // Optional: Change voice
  utterance.pitch = 1;
  utterance.rate = 0.8; // Adjust speed for a calm tone
  synth.speak(utterance);
}

// Start recognition when the button is clicked
startButton.addEventListener('click', () => {
  recognition.start();
  status.innerHTML = 'Listening...';
});

// Process speech results
recognition.onresult = function(event) {
  const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
  console.log('Command received:', transcript);
  
  if (transcript.includes('hello')) {
    speakResponse("Good day. How may I assist you?");
  } else if (transcript.includes('time')) {
    const currentTime = new Date().toLocaleTimeString();
    speakResponse(`The time is ${currentTime}.`);
  } else if (transcript.includes('open browser')) {
    speakResponse("Opening the browser now.");
    // You could add logic to open the browser or other applications here
  } else if (transcript.includes('tell me a joke')) {
    speakResponse("Why don’t programmers like nature? It has too many bugs.");
  } else {
    speakResponse("I’m afraid I didn’t quite understand that. Please try again.");
  }
};

// Handle speech recognition errors
recognition.onerror = function(event) {
  status.innerHTML = "Sorry, something went wrong. Please try again.";
  console.error(event.error);
};

// When recognition stops
recognition.onend = function() {
  status.innerHTML = 'Press the button to speak with Jarvis.';
};
