const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    if (value !== undefined) {
      currentInput += value;
      display.value = currentInput;
    } else if (button.id === 'clear') {
      currentInput = '';
      display.value = '';
    } else if (button.id === 'equals') {
      try {
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
      } catch {
        display.value = 'Error';
        currentInput = '';
      }
    }
  });
});