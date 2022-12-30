let currentNumber = 0;
const totalNumberOfQuestions = 10;
let result = 0; // initialize result to 0
let selectedAnswer; // add this line

let timer = 240;
let intervalId;
let elapsedTime = 0;
const selectedRadio = document.querySelector(
  'input[type="radio"]:checked'
);
const updateTimer = (duration, display) => {
  timer = duration;
  display.textContent = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;
};

const resetTimer = (duration, display) => {
  clearInterval(intervalId);
  updateTimer(duration, display);
  intervalId = setInterval(() => {
    elapsedTime++;
    updateTimer(--timer, display);
    if (timer === 0) {
      clearInterval(intervalId);
      window.location.href = `http://localhost/project_1/html/result.html?time=${elapsedTime}`;
    }
  }, 1000);
};

const fetchQuestion = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const offset = urlParams.get("offset");

  if (offset === "10") {
    window.location.href = `http://localhost/project_1/html/result.html?time=${elapsedTime}&result=${result}`;
  }

  if (currentNumber === totalNumberOfQuestions) {
    window.location.href = `http://localhost/project_1/html/result.html?time=${elapsedTime}&result=${result}`;
  }
  fetch(`/Project_1/question.php?offset=${currentNumber}`)
    .then((response) => response.json())
    .then((data) => {
      const question = document.querySelector(".question");
      question.textContent = data.Question;

      const questionNum = document.querySelector("#question_num");
      questionNum.textContent = `Question ${data.id}`;

      const options = [data.Answer, data.Option2, data.Option3, data.Option4];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      const optionElements = document.querySelectorAll(".radio-label");

      optionElements.forEach((option, index) => {
        option.textContent = options[index];
      });
    });
};
window.fetchQuestion = fetchQuestion;


window.addEventListener("load", () => {
  const name = sessionStorage.getItem("name");

  // Get the user-name element
  const userNameElement = document.querySelector("#user-name");

  // Update the innerHTML of the user-name element with the name value
  userNameElement.innerHTML = name;

  const display = document.querySelector("#timer");
  resetTimer(timer, display);

  const options = document.querySelectorAll(".radio-label");
  options.forEach((option) => {
    option.addEventListener("click", (event) => {
      labels.forEach((label) => {
        label.addEventListener("click", (event) => {
          // Get the selected radio button
          const selectedRadio = document.querySelector(
            'input[type="radio"]:checked'
          );

          // Remove the class from all label elements
          labels.forEach((label) =>
            label.classList.remove(selectedRadio.value)
          );

          // Add the class to the clicked label element
          event.target.classList.add(selectedRadio.value);
        });
      });
    });
  });

  fetchQuestion();

  const submitButton = document.querySelector(".submit");
  submitButton.addEventListener("click", () => {
    currentNumber += 1;
    const selectedRadio = document.querySelector(
      'input[type="radio"]:checked'
    );
    history.pushState(
      {},
      "",
      `/Project_1/html/question.html?offset=${currentNumber}`
    );
  
    fetch(`/Project_1/question.php?offset=${currentNumber}`)
      .then((response) => response.json())
      .then((data) => {
        // Check if the selected option is correct
        if (selectedRadio.value === data.Answer) {
          // Increment the result if the selected option is correct
          result += 10;
        }
      });
      var degree = result;
      sessionStorage.setItem("result", degree);
    fetchQuestion();
  });
  
});
