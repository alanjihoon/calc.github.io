class MathInput {
  constructor(inputElement) {
    this.inputElement = inputElement;
  }

  captureInput() {
    return this.inputElement.value;
  }

  validateInput(input) {
    // Basic validation for mathematical expressions
    const validPattern = /^[0-9+\-*/().\s]*$/;
    return validPattern.test(input);
  }

  clearInput() {
    this.inputElement.value = '';
  }
}

export default MathInput;