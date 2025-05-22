// Версионирование

const section = document.querySelector('.task--version-manager')
const form = section.querySelector('.form--version')
const input = section.querySelector('.form-input')
const errorContainer = section.querySelector('.form-error')
const versionText = section.querySelector('.version-value')
const buttonsBlock = section.querySelector('.btn-group--version')

const majorButton = section.querySelector('.btn--major')
const minorButton = section.querySelector('.btn--minor')
const patchButton = section.querySelector('.btn--patch')
const rollbackButton = section.querySelector('.btn--rollback')

let manager = null

function updateVersionText() {
  versionText.textContent = manager.release()
}

function handleFormSubmit(event) {
  event.preventDefault()
  errorContainer.textContent = ''

  try {
    manager = new VersionManager(input.value)
    updateVersionText()
    input.value = ''
    buttonsBlock.classList.add('btn-group--active')
  } catch (error) {
    errorContainer.textContent = error.message
  }
}

function handleMajorClick() {
  try {
    manager.major()
    updateVersionText()
  } catch (error) {
    errorContainer.textContent = error.message
  }
}

function handleMinorClick() {
  try {
    manager.minor()
    updateVersionText()
  } catch (error) {
    errorContainer.textContent = error.message
  }
}

function handlePatchClick() {
  try {
    manager.patch()
    updateVersionText()
  } catch (error) {
    errorContainer.textContent = error.message
  }
}

function handleRollbackClick() {
  try {
    manager.rollback()
    updateVersionText()
  } catch (error) {
    errorContainer.textContent = error.message
  }
}

form.addEventListener('submit', handleFormSubmit)
majorButton.addEventListener('click', handleMajorClick)
minorButton.addEventListener('click', handleMinorClick)
patchButton.addEventListener('click', handlePatchClick)
rollbackButton.addEventListener('click', handleRollbackClick)

// Конструктор VersionManager

function VersionManager(initialVersion) {
  if (!initialVersion || initialVersion.trim() === '') {
    initialVersion = '0.0.1'
  }

  const parts = initialVersion.split('.')
  if (!isValidVersionParts(parts)) {
    throw new Error('Некорректный формат версии!')
  }

  this._major = Number(parts[0])
  this._minor = Number(parts[1])
  this._patch = Number(parts[2])
  this.stackHistory = []
}

function isValidVersionParts(parts) {
  if (parts.length !== 3) { return false }
  for (let i = 0; i < parts.length; i++) {
    if (!Number.isInteger(Number(parts[i]))) {
      return false
    }
  }
  return true
}

VersionManager.prototype._saveHistory = function saveHistory() {
  this.stackHistory.push({
    major: this._major,
    minor: this._minor,
    patch: this._patch,
  })
}

VersionManager.prototype.major = function incrementMajor() {
  this._saveHistory()
  this._major++
  this._minor = 0
  this._patch = 0
  return this
}

VersionManager.prototype.minor = function incrementMinor() {
  this._saveHistory()
  this._minor++
  this._patch = 0
  return this
}

VersionManager.prototype.patch = function incrementPatch() {
  this._saveHistory()
  this._patch++
  return this
}

VersionManager.prototype.rollback = function rollbackVersion() {
  if (this.stackHistory.length === 0) {
    throw new Error('Невозможно выполнить откат!')
  }
  const last = this.stackHistory.pop()
  this._major = last.major
  this._minor = last.minor
  this._patch = last.patch
  return this
}

VersionManager.prototype.release = function releaseVersion() {
  return `${this._major}.${this._minor}.${this._patch}`
}



// Прямоугольник и квадрат

class Rectangle {
  constructor(width, height) {
    this.width = width
    this.height = height
  }

  getArea() {
    return this.width * this.height
  }

  getPerimeter() {
    return 2 * (this.width + this.height)
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side)
  }
}

// DOM-элементы
const shapeSection = document.querySelector('.task--shape-calculator')
const widthInput = shapeSection.querySelector('#width-input')
const heightInput = shapeSection.querySelector('#height-input')
const resultContainer = shapeSection.querySelector('.shape-result')
const areaButton = shapeSection.querySelector('.btn--calc-area')
const perimeterButton = shapeSection.querySelector('.btn--calc-perimeter')

// Создание фигуры (прямоугольник или квадрат)
function createShape(width, height) {
  if (width === height) {
    return new Square(width)
  }
  return new Rectangle(width, height)
}

// Обработчик кнопки "Площадь"
function handleAreaButtonClick() {
  const width = Number(widthInput.value)
  const height = Number(heightInput.value)

  if (isValidDimensions(width, height)) {
    const shape = createShape(width, height)
    resultContainer.textContent = `Площадь: ${shape.getArea()}`
  } else {
    resultContainer.textContent = 'Введите корректные значения!'
  }
}

// Обработчик кнопки "Периметр"
function handlePerimeterButtonClick() {
  const width = Number(widthInput.value)
  const height = Number(heightInput.value)

  if (isValidDimensions(width, height)) {
    const shape = createShape(width, height)
    resultContainer.textContent = `Периметр: ${shape.getPerimeter()}`
  } else {
    resultContainer.textContent = 'Введите корректные значения!'
  }
}

// Проверка на корректные размеры
function isValidDimensions(width, height) {
  return width > 0 && height > 0
}

// Навешивание обработчиков
areaButton.addEventListener('click', handleAreaButtonClick)
perimeterButton.addEventListener('click', handlePerimeterButtonClick)


// Температура

const tempSection = document.querySelector('.task--temperature-calculator')
const temp1Input = tempSection.querySelector('#temp1-input')
const temp2Input = tempSection.querySelector('#temp2-input')
const unitRadios = tempSection.querySelectorAll('input[name="unit"]')

const temp1Display = tempSection.querySelector('.temperature-value--1')
const temp2Display = tempSection.querySelector('.temperature-value--2')
const resultDisplay = tempSection.querySelector('.temperature-result')

const addButton = tempSection.querySelector('.btn--add')
const subtractButton = tempSection.querySelector('.btn--subtract')


class Temperature {
  static MIN_TEMP = -273.16
  static MAX_TEMP = 1.41e32

  constructor(value) {
    this.value = value
  }

  get value() {
    return this._value
  }

  set value(newValue) {
    if (newValue < Temperature.MIN_TEMP || newValue > Temperature.MAX_TEMP) {
      throw new Error('Неверное значение температуры!')
    }
    this._value = newValue
  }

  toKelvin() {
    return +(this._value + 273.15).toFixed(2)
  }

  toFahrenheit() {
    return +(this._value * 9 / 5 + 32).toFixed(2)
  }

  toString(unit = 'K') {
    switch (unit) {
      case 'C':
        return `${this.value.toFixed(2)} °C`
      case 'K':
        return `${this.toKelvin()} K`
      case 'F':
        return `${this.toFahrenheit()} °F`
      default:
        return `${this.toKelvin()} K`
    }
  }

  static checkValid(t1, t2) {
    if (!(t1 instanceof Temperature) || !(t2 instanceof Temperature)) {
      throw new Error('Обе величины должны быть экземплярами Temperature')
    }
  }

  static add(t1, t2) {
    Temperature.checkValid(t1, t2)
    return new Temperature(t1.value + t2.value)
  }

  static subtract(t1, t2) {
    Temperature.checkValid(t1, t2)
    return new Temperature(t1.value - t2.value)
  }
}


// Конвертация значения
function convertTemperature(temp, unit) {
  switch (unit) {
    case 'C':
      return temp.toFixed(2)
    case 'K':
      return (temp + 273.15).toFixed(2)
    case 'F':
      return ((temp * 9 / 5) + 32).toFixed(2)
    default:
      return temp.toFixed(2)
  }
}

// Получение символа единицы измерения
function getUnitLabel(unit) {
  switch (unit) {
    case 'C':
      return '°C'
    case 'K':
      return 'K'
    case 'F':
      return '°F'
    default:
      return ''
  }
}

// Обновление вывода температур
function updateTemperatureDisplays() {
  const temp1Value = Number(temp1Input.value)
  const temp2Value = Number(temp2Input.value)
  const selectedUnit = getSelectedUnit()

  if (!isNaN(temp1Value)) {
    const converted1 = convertTemperature(temp1Value, selectedUnit)
    temp1Display.textContent = `Температура 1: ${converted1} ${getUnitLabel(selectedUnit)}`
  } else {
    temp1Display.textContent = 'Температура 1: -'
  }

  if (!isNaN(temp2Value)) {
    const converted2 = convertTemperature(temp2Value, selectedUnit)
    temp2Display.textContent = `Температура 2: ${converted2} ${getUnitLabel(selectedUnit)}`
  } else {
    temp2Display.textContent = 'Температура 2: -'
  }
}

// Получение выбранной единицы измерения
function getSelectedUnit() {
  return tempSection.querySelector('input[name="unit"]:checked').value
}

// Обработчик сложения температур
function handleAddButtonClick() {
  try {
    const temp1 = new Temperature(Number(temp1Input.value))
    const temp2 = new Temperature(Number(temp2Input.value))
    const result = Temperature.add(temp1, temp2)
    const selectedUnit = getSelectedUnit()
    resultDisplay.textContent = `Результат: ${result.toString(selectedUnit)}`
  } catch (error) {
    resultDisplay.textContent = error.message
  }
}

// Обработчик вычитания температур
function handleSubtractButtonClick() {
  try {
    const temp1 = new Temperature(Number(temp1Input.value))
    const temp2 = new Temperature(Number(temp2Input.value))
    const result = Temperature.subtract(temp1, temp2)
    const selectedUnit = getSelectedUnit()
    resultDisplay.textContent = `Результат: ${result.toString(selectedUnit)}`
  } catch (error) {
    resultDisplay.textContent = error.message
  }
}

// Навешивание обработчиков
function handleUnitChange() {
  updateTemperatureDisplays()
}

function handleTempInputChange() {
  updateTemperatureDisplays()
}

temp1Input.addEventListener('input', handleTempInputChange)
temp2Input.addEventListener('input', handleTempInputChange)
unitRadios.forEach(function (radio) {
  radio.addEventListener('change', handleUnitChange)
})

addButton.addEventListener('click', handleAddButtonClick)
subtractButton.addEventListener('click', handleSubtractButtonClick)






// Камень-ножницы-бумага

const rpsSection = document.querySelector('.task--rps')
const startButton = rpsSection.querySelector('.btn--start')
const stopButton = rpsSection.querySelector('.btn--stop')
const roundsList = rpsSection.querySelector('.round-list')
const player1WinsElem = rpsSection.querySelector('.stats-player1-wins')
const player2WinsElem = rpsSection.querySelector('.stats-player2-wins')
const player1ChoicesElem = rpsSection.querySelector('.stats-player1-choices')
const player2ChoicesElem = rpsSection.querySelector('.stats-player2-choices')

// статистика
let player1Wins = 0
let player2Wins = 0
const player1Choices = { 'Камень': 0, 'Ножницы': 0, 'Бумага': 0 }
const player2Choices = { 'Камень': 0, 'Ножницы': 0, 'Бумага': 0 }

// переменная для подключения к SSE
let eventSource = null

// класс, который слушает события и уведомляет подписчиков
class RPSObserver {
  constructor() {
    this.subscribers = []
  }

  subscribe(callback) {
    this.subscribers.push(callback)
  }

  notify(data) {
    this.subscribers.forEach(function (callback) {
      callback(data)
    })
  }
}

const rpsObserver = new RPSObserver()

// SSE event handler
function handleSSEEvent(event) {
  const data = JSON.parse(event.data)
  rpsObserver.notify(data)
}

// SSE error handler
function handleSSEError() {
  stopWatching()
}

// запуск SSE
function startWatching() {
  eventSource = new EventSource('http://194.67.93.117:80/rps/stream')
  eventSource.addEventListener('round', handleSSEEvent)
  eventSource.onerror = handleSSEError
}

// остановка SSE
function stopWatching() {
  if (eventSource) {
    eventSource.close()
    eventSource = null
  }
}

// 1. обновляем историю раундов
function updateRoundHistory({ player1, player2 }) {
  const li = document.createElement('li')
  li.textContent = `Игрок 1: ${player1} — Игрок 2: ${player2}`
  roundsList.appendChild(li)
}
rpsObserver.subscribe(updateRoundHistory)

// 2. обновляем счёт
function updateScore({ player1, player2 }) {
  const winner = getWinner(player1, player2)
  if (winner === 1) {
    player1Wins++
    player1WinsElem.textContent = `Победы Игрока 1: ${player1Wins}`
  } else if (winner === 2) {
    player2Wins++
    player2WinsElem.textContent = `Победы Игрока 2: ${player2Wins}`
  }
}
rpsObserver.subscribe(updateScore)

// 3. обновляем статистику выбора
function updateChoiceStats({ player1, player2 }) {
  player1Choices[player1]++
  player2Choices[player2]++
  player1ChoicesElem.textContent = `Выборы Игрока 1: ${formatChoices(player1Choices)}`
  player2ChoicesElem.textContent = `Выборы Игрока 2: ${formatChoices(player2Choices)}`
}
rpsObserver.subscribe(updateChoiceStats)

// определяем победителя
function getWinner(p1, p2) {
  if (p1 === p2) { return 0 }
  if (
    (p1 === 'Камень' && p2 === 'Ножницы') ||
    (p1 === 'Ножницы' && p2 === 'Бумага') ||
    (p1 === 'Бумага' && p2 === 'Камень')
  ) { return 1 }
  return 2
}

// форматируем статистику
function formatChoices(choices) {
  return Object.entries(choices)
    .map(function ([choice, count]) {
      return `${choice}: ${count}`
    })
    .join(', ')
}

// обработчик кнопки старт
function handleStartClick() {
  startWatching()
  startButton.disabled = true
  stopButton.disabled = false
}

// обработчик кнопки стоп
function handleStopClick() {
  stopWatching()
  startButton.disabled = false
  stopButton.disabled = true
}

// навешиваем обработчики
startButton.addEventListener('click', handleStartClick)
stopButton.addEventListener('click', handleStopClick)
