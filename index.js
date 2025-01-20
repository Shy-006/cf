document.addEventListener("DOMContentLoaded", () => {
  const timerDisplay = document.querySelector(".task-timer__timer");
  const startButton = document.querySelector(".task-timer__button--start");
  const container = document.querySelector(".container");
  const totalTimeDisplay = document.querySelector(".total");
  const timeRangeDisplay = document.querySelector(".times");
  const listIcon = document.querySelector(".task-timer__icon"); 
  const calendarContainer = document.querySelector(".calendar-container");
  const calendarIcon = document.querySelector(".calendar-icon"); 
  const projectButton = document.querySelector(".project"); 
  const projectInput = document.querySelector(".task-timer__input"); 

  let timerInterval = null;
  let elapsedTime = 0; 
  let startTime = null; 

  
  container.style.display = "none";
  calendarContainer.style.display = "none";
  calendarIcon.style.display = "none"; 

  
  projectButton.style.display = "block"; 

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  }

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function startTimer() {
    if (!timerInterval) {
      
      startTime = new Date();
      const startTimeInMs = startTime.getTime() - elapsedTime * 1000;
      timerInterval = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTimeInMs) / 1000);
        timerDisplay.textContent = formatTime(elapsedTime);
      }, 1000);

      
      timeRangeDisplay.innerHTML = `<span>${getCurrentTime()}</span> - <span>--:--</span>`;

      
      container.style.display = "none";
      startButton.textContent = "STOP";
    } else {
      clearInterval(timerInterval);
      timerInterval = null;

      
      const endTime = getCurrentTime();
      timeRangeDisplay.innerHTML = `<span>${startTime ? getCurrentTime() : "00:00"}</span> - <span>${endTime}</span>`;

      
      container.style.display = "block";
      totalTimeDisplay.textContent = formatTime(elapsedTime);

      
      startButton.textContent = "START";

      
      timerDisplay.textContent = "00:00:00";
      elapsedTime = 0; 
    }
  }

  
  function updateProjectName() {
    const projectName = projectInput.value.trim();
    if (projectName === "") {
      projectButton.textContent = "Unnamed Project"; 
    } else {
      projectButton.textContent = projectName; 
    }
  }

  
  projectInput.addEventListener("input", updateProjectName);

  
  updateProjectName();

  
  listIcon.addEventListener("click", () => {
    
    if (calendarIcon.style.display === "none" || calendarIcon.style.display === "") {
      calendarIcon.style.display = "block"; 
    } else {
      calendarIcon.style.display = "none"; 
    }

    
    if (calendarContainer.style.display === "none" || calendarContainer.style.display === "") {
      calendarContainer.style.display = "block";
    } else {
      calendarContainer.style.display = "none"; 
    }
  });

  startButton.addEventListener("click", startTimer);
});
