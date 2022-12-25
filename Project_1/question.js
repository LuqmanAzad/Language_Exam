function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  var fiveMinutes = 60 * 1, display = document.querySelector("#timer");
  startTimer(fiveMinutes, display);

  const options = document.querySelectorAll(".option");
  const labels = document.querySelectorAll(".option label");
  options.forEach((option) => {
    option.addEventListener("change", (event) => {
      // Check if the option has already been selected
      if (event.target.parentElement.style.backgroundColor === "#F78404") {
        // Reset the background color of the selected option
        event.target.parentElement.style.backgroundColor = "";
        // Reset the color of the selected label
        event.target.nextElementSibling.style.color = "#fff";
      } else {
        // Reset the background color of all options
        options.forEach((option) => {
          option.style.backgroundColor = "";
        });
        // Reset the color of all labels
        labels.forEach((label) => {
          label.style.color = "#fff";
        });
        // Set the background color of the selected option
        event.target.parentElement.style.backgroundColor = "#F78404";
        // Set the color of the selected label
        event.target.nextElementSibling.style.color = "#000";
      }
    });
  });

  fetch('http://localhost/Project_1/question.php')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Populate the question and options on the page
      const question = document.querySelector('.question');
      //question.textContent = data.question;
      console.log(data.question);

      const questionNum = document.querySelector('#question_num');
      questionNum.textContent = `Question ${data.id}`;

      const optionElements = document.querySelectorAll('.option label');
      // Randomly shuffle the options
      const options = [data.answer, data.option2, data.option3, data.option4];
      options.sort(() => Math.random() - 0.5);

      optionElements.forEach((option, index) => {
        option.textContent = options[index];
      });
    });
};
