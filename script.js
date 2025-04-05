const birthdayInput = document.getElementById('birthdayInput');
const startButton = document.getElementById('startButton');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const messageElement = document.getElementById('message');
const countdownTitle = document.getElementById('countdownTitle');


const today = new Date();
const formattedDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
birthdayInput.setAttribute('min', formattedDate);


let countdownTimer;


startButton.addEventListener('click', function() {
  
  const birthdayDate = birthdayInput.value;
  
  
  if (!birthdayDate) {
    alert('Please enter your birthday date!');
    return;
  }
  
  
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
  
  
  startCountdown(birthdayDate);
});


function startCountdown(birthdayDate) {
  
  const birthday = new Date(birthdayDate);
  const currentYear = today.getFullYear();
  
  const thisYearBirthday = new Date(
    currentYear,
    birthday.getMonth(),
    birthday.getDate()
  );
  
  if (thisYearBirthday < today) {
    thisYearBirthday.setFullYear(currentYear + 1);
  }
  
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedBirthday = thisYearBirthday.toLocaleDateString('en-US', options);
  
  countdownTitle.textContent = `Time until ${formattedBirthday}:`;
  
  updateCountdown(thisYearBirthday);
  countdownTimer = setInterval(function() {
    updateCountdown(thisYearBirthday);
  }, 1000);
}

function updateCountdown(targetDate) {

    const currentTime = new Date();
  
  
  const timeDifference = targetDate - currentTime;
  
  
  if (timeDifference <= 0) {
    clearInterval(countdownTimer);
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    messageElement.textContent = '🎉 Happy Birthday! 🎂';
    return;
  }
  
  
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
  
  const formatNumber = (num) => (num < 10 ? `0${num}` : num);
  
  
  daysElement.textContent = formatNumber(days);
  hoursElement.textContent = formatNumber(hours);
  minutesElement.textContent = formatNumber(minutes);
  secondsElement.textContent = formatNumber(seconds);
  
  
  if (days > 30) {
    messageElement.textContent = "Still plenty of time to plan your celebration!";
  } else if (days > 7) {
    messageElement.textContent = "Your birthday is coming up soon!";
  } else if (days > 0) {
    messageElement.textContent = "Almost there! Your birthday is this week!";
  } else {
    messageElement.textContent = "It's almost time! Less than a day to go!";
  }
}