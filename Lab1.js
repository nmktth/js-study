
/* Задание "Функция конвертации температуры", 
можно было сделать всё через return, без использования переменных, но сделал так.
        return `${(val - 32) * 5 / 9} C`;
        return `${val * 9 / 5 + 32} F`;
Вот вариант без переменных
*/
let x = 0;

function convertTemperature(val, to) {
    if (to === 'toC') {
        const celsius = (val - 32) * 5 / 9;
        return `${celsius} C`;
    } else if (to === 'toF') {
        const fahrenheit = val * 9 / 5 + 32;
        return `${fahrenheit} F`;
    } else {
        return 'Вы что-то не так ввели';
    }
}

console.log('Демонстрация работы Конвертации температуры');
x = 32;
console.log(convertTemperature(x, 'toC'));
x = 10;
console.log(convertTemperature(x, 'toF'));

/* Треугольник */
function checkTriangle(a, b, c) {
        if (a + b > c && a + c > b && b + c > a) {
            console.log("треугольник существует");
            const perimeter = a + b + c;
            console.log(`периметр = ${a + b + c}`);
            const semiPerimeter = perimeter / 2;
            const area = Math.sqrt(
                semiPerimeter * (semiPerimeter - a) * (semiPerimeter - b) * (semiPerimeter - c)
            );
            console.log(`Площадь = ${area}`);
            const ratio = perimeter / area;
            console.log(`Соотношение = ${ratio}`);
        } else {
            return "треугольника не существует";
        }
}

let y = 10;
x = 100;
console.log('Демонстрация работы кода работы треугольника');
console.log(checkTriangle(y, y, y));
console.log(checkTriangle(x, y, y));

/* FizzBuzz */
function fizzBuzz(maxNumber) {
        for (let i = 0; i <= maxNumber; i++) {
            let result;
            if (i === 0) {
                result = "0 buzz";
            } else if (i % 5 === 0) {
                result = `${i} fizz buzz`;
            } else if (i % 2 === 0) {
                result = `${i} buzz`;
            } else {
                result = `${i} fizz`;
            }
            console.log(result);
        }
}

console.log('Демонстрация работы FizzBuzz');
console.log(fizzBuzz(y));

/* Елочка */
function createChristmasTree(height) {
        console.log('>');
        for (let i = 1; i <= height * 2 - 1; i++) {
            const symbol = i % 2 === 1 ? '*' : '#';
            console.log(symbol.repeat(i));
        }

        console.log('||');
}

console.log('Демонстрация Ёлочки');
console.log(createChristmasTree(y));

/* Деление */
function isDivisible(n, x, y) {
        return n % x === 0 && n % y === 0;
}

x = 10;
y = 5;
let z = 2;
console.log('Демонстрация задачи Деления');
console.log(isDivisible(x, y, z));
x = 5;
y = 3;
z = 2;
console.log(isDivisible(x, y, z));

/* Сэндвич */
function countSandwiches({ bread, cheese }) {
        return Math.min(Math.floor(bread / 2), cheese);
}

console.log('Демонстрация Сэндвича подсчёта');
x = 10;
y = 2;
console.log(countSandwiches({ bread:x, cheese:y}));
y = 20;
console.log(countSandwiches({ bread:x, cheese:y}));

/* Абсолютное значение */
function absValue(x) {
        return x < 0 ? -x : x;
}

x = 5;
console.log(`Демонстрация работы abs функции - ${x}`)

/* Случайные числа */
function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log('Демонстрация работы Случайных чисел от 0 до 10');
x = 0;
y = 10;
console.log(randomNumber(x, y));

/* Значения из массива */
function sampleArray(arr, count) {
        const result = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            result.push(arr[randomIndex]);
        }
        return result;
}

x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Демонстрация случайных значений из массива');
console.log(sampleArray(x, 5));

/* Фильтрация массива */
function myFilterArray(arr, filterFunc) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (filterFunc(arr[i])) {
                result.push(arr[i]);
            }
        }

        return result;
}


/* Пара функций фильтров */

function isFirstV(name) {
        return name.startsWith('V');
}

function isEven(num) {
        return num % 2 === 0;
}

function isMaxLength(str) {
        return str.length <= 5;
}

console.log('Демонстрация фильтрации массива');
console.log(myFilterArray(x, isEven));
x = ['Venom', 'Cat', 'Vova', 'Dodo'];
console.log(myFilterArray(x, isFirstV));

/* Равенство чисел с плавающей запятой */
function toBeCloseTo(num1, num2, epsilon = Number.EPSILON) {
        return Math.abs(num1 - num2) < epsilon;
}


console.log('Демонстрация работы чисел с плавающей запятой с помощью эпсилон')
console.log(toBeCloseTo(10, 10.00000001))
console.log(toBeCloseTo(10, 10.000000000000000001));