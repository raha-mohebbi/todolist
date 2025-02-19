

const myinputbox = document.getElementById("inputbox");
const taskslist = document.getElementById("tasks");
const removebutton = document.getElementById("deletebuttonid");
const donebutton = document.getElementById("donebuttonid");
const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];

function addtask() {
    if (inputbox.value === '') {
        alert("please type a task");
        return;
    }
    localStorage.setItem('taskslist',tasklist.innerHTML);
    let selectedDays = [];
    document.querySelectorAll(".daysbox input:checked").forEach(checkbox => {
        selectedDays.push(checkbox.parentNode.textContent.trim());
    });

    if (selectedDays.length === 0) {
        alert("choose a day");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = myinputbox.value + "<br>" + selectedDays.join(',');

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
        localStorage.setItem('taskslist', taskslist.innerHTML); // ✅ ذخیره تغییرات بعد از انجام تسک**
    };
        let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
        doneTasks.push({
            task: myinputbox.value,
            days: selectedDays.join(',')
        });
        localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
    }





    li.appendChild(doneButton);
    li.appendChild(removeButton);
    taskslist.appendChild(li);
    localStorage.setItem('taskslist', taskslist.innerHTML); // ✅ ذخیره تغییرات بعد از اضافه کردن تس
    
    let selectedIndexes = selectedDays.map(d => days.indexOf(d));
    startTaskCountdown(li, selectedIndexes);

    inputbox.value = "";
    document.querySelectorAll(".daysbox input").forEach(checkbox => checkbox.checked = false);


       
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
            alert("time to do task" + li.textContent.split("\n")[0]);
            return;
        }

        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownDiv.innerHTML =  days + " روز + " + hours + " ساعت + " + minutes + " دقیقه + " + seconds + " ثانیه";
    }, 1000);
}
function fnextpage(){
    
        window.location.href = "page2.html";
}

