const singleParagraph = document.querySelector("#paragraph p");
const typedData = document.querySelector("#paragraph #input");

console.log(typedData);

const showParagraph = () => {
  const randomIndex = Math.floor(Math.random() * paragraph.length);
  singleParagraph.textContent = paragraph[randomIndex];
  showBg();
};

const showBg = () => {
  const randomIndex = Math.floor(Math.random() * bgImage.length);
  document.body.style.background = `url(${bgImage[randomIndex]})`;
};
showParagraph();

document.addEventListener("keydown", function () {
  typedData.focus();
});
