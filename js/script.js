let words = ['виселица','качели','королева','молоко','учебник','бумага',
  'абрикос','отпуск','функция','локомотив','телефон','гусеница','карандаш',
  'ножницы','строитель','цапля','шоколад','ящерица','кенгуру','парашют',
  'блокнот','мангуст','автомобиль','гипопотам','галстук','крокодил','вафля',
  'щупальцы','убежище','загадка','мармелад','суфле','иллюзия'
]

let validLetters = ['а','б','в','г','д','е','ё','ж','з','и','й',
  'к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ',
  'ъ','ы','ь','э','ю','я',
]

let letter = ''
let word = ''
let arrayOfLetter = []
let usedLetter = []
let activ = false
let attempt = 10

const startButtonElement = document.querySelector('.rules__content-button')
const showGeme = document.querySelector('.rules__game')
const inputButton = document.querySelector('.rules__game-button')
const letterElement = document.querySelector('.input')
const usedLetterElement = document.querySelector('.rules__game-used')
const errorFild = document.querySelector('.rules__game-error')
const attemptElement = document.querySelector('.rules__game-attempt')
const hiddenRules = document.getElementById('hiddenText')
const hiddenTitle = document.getElementById('hiddenTitle')
const gamePrevious = document.querySelector('.rules__game-previous')

startButtonElement.addEventListener('click', startGame)
inputButton.addEventListener('click', inputChek)

function getWord(arrayWords){
  return  wordLocal = arrayWords[Math.floor(Math.random() * arrayWords.length)]
}

function setUpArrayOfLetter(word){
  let arrayOfLetter = []
  for (let i=0; i<word.length; i++){
    arrayOfLetter[i]='_'
  }
  return arrayOfLetter
}

function startGame(){
  if (!activ){
    inputButton.disabled = false
    word = getWord(words)
    arrayOfLetter = setUpArrayOfLetter(word)
    showGeme.querySelector('.rules__game-word').innerHTML = `${arrayOfLetter.join(' ').trim()}`
    attemptElement.innerHTML = `Попыток осталось: ${attempt}`
    gamePrevious.innerHTML = 'Ведите предполагаемую букву'

    startButtonElement.textContent = 'Завершить игру'
    activ = true
  } else {
    reset()
    startButtonElement.textContent = 'Начать игру'
    activ = false
  } 
  
  hiddenRules.classList.toggle('visually-hidden')
  hiddenTitle.classList.toggle('visually-hidden')
  showGeme.classList.toggle('visually-hidden')
  startButtonElement.classList.toggle('red')
}

function getLetter(){
  let letter = letterElement.value.toLowerCase()
  return letter
}

function validatLetter(letter){
  if (validLetters.includes(letter)){
    if (!usedLetter.includes(letter)){
      if(!word.includes(letter)){
        attempt--
      }
      usedLetter.push(letter)
      usedLetterElement.innerHTML = `Вы уже использовали: ${usedLetter}`
      return true
    }else{
      errorFild.innerHTML = 'Эта буква уже была'
      return true
    }
  } else{
    return false
  }
}

function inputChek(){
  errorFild.innerHTML = ''
  letter = getLetter()
  if (!validatLetter(letter)) {
    errorFild.innerHTML = 'Нужно ввести букву русского алфавита'
  } else 
  if (word.includes(letter)){
    for (let i=0; i<word.length; i++){
    arrayOfLetter[word.indexOf(letter, i)] = letter
  }
    showGeme.querySelector('.rules__game-word').innerHTML = `${arrayOfLetter.join(' ').trim()}`
    for (let i=0; i<word.length; i++){
      if (word[i]===arrayOfLetter[i] && i==word.length-1){
        win()
      } else  if(word[i]===arrayOfLetter[i]){
        continue
      }else{
        break
      }
    }
  } else {
    if (attempt === 0){
      lose()
    } else{
    attemptElement.innerHTML = `Попыток осталось: ${attempt}`
    }
  }
  letterElement.value = ''
}

function reset(){
  gamePrevious.innerHTML = ''
  usedLetterElement.innerHTML = ''
  letterElement.value = ''
  attemptElement.innerHTML = ''
  usedLetter.length=0
  attempt = 10
}

function lose(){
  reset()
  inputButton.disabled = true
  attemptElement.innerHTML = `Вы проиграли( `
  showGeme.querySelector('.rules__game-word').innerHTML = `Слово было: ${word}`
}

function win(){
  reset()
  inputButton.disabled = true
  attemptElement.innerHTML = `Урааа, победа!!!`
}
