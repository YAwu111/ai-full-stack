const STORAGE_KEY = "momentum-todo-items";

const form = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoCategory = document.querySelector("#todoCategory");
const todoPriority = document.querySelector("#todoPriority");
const todoList = document.querySelector("#todoList");
const todoTemplate = document.querySelector("#todoItemTemplate");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

const totalCount = document.querySelector("#totalCount");
const activeCount = document.querySelector("#activeCount");
const doneCount = document.querySelector("#doneCount");
const pinnedCount = document.querySelector("#pinnedCount");
const completionRate = document.querySelector("#completionRate");
const todayLabel = document.querySelector("#todayLabel");

const initialTodos = [
  {
    id: crypto.randomUUID(),
    title: "完成 TodoList 页面视觉搭建",
    category: "工作",
    priority: "high",
    completed: false,
    pinned: true,
    createdAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    title: "整理今天最重要的三个目标",
    category: "学习",
    priority: "medium",
    completed: false,
    pinned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 36).toISOString()
  },
  {
    id: crypto.randomUUID(),
    title: "晚上散步三十分钟",
    category: "健康",
    priority: "low",
    completed: true,
    pinned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
  }
];

let todos = loadTodos();
let currentFilter = "all";
let currentKeyword = "";

// Initialize top-level UI state on first load.
renderDate();
render();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = todoInput.value.trim();
  if (!title) {
    todoInput.focus();
    return;
  }

  const nextTodo = {
    id: crypto.randomUUID(),
    title,
    category: todoCategory.value,
    priority: todoPriority.value,
    completed: false,
    pinned: false,
    createdAt: new Date().toISOString()
  };

  todos.unshift(nextTodo);
  persistTodos();
  render();
  form.reset();
  todoPriority.value = "medium";
  todoInput.focus();
});

searchInput.addEventListener("input", (event) => {
  currentKeyword = event.target.value.trim().toLowerCase();
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});

clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  persistTodos();
  render();
});

todoList.addEventListener("click", (event) => {
  const target = event.target;
  const item = target.closest(".todo-item");
  if (!item) return;

  const id = item.dataset.id;

  if (target.classList.contains("check-btn")) {
    updateTodo(id, (todo) => ({ ...todo, completed: !todo.completed }));
  }

  if (target.classList.contains("pin-btn")) {
    updateTodo(id, (todo) => ({ ...todo, pinned: !todo.pinned }));
  }

  if (target.classList.contains("delete-btn")) {
    todos = todos.filter((todo) => todo.id !== id);
    persistTodos();
    render();
  }
});

function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialTodos;

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : initialTodos;
  } catch {
    return initialTodos;
  }
}

function persistTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function updateTodo(id, updater) {
  // Keep all mutations flowing through one helper so render/persist stay consistent.
  todos = todos.map((todo) => (todo.id === id ? updater(todo) : todo));
  persistTodos();
  render();
}

function getVisibleTodos() {
  // Sort first, then apply filter/search so every view keeps the same ordering rules.
  return sortTodos(todos).filter((todo) => {
    const matchesFilter = {
      all: true,
      active: !todo.completed,
      completed: todo.completed,
      pinned: todo.pinned
    }[currentFilter];

    const keyword = currentKeyword;
    const matchesKeyword =
      !keyword ||
      todo.title.toLowerCase().includes(keyword) ||
      todo.category.toLowerCase().includes(keyword);

    return matchesFilter && matchesKeyword;
  });
}

function sortTodos(source) {
  const priorityWeight = { high: 0, medium: 1, low: 2 };

  return [...source].sort((a, b) => {
    // Pinned items stay at the top, unfinished work comes before completed work,
    // then priority and creation time decide the final order.
    if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned);
    if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed);
    if (priorityWeight[a.priority] !== priorityWeight[b.priority]) {
      return priorityWeight[a.priority] - priorityWeight[b.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

function render() {
  const visibleTodos = getVisibleTodos();
  const sortedTodos = sortTodos(todos);

  // Rebuild the list from state so the DOM always reflects the latest filters and edits.
  todoList.innerHTML = "";

  visibleTodos.forEach((todo) => {
    const fragment = todoTemplate.content.cloneNode(true);
    const item = fragment.querySelector(".todo-item");
    const title = fragment.querySelector(".todo-title");
    const category = fragment.querySelector(".category-pill");
    const priority = fragment.querySelector(".priority-pill");
    const time = fragment.querySelector(".time-pill");
    const pinBtn = fragment.querySelector(".pin-btn");

    item.dataset.id = todo.id;
    item.classList.toggle("completed", todo.completed);
    item.classList.toggle("pinned", todo.pinned);

    title.textContent = todo.title;
    category.textContent = todo.category;
    priority.textContent = getPriorityLabel(todo.priority);
    priority.dataset.priority = todo.priority;
    time.textContent = formatRelativeTime(todo.createdAt);
    pinBtn.classList.toggle("active", todo.pinned);
    pinBtn.textContent = todo.pinned ? "取消置顶" : "置顶";

    todoList.appendChild(fragment);
  });

  emptyState.hidden = visibleTodos.length > 0;
  syncStats(sortedTodos);
}

function syncStats(items) {
  // Summary cards always reflect the full dataset instead of the filtered subset.
  const total = items.length;
  const active = items.filter((todo) => !todo.completed).length;
  const done = items.filter((todo) => todo.completed).length;
  const pinned = items.filter((todo) => todo.pinned).length;
  const rate = total ? Math.round((done / total) * 100) : 0;

  totalCount.textContent = total;
  activeCount.textContent = active;
  doneCount.textContent = done;
  pinnedCount.textContent = pinned;
  completionRate.textContent = `${rate}%`;
}

function renderDate() {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long"
  });
  todayLabel.textContent = formatter.format(new Date());
}

function formatRelativeTime(value) {
  // Use lightweight relative time labels for a cleaner dashboard feel.
  const timestamp = new Date(value).getTime();
  const diff = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < hour) {
    const minutes = Math.max(1, Math.floor(diff / minute));
    return `${minutes} 分钟前`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)} 小时前`;
  }

  return `${Math.floor(diff / day)} 天前`;
}

function getPriorityLabel(priority) {
  // Separate display labels from internal values to keep sorting logic simple.
  const labels = {
    high: "高优先级",
    medium: "中优先级",
    low: "低优先级"
  };

  return labels[priority] ?? priority;
}
