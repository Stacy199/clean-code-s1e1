const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".button__form");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createNewTaskElement = function(taskString) {
    const listItem = document.createElement("li");
    listItem.className = "todo_list__item";

    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = "todo_list__task input_form";
    checkBox.type = "checkbox";
    checkBox.className = "todo_list__checkbox";
    editInput.type = "text";
    editInput.className = "input_form__task";
    editInput.style.display = "none";
    editButton.innerText = "Edit";
    editButton.className = "button__form";

    deleteButtonImg.className = "button__img_delete";
    deleteButtonImg.setAttribute('alt', 'Delete task');
    deleteButton.className = "button__form button__form_delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

const addTask = function() {
    console.log("Add task...");

    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

const editTask = function() {
    console.log("Edit task...");
    console.log("Change 'edit' to 'save'");

    const listItem = this.parentNode;
    const editInput = listItem.querySelector("input[type=text]");
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".button__form");
    const containsClass = listItem.classList.contains("form__edit_mode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("form__edit_mode");
};

const deleteTask = function() {
    console.log("Delete task...");

    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
}

const taskCompleted = function() {
    console.log("Complete task...");
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
    console.log("Incomplete Task...");
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}
const ajaxRequest=function(){
    console.log("AJAX Request");
}
addButton.onclick=addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");
    
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.button__form");
    const deleteButton = taskListItem.querySelector("button.button__form_delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}