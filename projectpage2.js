document.addEventListener("DOMContentLoaded", function () {
    let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
    let ul = document.getElementById("doneTasksList");

    doneTasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = `task: ${task.task} - روزها: ${task.days}`;
        ul.appendChild(li);
    });
});

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    doc.text("report of tasks", 10, 10);

    let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
    let y = 20;
    doneTasks.forEach(task => {
        doc.text(`task: ${task.task} - days : ${task.days}`, 10, y);
        y += 10;
    });

    doc.save("done_tasks_report.pdf");
}
function goback(){
    window.location.href = "p.html";
}