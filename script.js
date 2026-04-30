// 🔐 protect page
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "index.html";
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// ================= TASK FUNCTIONS =================

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("input-box").value.trim();
  if (!input) return;

  tasks.push({ text: input, done: false });
  saveTasks();

  document.getElementById("input-box").value = "";
  showTasks();
}

function showTasks() {
  let list = document.getElementById("list-container");
  if (!list) return;

  list.innerHTML = "";

  let filtered = tasks.filter(task => {
    if (currentFilter === "done") return task.done;
    if (currentFilter === "pending") return !task.done;
    return true;
  });

  if (filtered.length === 0) {
    list.innerHTML = "<p>No tasks yet 🚀</p>";
  }

  filtered.forEach((task, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask(${index})">
        ${task.done ? "✔️ " : ""}${task.text}
      </span>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    list.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  showTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
}

function filterTasks(type) {
  currentFilter = type;
  showTasks();
}

// ================= AI SUGGESTION =================

async function suggest() {
  const input = document.getElementById("input-box");
  const output = document.getElementById("ai-output");

  if (!input || !output) return;

  let text = input.value.trim();

  if (!text) {
    output.innerText = "✨ Enter a task first";
    return;
  }

  output.innerText = "🤖 Thinking...";

  try {
    let res = await fetch("https://api.adviceslip.com/advice?rand=" + Math.random());
    let data = await res.json();

    output.innerText = `"${text}" → ${data.slip.advice}`;
  } catch (err) {
    output.innerText = `Focus on "${text}" step by step 🚀`;
  }
}

// ================= LOGOUT =================

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// ================= INIT =================

document.addEventListener("DOMContentLoaded", () => {

  showTasks();

  // 🌙 DARK MODE
  const toggleBtn = document.getElementById("darkToggle");
  if (toggleBtn) {
    toggleBtn.onclick = () => {
      document.body.classList.toggle("dark");
    };
  }

  // 🤖 AUTO AI
  const inputBox = document.getElementById("input-box");
  if (inputBox) {
    inputBox.addEventListener("input", () => {
      if (inputBox.value.length > 3) {
        suggest();
      }
    });
  }

  // 🎤 VOICE COMMAND
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const micBtn = document.getElementById("micBtn");

  if (SpeechRecognition && micBtn) {
    const recognition = new SpeechRecognition();

    micBtn.onclick = () => recognition.start();

    recognition.onresult = (event) => {
      let voice = event.results[0][0].transcript.toLowerCase();

      document.getElementById("input-box").value = voice;

      if (voice.includes("add task")) {
        let task = voice.replace("add task", "").trim();
        document.getElementById("input-box").value = task;
        addTask();
      }

      else if (voice.includes("delete task")) {
        let name = voice.replace("delete task", "").trim();
        let index = tasks.findIndex(t =>
          t.text.toLowerCase().includes(name)
        );
        if (index !== -1) deleteTask(index);
      }

      else if (voice.includes("complete task")) {
        let name = voice.replace("complete task", "").trim();
        let index = tasks.findIndex(t =>
          t.text.toLowerCase().includes(name)
        );
        if (index !== -1) toggleTask(index);
      }
    };
  }

});

// 🔥 MAKE FUNCTIONS GLOBAL (for buttons)
window.addTask = addTask;
window.deleteTask = deleteTask;
window.toggleTask = toggleTask;
window.filterTasks = filterTasks;
window.suggest = suggest;
window.logout = logout;
// ✅ ENTER KEY SUPPORT (ADD THIS AT BOTTOM)
const inputBoxEnter = document.getElementById("input-box");

if (inputBoxEnter) {
  inputBoxEnter.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      addTask();
    }
  });
}
// 🌸 FLOATING EMOJIS
const emojis = ["🌸", "✨", "💖", "🌟", "🎀", "💫"];

function createEmoji() {
  const container = document.querySelector(".emoji-container");
  if (!container) return;

  const emoji = document.createElement("div");
  emoji.classList.add("emoji");

  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.fontSize = (15 + Math.random() * 20) + "px";
  emoji.style.animationDuration = (5 + Math.random() * 5) + "s";

  container.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 8000);
}

// run continuously
setInterval(createEmoji, 500);
window.suggest = suggest;
window.addTask = addTask;
window.deleteTask = deleteTask;
window.toggleTask = toggleTask;
window.filterTasks = filterTasks;
window.logout = logout;
window.addTask = addTask;
window.deleteTask = deleteTask;
window.toggleTask = toggleTask;
window.filterTasks = filterTasks;
window.logout = logout;
window.suggest = suggest;
// ✅ CONNECT BUTTONS (VERY IMPORTANT)
document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.getElementById("addBtn");
  const aiBtn = document.getElementById("aiBtn");

  if (addBtn) {
    addBtn.addEventListener("click", addTask);
  }

  if (aiBtn) {
    aiBtn.addEventListener("click", suggest);
  }

});
document.addEventListener("DOMContentLoaded", () => {

  console.log("JS Loaded ✅");

  // 🔘 BUTTON REFERENCES
  const addBtn = document.getElementById("addBtn");
  const aiBtn = document.getElementById("aiBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const allBtn = document.getElementById("allBtn");
  const doneBtn = document.getElementById("doneBtn");
  const pendingBtn = document.getElementById("pendingBtn");

  // ✅ ADD TASK
  if (addBtn) addBtn.addEventListener("click", addTask);

  // 🤖 AI
  if (aiBtn) aiBtn.addEventListener("click", suggest);

  // 🔐 LOGOUT
  if (logoutBtn) logoutBtn.addEventListener("click", logout);

  // 🔍 FILTERS
  if (allBtn) allBtn.addEventListener("click", () => filterTasks("all"));
  if (doneBtn) doneBtn.addEventListener("click", () => filterTasks("done"));
  if (pendingBtn) pendingBtn.addEventListener("click", () => filterTasks("pending"));

});

