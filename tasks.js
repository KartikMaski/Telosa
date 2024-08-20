// Load checkbox states from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = localStorage.getItem(checkbox.id) === 'true';
        if (checkbox.checked) {
            checkbox.nextElementSibling.classList.add('checked');
        }
    });
    Counters();
});

// Function to handle checkbox click events
function handleCheckboxClick(event) {
    const checkbox = event.target;
    const label = checkbox.nextElementSibling;
    
    if (checkbox.checked) {
        // Confirmation before marking as complete
        if (!confirm('Are you sure you want to mark this task as complete?')) {
            checkbox.checked = false;
            label.classList.remove('checked');
            return;
        }
    }

    // Update label appearance based on checkbox state
    if (checkbox.checked) {
        label.classList.add('checked');
    } else {
        label.classList.remove('checked');
    }

    localStorage.setItem(checkbox.id, checkbox.checked);

    
    Counters();

    console.log('Checkbox state:', checkbox.checked, '- Task:', label.textContent);
}

// Function to update task counters
function Counters() {
    const totalIncomplete = document.querySelectorAll('#incomplete-tasks .element input[type="checkbox"]:not(:checked)').length;
    const totalComplete = document.querySelectorAll('#complete-tasks .element1 input[type="checkbox"]:checked').length;

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

// Add event listeners to checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('click', handleCheckboxClick);
});



// tasks.js
document.addEventListener('DOMContentLoaded', function() {
    // Function to add a new task
    window.addTask = function() {
        const taskInput = document.getElementById('task-input');
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        // Create new task element
        const newTaskElement = document.createElement('div');
        newTaskElement.className = 'element';

        newTaskElement.innerHTML = `
            <input type="checkbox" style="margin-left: 21px; margin-right: 10px;" />
            <label>${taskText}</label>
            <p class="detail" style="margin-top: 0px; margin-left: 49px; margin-bottom: 6px;"><i class="fa-solid fa-list"></i>General</p>
        `;

        // Add the new task to the incomplete tasks section
        document.getElementById('incomplete-tasks').appendChild(newTaskElement);

        // Clear the input field
        taskInput.value = '';
    };
});
