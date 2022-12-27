
let currentNumber = 0;
const totalNumberOfQuestions = 10;

const startTimer = (duration, display) => {
  let timer = duration;
  const interval = setInterval(() => {
    const minutes = parseInt(timer / 60, 10);
    const seconds = parseInt(timer % 60, 10);

    display.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (--timer < 0) {
      clearInterval(interval);
      // Reset the timer and fetch the next question
      startTimer(60, display);
      currentNumber += 1;
      history.pushState(
        {},
        "",
        `/Project_1/html/question.html?offset=${currentNumber}`
      );
      fetchQuestion();
    }
  }, 1000);
};

const fetchQuestion = () => {
  // Check if the current question number is equal to the total number of questions
  if (currentNumber === totalNumberOfQuestions) {
    // Display the results page
    showResultsPage();
    return;
  }

  // Otherwise, fetch the next question
  fetch(`/Project_1/php/question.php?offset=${currentNumber}`)
    .then((response) => response.json())
    .then((data) => {
      const question = document.querySelector(".question");
      question.textContent = data.question;

      const questionNum = document.querySelector("#question_num");
      questionNum.textContent = `Question ${data.id}`;

      // Shuffle the options array
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

  
  const showResultsPage = () => {
    // Hide the quiz elements
    const quizElements = document.querySelectorAll(".option label");
    quizElements.forEach((element) => {
      element.style.display = "none";
    });
  
    // Show the results page
    // const resultsPage = document.querySelector("#results-page");
    // resultsPage.style.display = "block";
  
    // Update the question number element to show "Results"
    const questionNum = document.querySelector("#question_num");
    questionNum.textContent = "Results";
  
    // Calculate and display the results
    // (code to calculate and display the results goes here)
  
    // Update the timer to show the total time taken to complete the quiz
    const timer = document.querySelector("#timer");
    timer.textContent = "Total time: 60 seconds"; // Replace 60 with the actual total time taken to complete the quiz
  };
  
  window.addEventListener("load", () => {
    let timer = 60; // Initialize timer value
    const display = document.querySelector("#timer");
    startTimer(timer, display);
  
    const options = document.querySelectorAll(".option");
    options.forEach((option) => {
      option.addEventListener("change", (event) => {
        const selectedOption = event.target.parentElement;
        if (selectedOption.classList.contains("selected")) {
          selectedOption.classList.remove("selected");
        } else {
          for (const option of options) {
            option.classList.remove("selected");
          }
          selectedOption.classList.add("selected");
        }
      });
    });
  
    // Fetch and display the first question
    fetchQuestion();
  
    // Add event listener for submit button
    const submitButton = document.querySelector(".submit");
    submitButton.addEventListener("click", () => {
      // Reset timer value to the duration
      timer = 60;
      startTimer(timer, display); // Restart the timer
        // Reset selectedoption to the default state
    options.forEach((option) => {
      option.classList.remove("selected");
    });

    // Increase currentNumber by 1
    currentNumber += 1;
    // Update the URL with the updated currentNumber
    history.pushState(
      {},
      "",
      `/Project_1/html/question.html?offset=${currentNumber}`
    );
    //Fetch the next question with the updated currentNumber
    fetchQuestion();
  });
});
