// Like button functionality
const likeBtn = document.getElementById('like-btn');

function handleLikeClick() {
  this.classList.toggle('active');
  this.setAttribute('aria-pressed', this.classList.contains('active'));
}

likeBtn.addEventListener('click', handleLikeClick);

// Dislike button functionality
const likeBtn2 = document.getElementById('like-btn-2');
const dislikeBtn = document.getElementById('dislike-btn');

function handleLikeBtn2Click() {
  toggleReaction(likeBtn2, dislikeBtn);
}

function handleDislikeBtnClick() {
  toggleReaction(dislikeBtn, likeBtn2);
}

function toggleReaction(activeBtn, inactiveBtn) {
  // If active button is already active - deactivate it
  if (activeBtn.classList.contains('active')) {
    activeBtn.classList.remove('active');
    activeBtn.setAttribute('aria-pressed', 'false');
    
    // Remove dislike class only from dislike button
    if (activeBtn === dislikeBtn) {
      activeBtn.classList.remove('dislike');
    }
  } 
  // If active button is inactive - activate it and deactivate the other
  else {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-pressed', 'true');
    
    // Add dislike class only to dislike button
    if (activeBtn === dislikeBtn) {
      activeBtn.classList.add('dislike');
    }
    
    inactiveBtn.classList.remove('active');
    inactiveBtn.setAttribute('aria-pressed', 'false');
    
    // Remove dislike class from inactive button if it's dislike
    if (inactiveBtn === dislikeBtn) {
      inactiveBtn.classList.remove('dislike');
    }
  }
}

likeBtn2.addEventListener('click', handleLikeBtn2Click);
dislikeBtn.addEventListener('click', handleDislikeBtnClick);

// Cart functionality
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

// Sorting functionality
function setupSorting() {
  const sortAscBtn = document.getElementById('sort-asc');
  const sortDescBtn = document.getElementById('sort-desc');
  const sortOriginalBtn = document.getElementById('sort-original');
  const numbersList = document.getElementById('numbers-list');

  // Generate array of random numbers
  const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  let currentNumbers = [...numbers];

  // Function to render the list
  function renderNumbers() {
    // Clear the list (without using innerHTML)
    while (numbersList.firstChild) {
      numbersList.removeChild(numbersList.firstChild);
    }

    // Create new list items
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

  // Initialize on load
  renderNumbers();

  // Event listeners for buttons
  sortAscBtn.addEventListener('click', handleSortAscClick);
  sortDescBtn.addEventListener('click', handleSortDescClick);
  sortOriginalBtn.addEventListener('click', handleSortOriginalClick);
}

// Coordinates functionality
function handlePointerDown(e) {
  const coordinatesDisplay = document.getElementById('coordinates');
  const targetName = e.target.tagName.toLowerCase();
  coordinatesDisplay.textContent = `X: ${e.clientX}, Y: ${e.clientY} - ${targetName}`;
}

// Initialize all functionality when DOM is loaded
function initialize() {
  setupCart();
  setupSorting();
  document.addEventListener('pointerdown', handlePointerDown);
}

document.addEventListener('DOMContentLoaded', initialize);