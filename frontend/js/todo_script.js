console.log("Hello From JS");

let todoCount = 0;
let completedCount = 0;
let deletedCount = 0;

document.getElementById("loader").style.display = "block";

const inputBox = document.getElementById("inputBox");
inputBox.addEventListener("keydown", function(event){
    if(event.keyCode == 13){
        createTodo(inputBox.value);
    }
});

async function createTodo(text){
    // if text is null or undefined use inputBox.value
    const todoText = text ?? inputBox.value;
    if(!todoText){
        alert("Please Enter Something!!");
        return;
    }
    let reqTitle = {
        title: todoText,
    };
    try{
        let value = await fetch("/api/todos",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(reqTitle),
        });
        value = await value.json();
        console.log("success", value);
        getAllTodos();
    }
    catch(err){
        console.log(err);
    }   
    finally{
        inputBox.value = "";
    } 
}

async function getAllCompletedTodos() {
    try {

        let completedTodos = await fetch("/api/todos/completed");
        completedTodos = await completedTodos.json();
        const completedTodosList = document.getElementById("completedTodosList");
        completedTodosList.innerHTML = null
        completedCount = completedTodos.data.length
        document.getElementById("completedCount").innerHTML = completedCount;
        completedTodos.data.forEach((el, index) => {
            let listItem = document.createElement("li")
            listItem.classList.add("list-group-item");
            let textNode = document.createTextNode(el.title);
            listItem.appendChild(textNode);
            listItem.classList.add("text-center")
            completedTodosList.appendChild(listItem);
        })


    } catch (err) {
        console.log(err);
    }
}
// getAllCompletedTodos();

async function getAllDeletedTodos() {
    try {

        let deletedTodos = await fetch("/api/todos/deleted")
        deletedTodos = await deletedTodos.json();
        const deletedTodosList = document.getElementById("deletedTodosList");
        deletedTodosList.innerHTML = null;
        deletedCount = deletedTodos.data.length;
        document.getElementById("deletedCount").innerHTML = deletedCount;
        deletedTodos.data.forEach((el, index) => {
            let listItem = document.createElement("li")
            listItem.classList.add("list-group-item");
            let textNode = document.createTextNode(el.title);
            listItem.appendChild(textNode);
            listItem.classList.add("text-center")
            deletedTodosList.appendChild(listItem);
            
        });
    }
    catch (err) {
        console.log(err);
    }
}
// getAllDeletedTodos();

async function getAllTodos(){
    try{
        const todoresult = await fetch("/api/todos");
        const todos = await todoresult.json();
        // alert(JSON.stringify(todolist));
        const todoList = document.getElementById("todoList");

            todoList.innerHTML = null
            console.log(todos);
            todoCount = todos.data.length;
            document.getElementById("todoCount").innerHTML = todoCount
            
            todos.data.forEach((el, index) => {
        
                let listItem = document.createElement("li");
                let labelItem = document.createElement("label");
                let inputItem = document.createElement("input");
                let buttonItem = document.createElement("button");

                // * CREATING THE DELETE BUTTON
                buttonItem.classList.add("btn");
                buttonItem.classList.add("btn-outline-danger");
                buttonItem.innerHTML = `<i class="fas fa-close fa-lg fa-fw"></i>`
                buttonItem.setAttribute("onclick", `deleteTodo("${el._id}")`)

                // * CREATING THE CHECKBOX
                inputItem.classList.add("form-check-input")
                inputItem.classList.add("me-1")
                inputItem.type = "checkbox";
                inputItem.value = "";
                inputItem.setAttribute("onclick", `setChecked("${el._id}")`)
                inputItem.id =`Checkbox${index}`
            
                
                // * CREATING THE TEXT LABEL
                let textNode = document.createTextNode(el.title);
                labelItem.classList.add("form-check-label");
                labelItem.setAttribute("for",`Checkbox${index}`)
                labelItem.appendChild(textNode);
                labelItem.setAttribute("data-name", `${el._id}`);

                if (el.isCompleted) {
                    labelItem.classList.add("crossed")
                    inputItem.setAttribute("checked", "true")
                }
                
                // * ADDING BOOTSTRAP CLASSES TO THE LIST ITEM <LI> TAG
                listItem.classList.add("list-group-item")
                listItem.classList.add("my-list-item")

                listItem.appendChild(inputItem);
                listItem.appendChild(labelItem);
                listItem.appendChild(buttonItem);

                todoList.appendChild(listItem);
            })
    }
    catch(err){
        console.error(err);
    }
}

// getAllTodos();

async function deleteTodo(id) {
    try {
        await fetch(`/api/todos/${id}`, {
            method: "DELETE",
        })
        getAllDeletedTodos();

    } catch (err) {
        console.log(err);
    }
}

async function setChecked(id) {
    const item = document.querySelector(`[data-name="${id}"]`);
    let isCrossed  = item.classList.contains("crossed");
    if (isCrossed) {
        
        item.classList.remove("crossed");
        let data = {
            isCompleted : false
        }
        await fetch(`/api/todos/${id}`, {
            method: "PUT",
            body : JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        })
        getAllCompletedTodos();

    } else {
        item.classList.add("crossed")
        let data = {
            isCompleted : true
        }
        await fetch(`/api/todos/${id}`, {
            method: "PUT",
            body : JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        })
        getAllCompletedTodos();
    }
    
}

fetch("/api/todos")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);

        document.getElementById("loader").style.display = "none";
        
    });

var light = true;
function setTheme(){
    if(light){
        document.documentElement.setAttribute("data-bs-theme", "dark");
        document.getElementById("themeButton").innerHTML = '<i class="fas fa-sun fa-lg fa-fw"></i>'

    }
    else{
        document.documentElement.setAttribute("data-bs-theme", "light");
        document.getElementById("themeButton").innerHTML = '<i class="fas fa-moon fa-lg fa-fw"></i>'

    }
    light = !light;
}


