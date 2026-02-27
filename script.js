const dashboard = document.getElementById('dashboard');

const time = document.createElement('section');
time.classList.add('time');
const clock = document.createElement('h1');
const date = document.createElement('h2');
time.append(clock, date);

const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dayName = days[now.getDay()];
    const day = now.getDate().toString().padStart(2,'0');
    const month = months[now.getMonth()];

    clock.textContent = `${hours}:${minutes}`;
    date.textContent = `${dayName}, ${day} ${month}`;
};
updateClock();
setInterval(updateClock, 1000);

let tasksData = [];

const loadTasks = () => {
    const saved = localStorage.getItem("tasks");
    if (saved) tasksData = JSON.parse(saved);
};
loadTasks();

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasksData));
};

const tasks = document.createElement('section');
tasks.classList.add('tasks');

const toDo = document.createElement('h2');
toDo.textContent = 'To-Do-List:';

const inputField = document.createElement('section');
inputField.classList.add('inputSect');

const toDoInput = document.createElement('input');
toDoInput.placeholder = 'Enter task here...';
toDoInput.type = 'text';

const addTaskBtn = document.createElement('button');
addTaskBtn.textContent = '+Add';

inputField.append(toDoInput, addTaskBtn);

const taskList = document.createElement('ul');
tasks.append(toDo, inputField, taskList);

const renderTasks = () => {
    taskList.innerHTML = '';

    tasksData.forEach((task, index) => {
        const li = document.createElement('li');

        const taskName = document.createElement('section');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        const taskText = document.createElement('p');
        taskText.textContent = task.text;
        taskText.classList.add('taskPara');
        if(task.completed) taskText.classList.add('checked');

        taskName.append(checkbox, taskText);

        const taskDelBtn = document.createElement('button');
        taskDelBtn.classList.add('taskDelBtn');

        li.append(taskName, taskDelBtn);
        taskList.appendChild(li);

        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            taskText.classList.toggle('checked', checkbox.checked);
            saveTasks();
        });

        taskDelBtn.addEventListener('click', () => {
            tasksData.splice(index, 1);
            saveTasks();
            renderTasks();
        });
    });

    saveTasks();
};

addTaskBtn.addEventListener('click', () => {
    const text = toDoInput.value.trim();
    if(!text) return;

    tasksData.push({ text: text, completed: false });
    toDoInput.value = '';
    renderTasks();
});

renderTasks();

const myFocus = document.createElement('section');
myFocus.classList.add('focus');

const motivate = document.createElement('section');
motivate.classList.add('motivate');

dashboard.append(time, tasks, myFocus, motivate);

const themeBtn = document.querySelector('.themeBtn');
const toggleTheme = () => {
    themeBtn.classList.toggle('dark');
    document.body.classList.toggle('dark');
};
themeBtn.addEventListener('click', toggleTheme);