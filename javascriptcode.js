document.addEventListener('DOMContentLoaded', function() {
  const mathField = document.getElementById('mathlive-display'); // math-field element 자체가 MathLive 객체!

  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.dataset.value;

      if (value !== undefined) {
        mathField.insert(value);
      } else if (button.id === 'clear') {
        mathField.setValue('');
      } else if (button.id === 'equals') {
        try {
          let expr = mathField.getValue('latex')
            .replace(/\\sqrt{([^}]*)}/g, 'Math.sqrt($1)')
            .replace(/\\times/g, '*')
            .replace(/\\div/g, '/')
            .replace(/\\cdot/g, '*')
            .replace(/([0-9]+)\^([0-9]+)/g, 'Math.pow($1,$2)');

          const result = eval(expr);
          mathField.setValue(result.toString());
        } catch {
          mathField.setValue('Error');
        }
      } else if (button.id === 'sqrt') {
        mathField.insert('\\sqrt{}');
      } else if (button.id === 'square') {
        mathField.insert('^2');
      }
    });
  });
});
