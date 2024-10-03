let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

window.onload = () => {
  renderTasks();
};

// Function to add a new task
function addTask() {
  const taskName = document.getElementById('taskName').value;
  const taskDateTime = document.getElementById('taskDateTime').value;

  if (taskName === "" || taskDateTime === "") {
    alert('Please fill in both fields.');
    return;
  }

  const task = {
    name: taskName,
    dateTime: taskDateTime,
    completed: false
  };

  taskList.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskList));

  renderTasks();
  document.getElementById('taskName').value = '';
  document.getElementById('taskDateTime').value = '';
}

// Function to render all tasks
function renderTasks() {
  const taskListElement = document.getElementById('taskList');
  taskListElement.innerHTML = '';

  taskList.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task ${task.completed ? 'completed' : ''}`;

    const taskContent = document.createElement('div');
    taskContent.innerHTML = `<strong>${task.name}</strong><br/><small>${task.dateTime}</small>`;
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('task-buttons');
    
    const completeButton = document.createElement('button');
    completeButton.innerText = task.completed ? 'Undo' : 'Complete';
    completeButton.classList.add('complete');
    completeButton.onclick = () => toggleCompleteTask(index);
    
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.classList.add('edit');
    editButton.onclick = () => editTask(index);
    
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = () => deleteTask(index);
    
    buttonsDiv.appendChild(completeButton);
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);
    
    li.appendChild(taskContent);
    li.appendChild(buttonsDiv);
    
    taskListElement.appendChild(li);
  });
}

// Function to toggle task completion
function toggleCompleteTask(index) {
  taskList[index].completed = !taskList[index].completed;
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTasks();
}

// Function to edit a task
function editTask(index) {
  const newName = prompt('Edit Task:', taskList[index].name);
  const newDateTime = prompt('Edit Date & Time:', taskList[index].dateTime);

  if (newName !== null && newDateTime !== null) {
    taskList[index].name = newName;
    taskList[index].dateTime = newDateTime;
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    taskList.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTasks();
  }
}
