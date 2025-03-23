import { Todos } from "./class/Todos.js";
const list = document.querySelector("ul");
const input = document.querySelector("input");
const BACKEND_URL = "https://tudo-web.onrender.com";
const todos = new Todos(BACKEND_URL);

input.disabled = true;

const renderSpan = (li, text) => {
  const span = li.appendChild(document.createElement("span"));
  span.innerHTML = text;
};
const renderLink = (li, id) => {
  const a = li.appendChild(document.createElement("a"));
  a.innerHTML = '<i class="bi bi-trash"></i>';
  a.setAttribute("style", "float: right");
  a.addEventListener("click", () => {
    todos
      .removeTask(id)
      .then((id) => {
        const li_to_remove = document.querySelector(`[data-key="${id}"]`);
        if (li_to_remove) {
          list.removeChild(li_to_remove);
        }
      })
      .catch((error) => {
        alert("Failed in deleting task", error.message);
      });
  });
};
const renderTask = (task) => {
  const li = document.createElement("li");
  li.setAttribute("class", "list-group-item");
  li.setAttribute("data-key", task.getId());
  renderLink(li, task.getId());
  renderSpan(li, task.getText());
  list.append(li);
};

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const task = input.value.trim();
    if (task !== "") {
      todos
        .addTask(task)
        .then((task) => {
          renderTask(task);
          input.value = "";
          input.focus();
        })
        .catch((error) => {
          alert("Error adding a new task", error.message);
        });
    }
  }
});

const getTasks = () => {
  todos
    .getTasks()
    .then((tasks) => {
      tasks.forEach((task) => {
        renderTask(task);
      });
      input.disabled = false;
    })
    .catch((error) => {
      alert("Error fetching tasks", error.message);
    });
};

getTasks();
