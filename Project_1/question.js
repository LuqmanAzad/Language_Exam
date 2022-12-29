let currentNumber = 0;
const totalNumberOfQuestions = 10;

let timer = 240;
let intervalId;
let elapsedTime = 0;
let result = 0;

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
  fetch(`/Project_1/php/question.php?offset=${currentNumber}`)
    .then((response) => response.json())
    .then((data) => {
      const question = document.querySelector(".question");
      question.textContent = data.question;

      const questionNum = document.querySelector("#question_num");
      questionNum.textContent = `Question ${data.id}`;

      const options = [data.Answer, data.Option2, data.Option3, data.Option4];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      const optionElements = document.querySelectorAll(".option label");
      optionElements.forEach((option, index) => {
        option.textContent = options[index];
      });
    });
};

window.addEventListener("load", () => {
  const name = sessionStorage.getItem("name");

  // Get the user-name element
  const userNameElement = document.querySelector("#user-name");

  // Update the innerHTML of the user-name element with the name value
  userNameElement.innerHTML = name;

  const display = document.querySelector("#timer");
  resetTimer(timer, display);

  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("change", (event) => {
      // Reset the background color of the previous option
      for (const option of options) {
        option.classList.remove("selected");
      }

      const selectedOption = event.target.parentElement;
      if (selectedOption.classList.contains("selected")) {
        selectedOption.classList.remove("selected");
      } else {
        // Add the 'selected' class to the new option
        selectedOption.classList.add("selected");
      }

      // Check if the selected option is the correct answer
      // If it is, add 10 to the result
      if (selectedOption.textContent === data.Answer) {
        result += 10;
      }
    });
  });

  fetchQuestion();

  const submitButton = document.querySelector(".submit");
  submitButton.addEventListener("click", () => {
    options.forEach((option) => option.classList.remove("selected"));
    currentNumber += 1;
    history.pushState(
      {},
      "",
      `/Project_1/html/question.html?offset=${currentNumber}`
    );
    fetchQuestion();
  });
});

