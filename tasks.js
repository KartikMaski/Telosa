document.addEventListener('DOMContentLoaded', () => {
    // Initialize checkboxes state from local storage
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = localStorage.getItem(checkbox.id) === 'true';
        if (checkbox.checked) {
            checkbox.nextElementSibling.classList.add('checked');
            // Move checked tasks to the complete section
            document.getElementById('complete-tasks').appendChild(checkbox.parentElement);
        }
    });
    Counters();

    // Event delegation for checkbox clicks
    document.getElementById('incomplete-tasks').addEventListener('click', function(event) {
        if (event.target.type === 'checkbox') {
            CheckboxClick(event);
        }
    });

    document.getElementById('complete-tasks').addEventListener('click', function(event) {
        if (event.target.type === 'checkbox') {
            CheckboxClick(event);
        }
    });
});

// Function to handle checkbox click events
function CheckboxClick(event) {
    const checkbox = event.target;
    const label = checkbox.nextElementSibling;
    const taskElement = checkbox.parentElement;

    if (checkbox.checked) {
        if (!confirm('Are you sure you want to mark this task as complete?')) {
            checkbox.checked = false;
            label.classList.remove('checked');
            return;
        }

        // Move task to the complete section
        document.getElementById('complete-tasks').appendChild(taskElement);
    } else {
        // Move task back to the incomplete section
        document.getElementById('incomplete-tasks').appendChild(taskElement);
    }

    // Update label appearance based on checkbox state
    if (checkbox.checked) {
        label.classList.add('checked');
    } else {
        label.classList.remove('checked');
    }

    // Save checkbox state in localStorage
    localStorage.setItem(checkbox.id, checkbox.checked);

    // Update counters
    Counters();

    console.log('Checkbox state:', checkbox.checked, '- Task:', label.textContent);
}

// Function to update task counters
function Counters() {
    const totalIncomplete = document.querySelectorAll('#incomplete-tasks .element input[type="checkbox"]:not(:checked)').length;
    const totalComplete = document.querySelectorAll('#complete-tasks .element input[type="checkbox"]:checked').length;

    const incompleteCountElement = document.getElementById('incomplete-count');
    const completeCountElement = document.getElementById('complete-count');

    if (incompleteCountElement) {
        incompleteCountElement.textContent = `Incomplete: ${totalIncomplete}`;
    }

    if (completeCountElement) {
        completeCountElement.textContent = `Completed: ${totalComplete}`;
    }
}

// Function to filter tasks by status
function filterTasks(status) {
    const allTasks = document.querySelectorAll('.element, .element1');
    allTasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (status === 'all' || (status === 'complete' && checkbox.checked) || (status === 'incomplete' && !checkbox.checked)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const newTaskElement = document.createElement('div');
    newTaskElement.className = 'element';

    newTaskElement.innerHTML = `
        <input type="checkbox" style="margin-left: 21px; margin-right: 10px;" />
        <label>${taskText}</label>
        <p class="detail" style="margin-top: 0px; margin-left: 49px; margin-bottom: 6px;"><i class="fa-solid fa-list"></i>General</p>
    `;

    document.getElementById('incomplete-tasks').appendChild(newTaskElement);

    
    Counters();

    taskInput.value = '';
}
