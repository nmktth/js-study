// Функционал кнопки "лайк"
const likeBtn = document.getElementById('like-btn');

function handleLikeClick() {
  this.classList.toggle('active');
  this.setAttribute('aria-pressed', this.classList.contains('active'));
}

likeBtn.addEventListener('click', handleLikeClick);

// Функционал кнопок "лайк" и "дизлайк"
const likeBtn2 = document.getElementById('like-btn-2');
const dislikeBtn = document.getElementById('dislike-btn');

function handleLikeBtn2Click() {
  toggleReaction(likeBtn2, dislikeBtn);
}

function handleDislikeBtnClick() {
  toggleReaction(dislikeBtn, likeBtn2);
}

function toggleReaction(activeBtn, inactiveBtn) {
  // Если активная кнопка уже активна - деактивируем ее
  if (activeBtn.classList.contains('active')) {
    activeBtn.classList.remove('active');
    activeBtn.setAttribute('aria-pressed', 'false');
    
    // Удаляем класс dislike только с кнопки дизлайка
    if (activeBtn === dislikeBtn) {
      activeBtn.classList.remove('dislike');
    }
  } 
  // Если активная кнопка неактивна - активируем ее и деактивируем другую
  else {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-pressed', 'true');
    
    // Добавляем класс dislike только для кнопки дизлайка
    if (activeBtn === dislikeBtn) {
      activeBtn.classList.add('dislike');
    }
    
    inactiveBtn.classList.remove('active');
    inactiveBtn.setAttribute('aria-pressed', 'false');
    
    // Удаляем класс dislike с неактивной кнопки, если это дизлайк
    if (inactiveBtn === dislikeBtn) {
      inactiveBtn.classList.remove('dislike');
    }
  }
}

likeBtn2.addEventListener('click', handleLikeBtn2Click);
dislikeBtn.addEventListener('click', handleDislikeBtnClick);

// Функционал корзины
function handleAddToCartClick() {
  const cartCounter = document.getElementById('cart-counter');
  const currentCount = parseInt(cartCounter.textContent, 10);
  cartCounter.textContent = currentCount + 1;
}

function setupCart() {
  const addToCartBtns = document.querySelectorAll('.add-to-cart');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', handleAddToCartClick);
  });
}

// Функционал сортировки
function setupSorting() {
  const sortAscBtn = document.getElementById('sort-asc');
  const sortDescBtn = document.getElementById('sort-desc');
  const sortOriginalBtn = document.getElementById('sort-original');
  const numbersList = document.getElementById('numbers-list');

  // Генерируем массив случайных чисел
  const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  let currentNumbers = [...numbers];

  // Функция отрисовки списка
  function renderNumbers() {
    // Очищаем список (без использования innerHTML)
    while (numbersList.firstChild) {
      numbersList.removeChild(numbersList.firstChild);
    }

    // Создаем новые элементы списка
    currentNumbers.forEach(num => {
      const li = document.createElement('li');
      li.textContent = num;
      numbersList.appendChild(li);
    });
  }

  function handleSortAscClick() {
    currentNumbers.sort((a, b) => a - b);
    renderNumbers();
  }

  function handleSortDescClick() {
    currentNumbers.sort((a, b) => b - a);
    renderNumbers();
  }

  function handleSortOriginalClick() {
    currentNumbers = [...numbers];
    renderNumbers();
  }

  // Инициализация при загрузке
  renderNumbers();

  // Назначаем обработчики событий для кнопок
  sortAscBtn.addEventListener('click', handleSortAscClick);
  sortDescBtn.addEventListener('click', handleSortDescClick);
  sortOriginalBtn.addEventListener('click', handleSortOriginalClick);
}

// Функционал отображения координат
function handlePointerDown(e) {
  const coordinatesDisplay = document.getElementById('coordinates');
  const targetName = e.target.tagName.toLowerCase();
  coordinatesDisplay.textContent = `X: ${e.clientX}, Y: ${e.clientY} - ${targetName}`;
}

// Инициализация всего функционала при загрузке DOM
function initialize() {
  setupCart();
  setupSorting();
  document.addEventListener('pointerdown', handlePointerDown);
}

document.addEventListener('DOMContentLoaded', initialize);