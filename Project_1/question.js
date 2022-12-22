var countdown = 60;
setInterval(function() {
  countdown--;
  document.getElementById("timer").innerHTML = countdown;

  if (countdown == 0) {
    location.reload();
  }
}, 1000);