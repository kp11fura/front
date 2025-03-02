document.addEventListener('DOMContentLoaded', function () {
    const imgTaskAdd = document.getElementById("img-post-task");
    imgTaskAdd.addEventListener('click', function () {
        createTask();
    });

    getTasks();
}, false);

const mockapiURL = "https://678caea6f067bf9e24e7ed3e.mockapi.io/task";

function getTasks() {
    const container = document.getElementById("task-container");
    fetch(mockapiURL, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).then(tasks => {
        container.innerHTML = ''; 
        tasks.forEach(task => {
            const taskName = task["name"];
            const taskId = task["id"];
            const isCompleted = task["is_completed"];

            const li = document.createElement("li");
            li.classList += "custom-shadow flex justify-between items-center mt-3 my-1 px-5 py-1 w-full text-black text-xl rounded-lg shape-change-effect";
            if (isCompleted) {
                li.classList.add("completed-task"); 
            }
            li.innerHTML = `
                <span class="text-lg">${taskName}</span>
                <div class="flex gap-4 img-set">
                    ${isCompleted ? '' : `<img src="./images/check.svg" alt="Complete" data-id="${taskId}" class="complete-btn cursor-pointer w-8 h-8 duration-300 hover:scale-125">`}
                    <img src="./images/Edit.svg" alt="Edit" class="cursor-pointer w-8 h-8 duration-300 hover:scale-125">
                    <img src="./images/Trash.svg" alt="Delete" data-id="${taskId}" class="delete-btn cursor-pointer w-8 h-8 duration-300 hover:scale-125">
                </div>`;
            container.appendChild(li);
        });

        addEventListeners(); 
    }).catch(error => {
        console.error();
    });
}

function createTask() {
    const inputTask = document.getElementById("input-post-task");
    const date = new Date();
    const newTask = {
        name: inputTask.value,
        is_completed: false,
        created: date.toISOString()
    };

    fetch(mockapiURL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newTask)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).then(task => {
        inputTask.value = ""; 
        getTasks(); 
    }).catch(error => {
        console.error();
    });
}

function deleteTask(taskId) {
    fetch(`${mockapiURL}/${taskId}`, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            getTasks(); 
        }
    }).catch(error => {
        console.error();
    });
}

function completeTask(taskId) {
    fetch(`${mockapiURL}/${taskId}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ is_completed: true })
    }).then(res => {
        if (res.ok) {
            getTasks(); 
        }
    }).catch(error => {
        console.error();
    });
}

function addEventListeners() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const taskId = this.getAttribute('data-id');
            deleteTask(taskId);
        });
    });

    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const taskId = this.getAttribute('data-id');
            completeTask(taskId);
        });
    });
}