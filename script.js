const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");


let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", function(e){
     e.preventDefault();
    //  console.log("data");
     addTodo();
})

function addTodo (){
    let todoText = todoInput.value.trim();
    if(todoText.length > 0){
      const todoObject = {
           text:todoText,
           complete: false,
      }
      todoText = todoText.charAt(0).toUpperCase() + todoText.slice(1);
      allTodos.push(todoObject);
      updateTodoList();
      saveTodos();
      todoInput.value = "";
    }
}

function updateTodoList (){
     todoList.innerHTML = "";
     allTodos.forEach((todo,index)=>{
          todoItem = createTodoItem(todo,index);
          todoList.append(todoItem);
     })
}

function createTodoItem (todo,index) {
     const todoId = "todo-" + index;
      const todoLI = document.createElement('li');
      const todoText = todo.text;
      todoLI.className = 'todo';
      todoLI.innerHTML = `
       <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
      `
      const deleteButton = todoLI.querySelector('.delete-button');
      deleteButton.addEventListener('click', ()=>{
          deleteTodoItem(index);
      })
      const checkBox = todoLI.querySelector("input");
      checkBox.addEventListener('change',()=>{
        allTodos[index].completed = checkBox.checked;
        saveTodos();
      })
      return todoLI;
}

function deleteTodoItem (index){
     allTodos = allTodos.filter((_, i)=> i !== index);
     saveTodos();
     updateTodoList();
}


function saveTodos () {
   const todosJson = JSON.stringify(allTodos);
   localStorage.setItem("todos", todosJson);

}

function getTodos (){
    const todos = localStorage.getItem("todos") || '[]';
    return JSON.parse(todos);
}