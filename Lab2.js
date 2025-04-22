
//Like
const likeBtn = document.getElementById('like-btn');
likeBtn.addEventListener('click', toggleLike);

function toggleLike() {
  this.classList.toggle('active');
  this.setAttribute('aria-pressed', this.classList.contains('active'));
}


//Dislike
const likeBtn2 = document.getElementById('like-btn-2');
const dislikeBtn = document.getElementById('dislike-btn');

likeBtn2.addEventListener('click', () => toggleReaction(likeBtn2, dislikeBtn));
dislikeBtn.addEventListener('click', () => toggleReaction(dislikeBtn, likeBtn2));

function toggleReaction(activeBtn, inactiveBtn) {
  if (activeBtn.classList.contains('active')) {
    activeBtn.classList.remove('active');
    activeBtn.setAttribute('aria-pressed', 'false');
  } else {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-pressed', 'true');
    inactiveBtn.classList.remove('active');
    inactiveBtn.setAttribute('aria-pressed', 'false');
  }
}

// Корзина
const cartCounter = document.getElementById('cart-counter');
const addToCartBtns = document.querySelectorAll('.add-to-cart');

addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const currentCount = parseInt(cartCounter.textContent, 10);
    cartCounter.textContent = currentCount + 1;
  });
});

// Сортировка
const sortAscBtn = document.getElementById('sort-asc');
const sortDescBtn = document.getElementById('sort-desc');
const sortOriginalBtn = document.getElementById('sort-original');
const numbersList = document.getElementById('numbers-list');

const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
let currentNumbers = [...numbers];

function renderNumbers() {
  numbersList.innerHTML = '';
  currentNumbers.forEach(num => {
    const li = document.createElement('li');
    li.textContent = num;
    numbersList.appendChild(li);
  });
}

sortAscBtn.addEventListener('click', () => {
  currentNumbers.sort((a, b) => a - b);
  renderNumbers();
});

sortDescBtn.addEventListener('click', () => {
  currentNumbers.sort((a, b) => b - a);
  renderNumbers();
});

sortOriginalBtn.addEventListener('click', () => {
  currentNumbers = [...numbers];
  renderNumbers();
});

// Инициализация списка
renderNumbers();

// Координаты
const coordinatesDisplay = document.getElementById('coordinates');

document.addEventListener('pointerdown', (e) => {
  const targetName = e.target.tagName.toLowerCase();
  coordinatesDisplay.textContent = `X: ${e.clientX}, Y: ${e.clientY} - ${targetName}`;
});