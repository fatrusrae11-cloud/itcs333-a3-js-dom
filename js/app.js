
(function () {

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const error = document.getElementById("error-msg");
  const counter = document.getElementById("counter");

  let filter = "all";

  // Add a new task
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const task = input.value.trim();

    if (task === "") {
      error.classList.remove("hidden");
      return;
    }

    error.classList.add("hidden");

    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    span.textContent = task;
    span.classList.add("item-text");

    button.textContent = "Delete";
    button.classList.add("delete-btn");
    button.type = "button";

    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);

    input.value = "";

    updateCounter();
    applyFilter();
  });

  // Event delegation
  list.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-btn")) {
      event.target.parentElement.remove();
    }

    else if (event.target.classList.contains("item-text")) {
      event.target.parentElement.classList.toggle("completed");
    }

    updateCounter();
    applyFilter();
  });

  // Update counter
  function updateCounter() {
    const items = list.querySelectorAll("li");
    let count = 0;

    items.forEach(function (item) {
      if (!item.classList.contains("completed")) {
        count++;
      }
    });

    counter.textContent = count + (count === 1 ? " item left" : " items left");
  }

  // Filter tasks
  function applyFilter() {
    const items = list.querySelectorAll("li");

    items.forEach(function (item) {
      const done = item.classList.contains("completed");

      if (filter === "all") {
        item.style.display = "";
      }
      else if (filter === "active") {
        item.style.display = done ? "none" : "";
      }
      else {
        item.style.display = done ? "" : "none";
      }
    });
  }

  // Filter buttons
  document.getElementById("filter-all").addEventListener("click", function () {
    filter = "all";
    applyFilter();
  });

  document.getElementById("filter-active").addEventListener("click", function () {
    filter = "active";
    applyFilter();
  });

  document.getElementById("filter-done").addEventListener("click", function () {
    filter = "done";
    applyFilter();
  });

  updateCounter();

})();
