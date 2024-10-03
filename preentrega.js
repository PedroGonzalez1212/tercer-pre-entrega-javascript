// Obtener elementos del DOM
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('task');
const taskList = document.getElementById('taskList');

// Cargar las tareas almacenadas en el localStorage al cargar la página
document.addEventListener('DOMContentLoaded', loadTasks);

// Manejo del evento de envío del formulario
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevenir que el formulario se envíe por defecto
    
    // Obtener el valor del input y crear una nueva tarea
    const taskText = taskInput.value;
    if (taskText === '') return;

    const newTask = {
        id: Date.now(),
        text: taskText
    };

    // Agregar la tarea al DOM y al almacenamiento
    addTaskToDOM(newTask);
    saveTaskToStorage(newTask);

    // Limpiar el input
    taskInput.value = '';
});

// Función para agregar una tarea al DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.setAttribute('data-id', task.id);

    // Botón para eliminar la tarea
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
        removeTaskFromDOM(task.id);
        removeTaskFromStorage(task.id);
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Función para guardar una tarea en localStorage
function saveTaskToStorage(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar las tareas desde localStorage
function loadTasks() {
    let tasks = getTasksFromStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

// Función para obtener las tareas desde localStorage
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Función para eliminar una tarea del DOM
function removeTaskFromDOM(taskId) {
    const taskItem = document.querySelector(`li[data-id="${taskId}"]`);
    if (taskItem) {
        taskList.removeChild(taskItem);
    }
}

// Función para eliminar una tarea del localStorage
function removeTaskFromStorage(taskId) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
