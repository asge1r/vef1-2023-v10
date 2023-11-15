let quote = document.getElementById("quote");
let author = document.getElementById("author");
let btn = document.getElementById("btn");

const url = "https://api.quotable.io/random";
let firstClick = true;

let getQuote = async () => {
  try {
    const response = await fetch(url);
    const item = await response.json();

    quote.innerText = item.content;
    author.innerText = item.author;

    if (!firstClick) {
      speakQuote(); 
    } else {
      firstClick = false;
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
};

btn.addEventListener("click", getQuote);

window.addEventListener("load", () => {
  speakInitialMessage(); 
  getQuote(); 
});

let speakInitialMessage = () => {
  var speech = new SpeechSynthesisUtterance();
  speech.text = "Click the button for the next quote!";
  speech.volume = 1;
  speech.rate = 1.2;
  speech.pitch = 1.4;
  speech.lang = "en-US";
  speechSynthesis.speak(speech);
};

let speakQuote = () => {
  let text1 = quote.innerText;
  let text2 = " by " + author.innerText;

  let utterance1 = new SpeechSynthesisUtterance();
  let utterance2 = new SpeechSynthesisUtterance();

  utterance1.text = text1;
  utterance2.text = text2;

  utterance1.voice = window.speechSynthesis.getVoices()[0];
  utterance2.voice = window.speechSynthesis.getVoices()[0];

  utterance1.pitch = 1.2;
  utterance2.pitch = 0.9;
  utterance2.rate = 0.7;

  utterance1.onend = () => {
    window.speechSynthesis.speak(utterance2);
  };

  window.speechSynthesis.speak(utterance1);
};
