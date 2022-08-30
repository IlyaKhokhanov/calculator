document.addEventListener('DOMContentLoaded', function () {
  const display = document.querySelector('.display')
  const buttons = document.querySelector('.buttons')
  let ac = document.querySelector('.ac')
  const numbers = buttons.textContent
    .split('')
    .filter(Number)
  numbers.push('0')
  numbers.push('.')
  let results = document.querySelector('.results')
  let arrResult = []
  let resultsReset = document.querySelector('.results-reset')

  let a = ''
  let b = ''
  let operator = ''
  let result = ''

  resultFromLS()

  let keyLocalStorage

  function setLocalStorage() {
    localStorage.length > 0
    ? keyLocalStorage =  localStorage.length
    : keyLocalStorage = 0
    keyLocalStorage += 1
    localStorage.setItem(keyLocalStorage, arrResult.join(' '))
  }

  function resultFromLS() {
    results.innerHTML = ''
    for (let i = 1; i <= localStorage.length; i++) {
      let li = document.createElement('li')
      li.textContent = localStorage.getItem(`${i}`)
      results.append(li)
    }
  }

  resultsReset.addEventListener(('click'), (event) => {
    keyLocalStorage = 0
    localStorage.clear()
    arrResult = []
    results.innerHTML = ''
  })

  buttons.addEventListener(('click'), (event) => {
    const click = event.target.textContent

    if (!event.target.classList.contains('btn')) return

    if (click === 'C') {
      display.textContent = '0'
      b ? b = '' : a = ''
      a ? operator : operator = ''
      event.target.textContent = 'AC'
      if (arrResult.length > 2) {
        arrResult.push('=', result)
        setLocalStorage()
        resultFromLS()
      }
    }

    if (numbers.includes(click)) {
      if ((display.textContent.length) < 9 && (b === '') && (operator == '')) {
        a += click
        display.textContent = a
        if (arrResult.indexOf('=') != 1) {
          arrResult.length = 0
        }
      }

      ac.textContent = 'C'
    }

    if (click == '+/-') {
      if (b) {
        b = b * -1
        display.textContent = b
      } else {
        a = a * -1
        display.textContent = a
      }
    }

    if (event.target.classList.contains('operator') && b == '' && a != '') {
      operator = click
    }

    if ((a || a == '0') && operator) {
      if (numbers.includes(click)) {
        if (display.textContent.length < 9) {
          b += click
          display.textContent = b
        }
        ac.textContent = 'C'
      }
    }

    if ((b != '') && (event.target.classList.contains('operator'))) {
      calculation(a, operator, b)
      display.textContent = result
      a = result
      b = ''
      operator = click
    }

    if (click === '=') {
      calculation(a, operator, b)
      display.textContent = result
      a = result
      b = ''
      operator = ''
    }

    function calculation(a, operator, b) {
      result = eval(`${a}${operator}${b}`)
      if (arrResult.length > 0) {
        arrResult.push(operator, b)
      } else {
        arrResult.push(a, operator, b)
      }
    }

    console.log(a, b, operator)
    console.log(arrResult)
    console.log(localStorage)
  })
});