let form = document.querySelector("#new-task-form");
let input = document.querySelector("#new-task-input");
let listEl = document.querySelector("#tasks");

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const taskText = input.value;
    if (!taskText) {
        alert("Please fill out the task!");
        return;
    }

    // Create the HTML structure for a new task
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

    // Insert the new task HTML into the tasks list
    listEl.innerHTML += taskHtml;

    // Reset the input field
    input.value = '';

    // Add event listeners for edit and delete buttons to all tasks
    const taskEls = listEl.querySelectorAll('.task');
    taskEls.forEach(function(taskEl) {
        const editButton = taskEl.querySelector('.edit');
        const deleteButton = taskEl.querySelector('.delete');
        const completedTask = taskEl.querySelector('.completed-task');

        editButton.addEventListener('click', function() {
            // Toggle between edit and save 
            if (editButton.textContent === 'Edit') {
                taskEl.querySelector('.text').readOnly = false;
                editButton.textContent = 'Save';
            } else {
                taskEl.querySelector('.text').readOnly = true;
                editButton.textContent = 'Edit';
            }
        });

        deleteButton.addEventListener('click', function() {
            taskEl.remove();
        });

        completedTask.addEventListener('change', function() {
            // Change the background color to mark task as completed
            if (completedTask.checked) {
                taskEl.querySelector('.text').style.backgroundColor = 'green';
            } else {
                taskEl.querySelector('.text').style.backgroundColor = ''; // Reset the background color
            }
        });
    });
});
// let form = document.querySelector("#new-task-form");
// let input = document.querySelector("#new-task-input");
// let listEl = document.querySelector("#tasks");

// form.addEventListener('submit', function(e) {
//     e.preventDefault();

//     const taskText = input.value;
//     if (!taskText) {
//         alert("Please fill out the task!");
//         return;
//     }

//     // Create the HTML structure for a new task
//     const taskHtml = `
//         <div class="task">
//             <div class="content">
//                 <input type="checkbox" class="completed-task">
//                 <input type="text" class="text" value="${taskText}" readonly>
//             </div>
//             <div class="actions">
//                 <button class="edit">Edit</button>
//                 <button class="delete">Delete</button>
//             </div>
//         </div>
//     `;

//     // Insert the new task HTML into the tasks list
//     listEl.innerHTML += taskHtml;

//     // Reset the input field
//     input.value = '';

//     // Add event listeners for edit and delete buttons to all tasks
//     const taskEls = listEl.querySelectorAll('.task');
//     taskEls.forEach(function(taskEl) {
//         const editButton = taskEl.querySelector('.edit');
//         const deleteButton = taskEl.querySelector('.delete');
//         const completedTask = taskEl.querySelector('.completed-task');

//         editButton.addEventListener('click', function() {
//             // Toggle between edit and save 
//             if (editButton.textContent === 'Edit') {
//                 taskEl.querySelector('.text').readOnly = false;
//                 editButton.textContent = 'Save';
//             } else {
//                 taskEl.querySelector('.text').readOnly = true;
//                 editButton.textContent = 'Edit';
//             }
//         });

//         deleteButton.addEventListener('click', function() {
//             taskEl.remove();
//         });

//         completedTask.addEventListener('change', function() {
//             // Change the background color to mark task as completed
//             if (completedTask.checked) {
//                 taskEl.querySelector('.text').style.backgroundColor = 'green';
//             } else {
//                 taskEl.querySelector('.text').style.backgroundColor = ''; // Reset the background color
//             }
//         });
//     });
// });
