document.addEventListener('DOMContentLoaded', initRegistrationForm);

function initRegistrationForm() {
    const registerDialog = document.getElementById('registerDialog');
    const registerForm = document.getElementById('registerForm');

    // Назначение обработчиков событий
    document.getElementById('registerBtn').addEventListener('click', handleRegisterBtnClick);
    document.getElementById('closeDialog').addEventListener('click', handleCloseDialogClick);
    registerDialog.addEventListener('click', handleDialogOutsideClick);
    document.getElementById('togglePassword').addEventListener('pointerdown', handlePasswordShow);
    document.getElementById('togglePassword').addEventListener('pointerup', handlePasswordHide);
    
    // Назначение обработчиков для полей ввода
    registerForm.querySelectorAll('input').forEach((input) => {
        input.addEventListener('blur', handleInputBlur);
    });

    registerForm.addEventListener('submit', handleFormSubmit);
}

// Обработчики событий
function handleRegisterBtnClick() {
    document.getElementById('registerDialog').showModal();
}

function handleCloseDialogClick() {
    document.getElementById('registerDialog').close();
}

function handleDialogOutsideClick(e) {
    if (e.target === document.getElementById('registerDialog')) {
        document.getElementById('registerDialog').close();
    }
}

function handlePasswordShow() {
    document.getElementById('password').type = 'text';
}

function handlePasswordHide() {
    document.getElementById('password').type = 'password';
}

function handleInputBlur() {
    validateField(this);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const registerForm = document.getElementById('registerForm');
    let isValid = true;

    registerForm.querySelectorAll('input').forEach((input) => {
        if (!validateField(input)) {
            isValid = false;
            if (isValid) {
                input.focus();
            }
        }
    });

    if (isValid) {
        const formData = new FormData(registerForm);
        const formObject = {};
        
        for (const [key, value] of formData) {
            formObject[key] = value;
        }
        // eslint-disable-next-line no-console
        console.log(formObject);  // Вывод объекта с данными формы
        document.getElementById('registerDialog').close();
    }
}

// Функции валидации
function validateField(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    
    if (!input.validity.valid) {
        input.setAttribute('aria-invalid', 'true');
        errorElement.textContent = getErrorMessage(input);
        errorElement.hidden = false;
        return false;
    }
    
    input.removeAttribute('aria-invalid');
    errorElement.textContent = '';
    errorElement.hidden = true;
    return true;
}

function getErrorMessage(input) {
    if (input.validity.valueMissing) {
        return 'Это поле обязательно для заполнения';
    }
    if (input.validity.tooShort) {
        return `Пароль должен быть не менее ${input.minLength} символов`;
    }
    if (input.validity.typeMismatch) {
        return 'Введите корректный email';
    }
    return 'Неверное значение';
}