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
        taskList.prepend(li);
        taskList.scrollTo({top: 0, behavior: "smooth"});

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

const music = document.createElement('section');
music.classList.add('music');

const myMusic = [
    {
        name: 'let it breathe',
        artist: 'Gunna',
        image: './images/on_of_wun'
    },
    {
        name: 'turned your back',
        artist: 'Gunna',
        image: './images/AGAAC.jpeg'
    },
    {
        name: '',
        artist: '',
        image: ''
    }
];

myMusic.forEach((song) => {
    const songWrapper = document.createElement('section');
    songWrapper.classList.add('songWrapper');

    const musicImg = document.createElement('img');
    musicImg.classList.add('songImg');
    musicImg.src = song.image;
    musicImg.alt = song.name;

    const musicNav = document.createElement('section');
    musicNav.classList.add('musicNav');

    const songName = document.createElement('h1');
    songName.textContent = song.name;

    const singer = document.createElement('h2');
    singer.textContent = song.artist;

    const musicBtns = document.createElement('p');
    musicBtns.classList.add('musicBtns');

    const musicPrev = document.createElement('button');
    musicPrev.innerHTML = '<svg height = "20px" width = "40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M556.2 541.6C544.2 546.6 530.5 543.8 521.3 534.7L352 365.3L352 512C352 524.9 344.2 536.6 332.2 541.6C320.2 546.6 306.5 543.8 297.3 534.7L128 365.3L128 512C128 529.7 113.7 544 96 544C78.3 544 64 529.7 64 512L64 128C64 110.3 78.3 96 96 96C113.7 96 128 110.3 128 128L128 274.7L297.4 105.4C306.6 96.2 320.3 93.5 332.3 98.5C344.3 103.5 352 115.1 352 128L352 274.7L521.4 105.3C530.6 96.1 544.3 93.4 556.3 98.4C568.3 103.4 576 115.1 576 128L576 512C576 524.9 568.2 536.6 556.2 541.6z"/></svg>';

    const musicPlay = document.createElement('button');
    musicPlay.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height = "20px" width = ""40px><path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"/></svg>';

    const musicNext = document.createElement('button');
    musicNext.innerHTML = '<svg height="20px" width="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M83.8 541.6C95.8 546.6 109.5 543.8 118.7 534.7L288 365.3L288 512C288 524.9 295.8 536.6 307.8 541.6C319.8 546.6 333.5 543.8 342.7 534.7L512 365.3L512 512C512 529.7 526.3 544 544 544C561.7 544 576 529.7 576 512L576 128C576 110.3 561.7 96 544 96C526.3 96 512 110.3 512 128L512 274.7L342.6 105.4C333.4 96.2 319.7 93.5 307.7 98.5C295.7 103.5 288 115.1 288 128L288 274.7L118.6 105.3C109.4 96.1 95.7 93.4 83.7 98.4C71.7 103.4 64 115.1 64 128L64 512C64 524.9 71.8 536.6 83.8 541.6z"/></svg>'

    musicBtns.append(musicPrev, musicPlay, musicNext);
    musicNav.append(songName, singer, musicBtns);
    songWrapper.append(musicImg, musicNav);
    music.appendChild(songWrapper);
});

const motivate = document.createElement('section');
motivate.classList.add('motivate');

dashboard.append(time, tasks, music, motivate);

const themeBtn = document.querySelector('.themeBtn');
const toggleTheme = () => {
    themeBtn.classList.toggle('dark');
    document.body.classList.toggle('dark');
};
themeBtn.addEventListener('click', toggleTheme);