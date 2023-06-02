// get music
const alarmMusic = document.getElementById("alarm-sound");
// Get clock element
const clockElement = document.getElementById("clock");
// get close button
const closeAlarmButton = document.getElementById("alarm-close");

// Update clock
function updateClock() {
  // current time
  const now = new Date();
  const time = now.toLocaleTimeString();
  clockElement.textContent = time;

  let hour = parseInt(now.getHours());
  let minute = parseInt(now.getMinutes());

  if (hour < 10) hour = "0" + hour;
  if (minute < "10") minute = "0" + minute;

  // Fetch current time
  const currentTime = `${hour}:${minute}`;
  alarms.forEach((alarm, index) => {
    const [alarmTime, alarmLabel] = alarm.split("|");
    // if alarm is scheduled at current time
    if (alarmTime == currentTime) {
      // show alarm ringing alert
      showAlert(alarmLabel);
      // delete from list as well as localStorage
      deleteAlarm(index);
      // check if list is empty or not
      checkIsEmpty();
    }
  });
}

// click event on close alarm button
closeAlarmButton.addEventListener("click", function () {
  alarmContainer.classList.add("hide");
  addAlarmButton.classList.remove("hide");
  allAlarms.classList.remove("blur");
  label.innerText = "";
  alarmMusic.pause();
});

// Update clock every second
setInterval(updateClock, 1000);

// get alarm container
const alarmContainer = document.querySelector(".on-alarm");
// get alarm lable
const label = document.getElementById("label");

// show popup for alert, play ring & blur the background
function showAlert(text) {
  alarmContainer.classList.remove("hide");
  addAlarmButton.classList.add("hide");
  allAlarms.classList.add("blur");
  label.innerText = text;
  alarmMusic.play();
}

// Get alarm form and list
const alarmForm = document.getElementById("alarmForm");
const alarmList = document.getElementById("alarmList");

// Get stored alarms from local storage or create empty array
let alarms = JSON.parse(localStorage.getItem("alarms")) || [];

// Render alarms
function renderAlarms() {
  // clear alarmlist
  alarmList.innerHTML = "";
  // iterate all alarms
  alarms.forEach((alarm, index) => {
    const [alarmTime, alarmLabel] = alarm.split("|");
    let hour = parseInt(alarmTime.split(":")[0]);
    let minute = parseInt(alarmTime.split(":")[1]);

    let suffix = "AM";

    if (hour > 12) {
      hour -= 12;
      suffix = "PM";
    }

    if (hour < 10) hour = "0" + hour;
    if (minute < "10") minute = "0" + minute;

    // create custom time for show in list
    let Time = `${hour}:${minute} ${suffix}`;

    // create and append alarm list
    const listItem = document.createElement("li");
    const liContainer = document.createElement("div");
    liContainer.classList.add("alarm-container");
    let alarmDetails = document.createElement("div");
    alarmDetails.classList.add("alarm-details");
    let label = document.createElement("div");
    label.classList.add("alarm-label");
    label.innerText = alarmLabel;
    let time = document.createElement("div");
    time.classList.add("alarm-time");
    time.innerText = Time;
    alarmDetails.appendChild(label);
    alarmDetails.appendChild(time);

    // create delete button
    const deleteButton = document.createElement("div");
    deleteButton.classList.add("alarm-delete");

    deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    // on click event for each delete icon
    deleteButton.addEventListener("click", () => deleteAlarm(index));

    liContainer.appendChild(alarmDetails);
    liContainer.appendChild(deleteButton);

    listItem.appendChild(liContainer);
    // re render the list
    alarmList.appendChild(listItem);
  });
}

// Add alarm
function addAlarm(time, label) {
  const alarm = time + "|" + label;
  alarms.push(alarm);
  localStorage.setItem("alarms", JSON.stringify(alarms));
  renderAlarms();
}

// Handle form submission
alarmForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const alarmTime = document.getElementById("alarmTime").value;
  const alarmLabel = document.getElementById("alarmLabel").value;
  addAlarm(alarmTime, alarmLabel);
  alarmForm.reset();
  removeEffects();
  checkIsEmpty();
});

// Initial rendering of alarms
renderAlarms();

// Delete alarm
function deleteAlarm(index) {
  alarms.splice(index, 1);
  localStorage.setItem("alarms", JSON.stringify(alarms));
  renderAlarms();
  checkIsEmpty();
}

const noAlarm = document.getElementById("no-alarm");

// check if any alarm is scheduled or not
function checkIsEmpty() {
  if (alarms.length > 0) {
    noAlarm.classList.add("hide");
  } else {
    noAlarm.classList.remove("hide");
  }
}

checkIsEmpty();

const addAlarmButton = document.querySelector(".alarm-add");
const alarmSetContainer = document.querySelector(".alarm-set-container");
const allAlarms = document.querySelector("#alarmList");

addAlarmButton.addEventListener("click", function () {
  alarmSetContainer.classList.remove("hide");
  addAlarmButton.classList.add("hide");
  allAlarms.classList.add("blur");
});
const cancelAlarmButton = document.getElementById("cancel-alarm");
cancelAlarmButton.addEventListener("click", removeEffects);

// remove the blurry effect and show alarm button

function removeEffects() {
  alarmSetContainer.classList.add("hide");
  addAlarmButton.classList.remove("hide");
  allAlarms.classList.remove("blur");
}
