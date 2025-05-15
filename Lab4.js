'use strict';

const taskBtn = document.querySelector('.task-run');
const taskOutput = document.querySelector('.task-result');
const taskHistory = [];

function doWork() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Работа выполнена');
    }, 2000);
  });
}

taskBtn.addEventListener('click', () => {
  doWork().then((res) => {
    taskHistory.push(res);
    taskOutput.textContent = taskHistory.join(', ');
  }).catch((err) => {
    taskOutput.textContent = `Ошибка: ${err}`;
  });
});


const randomInput = document.querySelector('.random-input');
const randomBtn = document.querySelector('.random-generate');
const randomOutput = document.querySelector('.random-result');

function getData(prob = 0.5, text) {
  const result = `Сгенерированные данные: ${text}`;
  return function (value) {
    if (typeof value === 'number' && !isNaN(value)) {
      if (Math.random() > prob) {
        return result;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
}

const fetchData = getData(0.3, 'Пример строки');

randomBtn.addEventListener('click', () => {
  const val = Number(randomInput.value);
  if (randomInput.value === '') {
    return;
  }

  const result = fetchData(val);
  randomOutput.textContent = result || 'Неверные данные';
});

randomInput.addEventListener('input', () => {
  if (randomInput.value === '') {
    randomOutput.textContent = '';
  }
});


const items = {
  log: {
    name: 'Бревно',
    craftingTime: 1000,
    requiredItems: [],
    failProbability: 0.05,
  },
  ore: {
    name: 'Руда',
    craftingTime: 2000,
    requiredItems: [],
    failProbability: 0.1,
  },
  rod: {
    name: 'Палка',
    craftingTime: 1500,
    requiredItems: ['log'],
    failProbability: 0.1,
  },
  bar: {
    name: 'Слиток',
    craftingTime: 3000,
    requiredItems: ['ore'],
    failProbability: 0.15,
  },
  tool: {
    name: 'Инструмент',
    craftingTime: 4000,
    requiredItems: ['rod', 'bar'],
    failProbability: 0.2,
  }
};

const inventory = {
  log: 0,
  ore: 0,
  rod: 0,
  bar: 0,
  tool: 0,
};

function updateInventory() {
  Object.keys(inventory).forEach((key) => {
    const count = document.querySelector(`[data-item="${key}"] .item-count`);
    if (count) {
      count.textContent = inventory[key];
    }
  });
}

function craft(key) {
  const item = items[key];
  const container = document.querySelector(`[data-item="${key}"]`);
  const status = container.querySelector('.item-status');
  const progress = container.querySelector('.item-progress');
  const button = container.querySelector('.craft-button');

  const canCraft = item.requiredItems.every(req => inventory[req] > 0);
  if (!canCraft) {
    status.textContent = 'Недостаточно ресурсов';
    return;
  }

  item.requiredItems.forEach(req => {
    inventory[req]--;
  });

  updateInventory();

  button.disabled = true;
  status.textContent = 'Создание...';
  progress.style.width = '0%';
  progress.textContent = '0%';

  const steps = 10;
  let current = 0;

  const interval = setInterval(() => {
    current++;
    const percent = Math.floor((current / steps) * 100);
    progress.style.width = `${percent}%`;
    progress.textContent = `${percent}%`;
  }, item.craftingTime / steps);

  new Promise((resolve, reject) => {
    setTimeout(() => {
      clearInterval(interval);
      if (Math.random() > item.failProbability) {
        resolve();
      } else {
        reject();
      }
    }, item.craftingTime);
  }).then(() => {
    inventory[key]++;
    updateInventory();
    status.textContent = '✅ Успешно';
  }).catch(() => {
    item.requiredItems.forEach(req => {
      inventory[req]++;
    });
    updateInventory();
    status.textContent = '❌ Неудача. Ресурсы возвращены.';
  }).finally(() => {
    button.disabled = false;
    progress.textContent = '';
  });
}

document.querySelectorAll('.craft-button').forEach((btn) => {
  const parent = btn.closest('.item');
  const key = parent.dataset.item;
  btn.addEventListener('click', () => craft(key));
});
