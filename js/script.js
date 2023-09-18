const singleParagraph = document.querySelector("#paragraph p");
const typedData = document.querySelector("#paragraph #input");
const setSecond = document.querySelector("#second");
const setWord = document.querySelector("#word");
const setLetter = document.querySelector("#letter");
const setWrongLetter = document.querySelector("#wrongLetter");
const setTypingMsg = document.querySelector(".typing");
let setCircleWidth = document.querySelector(".progress-ring");
let btnGrp = document.querySelectorAll(".btn-one");
let setTotalTime = document.querySelector("#totalTime");

let circleWidthCount = 0;

let writtenLetterSpans;
let newSecond = 60;
let timerInterval = undefined;
let circleInterval = undefined;
let wordsCount = 0;
let letterCount = 0;
let wrongLetterCount = 0;

let setContentBg = document.querySelector(".content");

const showLetter = (sentIndex) => {
  let baseIndex = 0;
  if (typeof sentIndex === "number") {
    baseIndex = sentIndex;
  }
  for (const letter of writtenLetterSpans) {
    letter.classList.remove("highlighted");
  }
  if (writtenLetterSpans.length - 1 < baseIndex) {
    newSecond = 0;
    return;
  }
  writtenLetterSpans[baseIndex].classList.add("highlighted");

  if (baseIndex == 1) {
    startTimer();
  }
};
let oldIndex = -1;
const showParagraph = () => {
  singleParagraph.textContent = "";
  let randomIndex;

  // Generate a new random index until it's different from the oldIndex
  while (true) {
    randomIndex = Math.floor(Math.random() * paragraph.length);
    if (randomIndex !== oldIndex) {
      break;
    }
  }

  oldIndex = randomIndex;

  const paragraphText = paragraph[randomIndex];
  const singleLetters = paragraphText.split("");

  singleLetters.forEach((letter) => {
    let newSpan = document.createElement("span");
    newSpan.textContent = letter;
    singleParagraph.appendChild(newSpan);
  });
  writtenLetterSpans = document.querySelectorAll("#paragraph p span");
  showLetter();
  startAgain();
};

const showBg = () => {
  let randomIndex;

  // Generate a new random index until it's different from the oldIndex
  while (true) {
    randomIndex = Math.floor(Math.random() * bgImage.length);
    if (randomIndex !== oldIndex) {
      break;
    }
  }

  oldIndex = randomIndex;
  setContentBg.style.backgroundImage = ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage[randomIndex]})`;
};

const startTimer = () => {
  setSecond.textContent = newSecond;

  circleInterval = setInterval(() => {
    circleWidthCount += 4.7;
    setCircleWidth.style.strokeDashoffset = circleWidthCount;
  }, 1000);
  timerInterval = setInterval(() => {
    newSecond--;
    if (newSecond > 0) {
      setSecond.textContent = newSecond;
    }
    if (newSecond <= 0) {
      clearInterval(timerInterval);
      clearInterval(circleInterval);
      makeBtnDisable("auto");

      showTextDisabledEffect("disabled");

      let typedLetters = typedData.value;
      setTotalTime.textContent = 60 - Number(setSecond.innerHTML);
      writtenLetterSpans.forEach((span, index) => {
        if (index < typedLetters.length) {
          const typedLetter = typedLetters[index];
          const paragraphText = span.textContent;
          letterCount++;
          if (paragraphText !== typedLetter) {
            wrongLetterCount++;
            if (paragraphText == " ") {
              wrongLetterCount--;
              letterCount--;
            }
          }
          if (paragraphText == " ") {
            wordsCount++;
          }
          if (paragraphText == ".") {
            wordsCount++;
          }

          console.log("paragraphText", paragraphText, wordsCount);
        }
      });

      setLetter.textContent = letterCount;
      setWrongLetter.textContent = wrongLetterCount;
      setWord.textContent = wordsCount;
      typedData.value = "";
      typedData.disabled = true;
      makeBtnDisable("auto");
    }
  }, 1000);
};

let showletterCount = 1;
document.addEventListener("input", function () {
  setTypingMsg.style.display = "none";
  if (showletterCount === 1) {
    makeBtnDisable("none");
  }

  const typedLetters = typedData.value;
  showLetter(showletterCount);
  writtenLetterSpans.forEach((span, index) => {
    if (index < typedLetters.length) {
      const typedLetter = typedLetters[index];
      const paragraphText = span.textContent;
      if (paragraphText !== typedLetter) {
        if (paragraphText == " ") {
          span.style.backgroundColor = "red";
        }
        span.classList.add("active");
      }
    }
  });
  showletterCount++;
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
  wrongLetterCount = 0;

  clearInterval(timerInterval);
  clearInterval(circleInterval);
  setSecond.textContent = " 60";
  circleWidthCount = "00";
  setCircleWidth.style.strokeDashoffset = circleWidthCount;
  showletterCount = 1;
  newSecond = 60;
  letterCount = "00";
  wordsCount = 0;
  wrongLetterCount = "00";
  setLetter.textContent = letterCount;
  setWrongLetter.textContent = wrongLetterCount;
  setWord.textContent = wordsCount;
  setTotalTime.textContent = "00";
  showTextDisabledEffect();
  showLetter();
  makeBtnDisable("auto");
};

const showTextDisabledEffect = (disabled) => {
  writtenLetterSpans.forEach((span, index) => {
    if (
      span.getAttribute("class") !== "disabled" &&
      span.getAttribute("class") !== "active" &&
      disabled
    ) {
      span.classList.add(disabled);
    } else {
      console.log("found");
      span.classList.remove("disabled");
    }
  });
};

const makeBtnDisable = (css) => {
  console.log(css);

  for (let i = 0; i < btnGrp.length - 1; i++) {
    const btn = btnGrp[i];
    btn.style.pointerEvents = css;
    if (typedData.value.length < 1) {
      console.log(css);
      btn.classList.remove("disabled");
    } else {
      console.log("hasan", typedData.value);
      btn.classList.add("disabled");
    }
  }
};

showParagraph();
showBg();
showLetter();
