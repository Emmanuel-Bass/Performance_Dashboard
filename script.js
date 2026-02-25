const dashboard = document.getElementById('dashboard');
const time = document.createElement('section');
time.classList.add('time');
const clock = document.createElement('h1');
const clockLine = document.createElement('hr');

const updateClock = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let day = now.getDate();

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dayName = days[now.getDay()];
    day = day.toString().padStart(2, '0');
    let month = months[now.getMonth()];

    const timeString = `${hours}:${minutes}:${seconds}`;
    const dayString = `${dayName}, ${day} ${month}`;

    clock.textContent = timeString;
    date.textContent = dayString;
};

const date = document.createElement('h2');
time.append(clock, clockLine, date);
updateClock();
setInterval(updateClock, 1000);

const tasks = document.createElement('section');
tasks.classList.add('tasks');
const toDo = document.createElement('h2');
toDo.textContent = 'To-Do-List:';
const inputField = document.createElement('section');
inputField.classList.add('inputSect')
const toDoInput = document.createElement('input');
toDoInput.type = 'text';
const addTaskBtn = document.createElement('button');
addTaskBtn.textContent = '+Add';
inputField.append(toDoInput, addTaskBtn)
const taskList = document.createElement('ul');
const taskFullBtn = document.createElement('button');
taskFullBtn.textContent = 'See fullscreen';
taskFullBtn.classList.add('fullscreenBtn');
tasks.append(toDo, inputField, taskList, taskFullBtn);

const addTasks = () => {
    const taskText = toDoInput.value;
    if (!taskText) return;

    const taskItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const taskPara = document.createElement('p');
    taskPara.textContent = taskText;
    taskItem.append(checkbox, taskPara);
    taskList.appendChild(taskItem);
    toDoInput.value = '';
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskPara.style.textDecoration = 'line-through';
            taskPara.style.color = 'grey';
        } else {
            taskPara.style.textDecoration = 'none';
            taskPara.style.color = '#2c2c2c';
        }
    })
}
addTaskBtn.addEventListener('click', addTasks);

const applyFull = () => {
    tasks.classList.add('fullscreen');
    document.body.style.overflow = 'hidden';
};

taskFullBtn.addEventListener('click', applyFull);

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