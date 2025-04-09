
/* Задание "Функция конвертации температуры", 
можно было сделать всё через return, без использования переменных, но сделал так.
        return `${(val - 32) * 5 / 9} C`;
        return `${val * 9 / 5 + 32} F`;
Вот вариант без переменных
*/
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

/* Елочка */
function createChristmasTree(height) {
    console.log('>');
    for (let i = 1; i <= height * 2 - 1; i++) {
      const symbol = i % 2 === 1 ? '*' : '#';
      console.log(symbol.repeat(i));
    }
    
    console.log('||');
}

/* Деление */
function isDivisible(n, x, y) {
    return n % x === 0 && n % y === 0;
}

/* Сэндвич */
function countSandwiches({bread, cheese}) {
    return Math.min(Math.floor(bread / 2), cheese);
}

/* Абсолютное значение */
function absValue(x) {
    return x < 0 ? -x : x;
}

/* Случайные числа */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Значения из массива */
function sampleArray(arr, count) {
    const result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      result.push(arr[randomIndex]);
    }
    return result;
}

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
    return str.length <= 5 ;
}

/* Равенство чисел с плавающей запятой */
function toBeCloseTo(num1, num2, epsilon = Number.EPSILON) {
    return Math.abs(num1 - num2) < epsilon;
}