let form = document.querySelector("#new-task-form");
let input = document.querySelector("#new-task-input");
let listEl = document.querySelector("#tasks");
let compTasksBtn = document.querySelector(".comp-tasks");
let allTasksBtn = document.querySelector(".all-tasks");

// array to store all tasks
let allTasksArr = [];

// array to store tasks that are marked as completed
let completedTaskArr = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskText = input.value;
    if (!taskText) {
        alert("Please fill out the task!");
        return;
    }

    // html structure for a new task
    const taskHtml = `
        <div class="task">
            <div class="content">
                <input type="checkbox" class="completed-task">
                <input type="text" class="text" value="${taskText}" readonly>
            </div>
            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        </div>
    `;

    // Inserting the new task HTML into the tasks div
    listEl.innerHTML += taskHtml;

    // Adding task to allTasksArr
    allTasksArr.push({ html: taskHtml, completed: false });
    console.log(allTasksArr);
    console.log(completedTaskArr);

    input.value = '';

    // Call the function to attach event listeners to the new task
    attachTaskEventListeners();
});

// Add event listeners for edit, delete, and completing tasks
function attachTaskEventListeners() {
    const taskEls = listEl.querySelectorAll('.task');
    for (let i = 0; i < taskEls.length; i++) {
        console.log(taskEls)
        const taskEl = taskEls[i];
        const editButton = taskEl.querySelector('.edit');
        const deleteButton = taskEl.querySelector('.delete');
        const completedTaskMark = taskEl.querySelector('.completed-task');

        editButton.addEventListener('click', function () {
            // Toggle between edit and save 
            if (editButton.textContent === 'Edit') {
                taskEl.querySelector('.text').readOnly = false;
                console.log(taskEl.querySelector('.text').value)
                editButton.textContent = 'Save';
            } else {
                taskEl.querySelector('.text').readOnly = true;
                editButton.textContent = 'Edit';
            }
        });

        deleteButton.addEventListener('click', function () {
            taskEl.remove();
        });

        completedTaskMark.addEventListener('change', function () {
            // Change the background color to mark the task as completed
            const taskIndex = Array.from(taskEls).indexOf(taskEl);
            if (completedTaskMark.checked) {
                const taskHtml = taskEl.outerHTML;
                completedTaskArr.push({ html: taskHtml, completed: true });
                taskEl.querySelector('.text').style.backgroundColor = 'green';
                allTasksArr[taskIndex].completed = true;
            } else {
                taskEl.querySelector('.text').style.backgroundColor = '';
                completedTaskArr = removeTaskFromArray(completedTaskArr, taskEl.outerHTML);
                allTasksArr[taskIndex].completed = false;
            }
        });
    }
}

function removeTaskFromArray(array, taskHtml) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].html !== taskHtml) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

compTasksBtn.addEventListener('click', function (e) {
    listEl.innerHTML = '';
    for (let i = 0; i < completedTaskArr.length; i++) {
        listEl.innerHTML += completedTaskArr[i].html;
    }
    // Attach event listeners to existing tasks
    attachTaskEventListeners();
});

allTasksBtn.addEventListener('click', function (e) {
    listEl.innerHTML = '';
    for (let i = 0; i < allTasksArr.length; i++) {
        listEl.innerHTML += allTasksArr[i].html;
    }

    // Reattach event listeners to the tasks
    attachTaskEventListeners();
});
