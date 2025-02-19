localStorage.setItem('li', 'inputbox.value');
localStorage.getItem('li');

const myinputbox = document.getElementById("inputbox");
const taskslist = document.getElementById("tasks");
const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];

window.onload = function () {
    loadTasks();
};

function addtask() {
    if (inputbox.value === '') {
        alert("please type a task");
        return;
    }

    let selectedDays = [];
    document.querySelectorAll(".daysbox input:checked").forEach(checkbox => {
        selectedDays.push(checkbox.parentNode.textContent.trim());
    });

    if (selectedDays.length === 0) {
        alert("choose a day");
        return;
    }

    let taskData = {
        task: myinputbox.value,
        days: selectedDays
    };

    saveTaskToLocalStorage(taskData);
    addTaskTo(taskData);

    myinputbox.value = "";
    document.querySelectorAll(".daysbox input").forEach(checkbox => checkbox.checked = false);
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskTo(taskData) {
    let li = document.createElement("li");
    li.innerHTML = myinputbox.value + "<br>" + taskData.days.join(',');

    let removeButton = document.createElement("button");
    let removeIcon = document.createElement("img");
    removeIcon.src = "icons8-delete-button-64.png";
    removeIcon.alt = "Delete";
    removeIcon.style.width = "20px";
    removeIcon.style.height = "20px";
    removeButton.appendChild(removeIcon);
    removeButton.classList.add("task-button");
    removeButton.onclick = function () {
        taskslist.removeChild(li);
        removeTaskFromLocalStorage(taskData);
    };

    let doneButton = document.createElement("button");
    let doneIcon = document.createElement("img");
    doneIcon.src = "icons8-done-50.png";
    doneIcon.alt = "Done";
    doneIcon.style.width = "20px";
    doneIcon.style.height = "20px";
    doneButton.appendChild(doneIcon);
    doneButton.classList.add("task-button");

    doneButton.onclick = function () {
        li.style.textDecoration = "line-through";
        markTaskAsDone(taskData);
    };

    li.appendChild(doneButton);
    li.appendChild(removeButton);
    taskslist.appendChild(li);

    let selectedIndexes = taskData.days.map(d => days.indexOf(d));
    startTaskCountdown(li, selectedIndexes);
}

function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.task !== taskToRemove.task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function markTaskAsDone(taskData) {
    let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
    doneTasks.push(taskData);
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskTo(task));
}

function startTaskCountdown(li, days) {
    let now = new Date();
    let today = now.getDay();
    let minDiff = Math.min(...days.map(d => (d - today + 7) % 7 || 7));

    let targetDate = new Date();
    targetDate.setDate(now.getDate() + minDiff);
    targetDate.setHours(0, 0, 0, 0);

    let countdownDiv = document.createElement("div");
    li.appendChild(countdownDiv);

    let timer = setInterval(() => {
        let diff = targetDate - new Date();
        if (diff <= 0) {
            clearInterval(timer);
            countdownDiv.innerHTML = "time to do your task";
            alert("time to do task " + li.textContent.split("\n")[0]);
            return;
        }

        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownDiv.innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds";
    }, 1000);
}

function fnextpage() {
    window.location.href = "page2.html";
}
