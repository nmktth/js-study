let retryCount = 0;

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded() {
  initTheme();
  initAll();
}

function initAll() {
  document.getElementById('show-success').addEventListener('click', handleShowSuccess);
  document.getElementById('show-error').addEventListener('click', handleShowError);
  document.getElementById('reload-gallery').addEventListener('click', handleReloadGallery);
  document.querySelector('.theme-toggle-btn').addEventListener('click', toggleTheme);
  document.getElementById('temperature-form').addEventListener('submit', handleTemperatureSubmit);
  loadGallery();
}

// TOAST

function handleShowSuccess() {
  showToast('Показан успех!', 'success');
}

function handleShowError() {
  showToast('Показана ошибка!', 'error');
}

function showToast(message, type) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast-message ${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-label', message);

  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close-btn" aria-label="Закрыть уведомление">&times;</button>
  `;

  container.appendChild(toast);

  function showToastAnimation() {
    toast.classList.add('show');
  }

  function hideToastHandler() {
    hideToast(toast);
  }

  setTimeout(showToastAnimation, 10);
  toast.querySelector('.toast-close-btn').addEventListener('click', hideToastHandler);

  function autoHideToast() {
    hideToast(toast);
  }

  setTimeout(autoHideToast, 5000);
}

function hideToast(toast) {
  function removeToast() {
    toast.remove();
  }

  toast.classList.remove('show');
  setTimeout(removeToast, 400);
}

// ГАЛЕРЕЯ

function handleReloadGallery() {
  retryCount = 0;
  loadGallery();
}

async function loadGallery() {
  const container = document.getElementById('gallery-container');
  const loader = document.getElementById('gallery-loader');
  const empty = document.getElementById('gallery-empty');

  container.replaceChildren();
  empty.style.display = 'none';
  loader.style.display = 'block';

  try {
    const images = await fetchImages();
    loader.style.display = 'none';

    if (images.length === 0) {
      empty.style.display = 'block';
    } else {
      empty.style.display = 'none';
      displayImages(images);
    }
  } catch (error) {
    loader.style.display = 'none';
    showToast(`Ошибка загрузки: ${error.message}`, 'error');
    retryCount++;

    function retryLoadGallery() {
      loadGallery();
    }

    if (retryCount < 3) {
      setTimeout(retryLoadGallery, 4000);
    } else {
      showToast('Не удалось загрузить изображения после 3 попыток.', 'error');
    }
  }
}

async function fetchImages() {
  const response = await fetch('http://194.67.93.117:80/images');
  if (!response.ok) {
    throw new Error('Ошибка сервера');
  }
  return await response.json();
}

function displayImages(images) {
  const container = document.getElementById('gallery-container');

  function createImageItem(image) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${image.url}" alt="${image.alt}">
      <p>${image.description}</p>
    `;
    container.appendChild(item);
  }

  for (let i = 0; i < images.length; i++) {
    createImageItem(images[i]);
  }
}

// ТЕМПЕРАТУРА

async function handleTemperatureSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('temperature-form');
  const room = document.getElementById('room-input').value.trim();
  const temp = Number(document.getElementById('temperature-input').value);
  const submitBtn = document.getElementById('temperature-submit');

  if (!room) {
    showToast('Введите номер аудитории!', 'error');
    return;
  }

  submitBtn.disabled = true;

  const payload = {
    class: room,
    temp: temp
  };

  try {
    const response = await fetch('http://194.67.93.117:80/temp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok && data.status === 'ok') {
      showToast(data.message || 'Температура успешно отправлена!', 'success');
      form.reset();
    } else {
      showToast(data.message || 'Ошибка на сервере', 'error');
    }
  } catch (error) {
    showToast(`Ошибка соединения: ${error.message}`, 'error');
  } finally {
    submitBtn.disabled = false;
  }
}

// ТЕМА

function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    themeToggleBtn.textContent = isDark ? '🌙' : '☀️';
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark';

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    themeToggleBtn.textContent = isDark ? '🌙' : '☀️';
  }
}
