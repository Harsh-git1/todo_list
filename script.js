document.addEventListener("DOMContentLoaded", function() {
    // Load Todo List from localStorage
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

    // Function to save Todo List to localStorage
    function saveTodoList() {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    // Function to render Todo List
    function renderTodoList() {
        // Clear existing content
        document.getElementById("todays-tasks").innerHTML = "";
        document.getElementById("future-tasks").innerHTML = "";
        document.getElementById("completed-tasks").innerHTML = "";

        // Current date
        const currentDate = new Date();

        // Loop through todoList
        todoList.forEach(function(item, index) {
            // Create todo item element
            let todoItem = document.createElement("div");
            todoItem.classList.add("todo-item");
            // Add content and buttons
            todoItem.innerHTML = `
                <div>${item.name}</div>
                <div>${item.date}</div>
                <div>${item.priority}</div>
                <button class="delete-btn" data-index="${index}">Delete</button>
                <button class="status-btn ${item.completed ? 'completed' : ''}" data-index="${index}">${item.completed ? 'Completed' : 'Not Completed'}</button>
            `;

            // Check if the item is for today
            let itemDate = new Date(item.date);
            
            if (itemDate.setHours(0,0,0,0) === currentDate.setHours(0,0,0,0)) {
                document.getElementById("todays-tasks").appendChild(todoItem);
            } else if (itemDate > currentDate) {
                document.getElementById("future-tasks").appendChild(todoItem);
            } else {
                // Check if the task is completed
                if (!item.completed) {
                    todoItem.classList.add("overdue");
                }
                document.getElementById("future-tasks").appendChild(todoItem);
            }
        });
    }

    // Add Item Functionality
    document.getElementById("add-item").addEventListener("submit", function(event) {
        event.preventDefault();
        let itemName = document.getElementById("item-name").value;
        let itemDate = document.getElementById("item-date").value;
        let itemPriority = document.getElementById("item-priority").value;

        // Add item to todoList
        todoList.push({name: itemName, date: itemDate, priority: itemPriority, completed: false});
        // Save to localStorage
        saveTodoList();
        // Render updated todoList
        renderTodoList();
        // Clear input fields
        document.getElementById("add-item").reset();
    });

    // Delete Item Functionality
    document.body.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            let index = event.target.dataset.index;
            todoList.splice(index, 1);
            saveTodoList();
            renderTodoList();
        }
    });

    // Mark Item as Completed Functionality
    document.body.addEventListener("click", function(event) {
        if (event.target.classList.contains("status-btn")) {
            let index = event.target.dataset.index;
            todoList[index].completed = !todoList[index].completed;
            saveTodoList();
            renderTodoList();
        }
    });

    // Initial rendering of Todo List
    renderTodoList();
});