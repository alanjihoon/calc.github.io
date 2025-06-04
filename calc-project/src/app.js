// This file initializes the calculator functionality, handles user input, performs calculations, and updates the display.

class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '';
        this.addEventListeners();
    }

    addEventListeners() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                this.handleButtonClick(event.target.innerText);
            });
        });

        document.getElementById('equals').addEventListener('click', () => {
            this.calculate();
        });

        document.getElementById('clear').addEventListener('click', () => {
            this.clear();
        });
    }

    handleButtonClick(value) {
        this.currentInput += value;
        this.updateDisplay();
    }

    calculate() {
        try {
            this.currentInput = eval(this.currentInput).toString();
        } catch (error) {
            this.currentInput = 'Error';
        }
        this.updateDisplay();
    }

    clear() {
        this.currentInput = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.value = this.currentInput;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});