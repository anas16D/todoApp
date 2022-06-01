//selectors

const todoInput = document.getElementById("todoInput");
const todoButton = document.getElementById("todoButton");
const todoList = document.getElementById("todoList");
const filterOption = document.querySelector(".filter-todos");

//event listner

todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", taskAction);
filterOption.addEventListener("click", filter);
document.addEventListener("DOMContentLoaded", getTodosOfLocalStorage);


//function

function addToDo(e)
{
    e.preventDefault();
    //console.log(e);
    //document.write("Hellllo");

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.classList.add("todoItem");
    const task = document.getElementById("todoInput").value;
    newTodo.innerText = task;
    document.getElementById("todoInput").value = "";

    todoDiv.appendChild(newTodo);

    //save in local storage
    saveLocalStorage(task);

    const doneButton = document.createElement("button");
    doneButton.innerText = "Done";
    doneButton.classList.add("doneButton");
    todoDiv.appendChild(doneButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("deleteButton");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);



}


function taskAction(e)
{
    const item = e.target;

    //delete item
    if(item.classList[0] == "deleteButton")
    {
        const task = item.parentElement;


        removeTodosOfLocalStorage(task.children[0].innerText);

        task.remove();
    }

    //complete item
    if(item.classList[0] === "doneButton")
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        
        const task = todo.children[0].innerText;

        let todos = JSON.parse(localStorage.getItem("todos"));

        if(todo.classList[1] == "completed")
        {
            todos[task] = "Undone"
            item.innerText = "Undone";
        }
        else
        {
            todos[task] = "Done";
            item.innerText = "Done";
        }

        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

function filter(e)
{
    console.log(todoList);

    //const todos = todoList.childNodes;
    const todos =todoList.children
    console.log(todos);

    [...todos].forEach(function(todo){
        console.log(e.target.value);
        console.log(todo);
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
                if(todo.classList.contains("completed"))
                {
                    todo.style.display = "flex";
                }
                else
                {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if(todo.classList.contains("completed"))
                {
                    todo.style.display = "none";
                }
                else
                {
                    todo.style.display = "flex";
                }
                break;

            default:
                break;
        }
    })
}

//store todo value to local storage 
function saveLocalStorage(todo)
{
    let todos;

    if(localStorage.getItem("todos") === null)
    {
        todos = {};
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //todos.push(todo);

    todos[todo] = 'done';

    localStorage.setItem("todos", JSON.stringify(todos));
}

//get value from local storage
function getTodosOfLocalStorage()
{
    let todos;

    if(localStorage.getItem("todos") == null)
    {
        todos = {};
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    localStorage.clear();

    // todos.forEach(function(todo){
    //     document.getElementById("todoInput").value = todo;
    //     document.getElementById("todoButton").click();
    // })

    for(let task in todos)
    {
        document.getElementById("todoInput").value = task;
        document.getElementById("todoButton").click();

        // console.log(todoList.lastChild);

        if(todos[task] == "Undone")
        {
            // todoList.lastChild.classList.add("completed");
            // todoList.lastChild.children[1].innerText = "Undone";
            todoList.lastChild.children[1].click();
        }
    }


    
}

function removeTodosOfLocalStorage(todoText)
{
    let todos;

    if(localStorage.getItem("todos") == null)
    {
        todos = {};
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    // todos.forEach(function(todo){

    //     if(todoText == todo)
    //     {
            
    //     }

    // })

    // let index = todos.indexOf(todoText); 
    
    // todos.splice(index, 1);
    // console.log(todos);

    delete todos[todoText];

    localStorage.setItem("todos", JSON.stringify(todos));
}