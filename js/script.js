const singleParagraph = document.querySelector("#paragraph p");
const typedData = document.querySelector("#paragraph #input");
const setSecond = document.querySelector("#second");
const setWord = document.querySelector("#word");
const setLetter = document.querySelector("#letter");
const setWrongLetter = document.querySelector("#wrongLetter");
const setTypingMsg = document.querySelector(".typing");
let writtenLetterSpans;
let timerInterval = undefined;
let wordsCount = 0;
let letterCount = 0;
let wrongLetterCount = 0;
let setContentBg = document.querySelector(".content");

const showParagraph = () => {
  singleParagraph.textContent = "";
  const randomIndex = Math.floor(Math.random() * paragraph.length);
  const paragraphText = paragraph[randomIndex];
  const singleLetters = paragraphText.split("");

  singleLetters.forEach((letter) => {
    let newSpan = document.createElement("span");
    newSpan.textContent = letter;
    singleParagraph.appendChild(newSpan);
  });
  writtenLetterSpans = document.querySelectorAll("#paragraph p span");
};

const showBg = () => {
  const randomIndex = Math.floor(Math.random() * bgImage.length);
  setContentBg.style.backgroundImage = ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage[randomIndex]})`;
};

const showLetter = (sentIndex) => {
  let baseIndex = 0;
  if (typeof sentIndex === "number") {
    baseIndex = sentIndex;
  }
  for (const letter of writtenLetterSpans) {
    letter.classList.remove("highlighted");
  }
  writtenLetterSpans[baseIndex].classList.add("highlighted");
};

const progressRing = document.querySelector(".progress-ring");
let percentage = 100; // Start at 100%
const targetPercentage = 0; // End at 0%
const duration = 60;
let circumference = 2 * Math.PI * 45;
const steps = 100; // Number of steps to reach 0%
const interval = (duration * 1000) / steps;

function updateProgressRing() {
  if (percentage > targetPercentage) {
    const dashOffset = circumference - (percentage / 100) * circumference;
    progressRing.style.strokeDashoffset = dashOffset;
    percentage--;
  } else {
    clearInterval(progressRingInterval);
  }
}

let progressRingInterval;

const startTimer = () => {
  let newSecond = 20;
  setSecond.textContent = newSecond;
  timerInterval = setInterval(() => {
    newSecond--;
    setSecond.textContent = newSecond;
    if (newSecond <= 0) {
      clearInterval(timerInterval);
      typedData.disabled = true;
      setSecond.textContent = " 00";
      const typedLetters = typedData.value;
      const typedWords = typedLetters.trim().split(" ");
      const typedallLetters = typedLetters.trim().split("");

      // Words counts
      wordsCount = typedWords.length;
      console.log(typedWords);
      setWord.textContent = wordsCount;

      letterCount = typedallLetters.length;
      setLetter.textContent = letterCount;

      writtenLetterSpans.forEach((span, index) => {
        if (index < typedLetters.length) {
          const typedLetter = typedallLetters[index];
          const paragraphText = span.textContent;
          if (paragraphText !== typedLetter && typedLetter !== undefined) {
            wrongLetterCount++;
          }
        }
        span.classList.remove("highlighted");
      });
      setWrongLetter.textContent = wrongLetterCount;
    }
  }, 1000);
};

const startIntervals = () => {
  progressRingInterval = setInterval(updateProgressRing, interval);
  startTimer();
};

document.addEventListener("input", function () {
  setTypingMsg.style.display = "none";
  if (!progressRingInterval && !timerInterval) {
    // Start both intervals when the user begins typing
    startIntervals();
    console.log("enter");
  }

  const typedLetters = typedData.value;

  writtenLetterSpans.forEach((span, index) => {
    if (index < typedLetters.length) {
      const typedLetter = typedLetters[index];
      const paragraphText = span.textContent;
      if (paragraphText !== typedLetter) {
        if (paragraphText == " ") {
          wordsCount++;
          console.log("wordscount", wordsCount);
          span.style.backgroundColor = "red";
        }

        span.classList.add("active");
      }
      showLetter(index + 1);
    }
  });
});

document.addEventListener("keydown", function (event) {
  typedData.focus();

  // Handle Backspace key (key code 8)
  if (event.key === "Backspace") {
    const typedLetters = typedData.value;

    if (typedLetters.length > 0) {
      const lastTypedLetterIndex = typedLetters.length - 1;
      const lastTypedLetterSpan = writtenLetterSpans[lastTypedLetterIndex];
      if (lastTypedLetterSpan) {
        lastTypedLetterSpan.classList.remove("active");
        lastTypedLetterSpan.style.backgroundColor = "transparent";
      }
    }
  }
});

const startAgain = () => {
  setTypingMsg.style.display = "block";
  typedData.disabled = false;
  typedData.value = "";
  writtenLetterSpans.forEach((span) => {
    span.classList.remove("active");
    span.style.backgroundColor = "transparent";
  });
  wordsCount = 0; // Reset word count
  letterCount = 0; // Reset letter count
  wrongLetterCount = 0; // Reset wrong letter count

  setLetter.textContent = letterCount; // Update the displayed counts
  setWord.textContent = wordsCount;
  setWrongLetter.textContent = wrongLetterCount;
  clearInterval(progressRingInterval);
  clearInterval(timerInterval);
  progressRing.style.strokeDashoffset = 0;
  percentage = 100;
  setSecond.textContent = "00";
  timerInterval = undefined;
  progressRingInterval = undefined;
  showLetter();
};

showParagraph();
showBg();
showLetter();
