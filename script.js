let todoList = localStorage.getItem('todoList') ? localStorage.getItem('todoList').split(',').filter(task => task.trim() !== '') : [];
let dueDate =  localStorage.getItem('dueDate') ? localStorage.getItem('dueDate').split(',').filter(task => task.trim() !== '') : [];
// console.log(todoList);
// localStorage.clear()
let  inputElement = document.querySelector("#task-input");
let dateElement = document.querySelector("#date-input");
displayTasks();

function addTask() {
    let newTask = inputElement.value;
    let date = dateElement.value;
    if (newTask.trim() !== "" && date.trim() !== "") {
        // Add new task and date to their respective arrays
        todoList.push(newTask.trim());
        dueDate.push(date.trim());
        
        // Update localStorage with the updated arrays
        localStorage.setItem("todoList", todoList.join(',')); // Convert array to a comma-separated string
        localStorage.setItem("dueDate", dueDate.join(','));   // Convert array to a comma-separated string

        console.log(todoList);
        console.log(dueDate);
        console.log(localStorage.getItem('todoList'));
        console.log(localStorage.getItem('dueDate'));

        // Clear input fields
        inputElement.value = '';
        dateElement.value = '';
    } else {
        console.log("Empty task or date cannot be added");
    }

    displayTasks();
}


// functionality to add task when someone clicks enter
inputElement.addEventListener("keydown",function(event){
    if(event.key === 'Enter')
    {
        event.preventDefault();
        // addTask();
        document.querySelector('#task-add-button').click();
    }
})

dateElement.addEventListener("keydown",function(event){
    if(event.key === 'Enter')
    {
        event.preventDefault();
        // addTask();
        document.querySelector('#task-add-button').click();
    }
})


function displayTasks() 
{
    let taskContainer = document.querySelector(".task-list");
    // taskContainer.innerHTML = ""; // Clear previous content
    
    if (todoList.length === 0 ) 
    {
        let noTaskMessage = `<p class="noTask pending-task" style="width:100%;">
        No pending tasks to show
        </p>`;
        // document.querySelector('.task-container').innerHTML = noTaskMessage;
        taskContainer.innerHTML = noTaskMessage;
        // return;
    }

    else{
        let newHtml = '';
        taskContainer.innerHTML = "";
        for (let i = 0; i < todoList.length; i++) {
            newHtml += `<div class="task-container" data-index="${i}">
                            <p class="task pending-task">${todoList[i]}</p><span class='due-date'>Due: ${dueDate[i]}</span>
                            <button class="delete-button"  onclick="deleteTask(${i})">Delete</button>
                        </div>`;
        }
    
        taskContainer.innerHTML = newHtml;

    }

}
        
function deleteTask(i) {
    todoList.splice(i, 1); // Remove task at index i
    dueDate.splice(i, 1); // Remove corresponding due date

    // Update localStorage with the modified arrays
    localStorage.setItem("todoList", todoList.join(','));
    localStorage.setItem("dueDate", dueDate.join(','));

    displayTasks();
}


