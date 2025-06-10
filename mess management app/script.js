let menu = { breakfast: "", lunch: "", dinner: "" };
let attendance = { breakfast: [], lunch: [], dinner: [] };
let wasteData = [];
let selectedLogin = "";
let loginTimestamps = {};

function showLogin(type) {
  selectedLogin = type;
  document.getElementById("login-selection").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
  document.getElementById("student-name").style.display = type === "student" ? "block" : "none";
}

function goBack() {
  selectedLogin = "";
  document.getElementById("password").value = "";
  document.getElementById("student-name").value = "";
  document.getElementById("login-selection").classList.remove("hidden");
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("student-panel").classList.add("hidden");
  document.getElementById("admin-panel").classList.add("hidden");
  document.querySelectorAll('.admin-box').forEach(box => box.classList.add('hidden'));
}

function login() {
  const pwd = document.getElementById("password").value;
  const name = document.getElementById("student-name").value;

  if (selectedLogin === "student" && pwd === "0000" && name) {
    const now = new Date();
    const lastLogin = loginTimestamps[name];
    if (lastLogin && now - lastLogin < 4 * 60 * 60 * 1000) {
      alert("You can log in only once every 4 hours.");
      return;
    }
    loginTimestamps[name] = now;
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("student-panel").classList.remove("hidden");
    document.getElementById("student-greet-name").innerText = name;
  } else if (selectedLogin === "admin" && pwd === "1111") {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("admin-panel").classList.remove("hidden");
    updateAttendanceView();
    updateWasteSummary();
  } else {
    alert("Incorrect password or missing name!");
  }
}

function markAttendance(meal) {
  const name = document.getElementById("student-name").value;
  if (!attendance[meal].includes(name)) {
    attendance[meal].push(name);
    alert(`${meal} attendance marked for ${name}`);
    updateAttendanceView();
  } else {
    alert("Already marked!");
  }
}

function updateAttendanceView() {
  ["breakfast", "lunch", "dinner"].forEach(meal => {
    document.getElementById(`list-${meal}`).innerText = attendance[meal].join(", ");
    document.getElementById(`count-${meal}`).innerText = attendance[meal].length;
  });
}

function updateMenu() {
  menu.breakfast = document.getElementById("input-breakfast").value;
  menu.lunch = document.getElementById("input-lunch").value;
  menu.dinner = document.getElementById("input-dinner").value;
  document.getElementById("menu-breakfast").innerText = menu.breakfast;
  document.getElementById("menu-lunch").innerText = menu.lunch;
  document.getElementById("menu-dinner").innerText = menu.dinner;
  alert("Menu updated!");
}

function sendFoodMessage() {
  const number = document.getElementById("contact-number").value;
  if (number.length >= 8) {
    alert(`Message sent to ${number}: "Food is available, please collect it."`);
  } else {
    alert("Enter a valid number!");
  }
}

function updateWaste() {
  const bf = parseFloat(document.getElementById("waste-breakfast").value) || 0;
  const lunch = parseFloat(document.getElementById("waste-lunch").value) || 0;
  const dinner = parseFloat(document.getElementById("waste-dinner").value) || 0;
  const total = bf + lunch + dinner;
  wasteData.push(total);
  document.getElementById("total-waste-today").innerText = total.toFixed(2);
  updateWasteSummary();
}

function updateWasteSummary() {
  const sum = wasteData.reduce((a, b) => a + b, 0);
  document.getElementById("weekly-waste").innerText = sum.toFixed(2);
}

function updateDateTime() {
  document.getElementById("datetime").innerText = new Date().toLocaleString();
}

function showAdminSection(section) {
  document.querySelectorAll('.admin-box').forEach(box => box.classList.add('hidden'));
  document.getElementById(`admin-${section}`).classList.remove('hidden');
}

setInterval(updateDateTime, 1000);
updateDateTime();
