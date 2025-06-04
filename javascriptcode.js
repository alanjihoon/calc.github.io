// MathQuill 연동 코드 추가
document.addEventListener('DOMContentLoaded', function() {
  const MQ = MathQuill.getInterface(2);
  const mathFieldSpan = document.getElementById('mathquill-display');
  const mathField = MQ.MathField(mathFieldSpan, {
    spaceBehavesLikeTab: true,
    handlers: {}
  });

  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.dataset.value;
      if (value !== undefined) {
        mathField.write(value);
        mathField.focus();
      } else if (button.id === 'clear') {
        mathField.latex('');
      } else if (button.id === 'equals') {
        try {
          let expr = mathField.latex()
            .replace(/\\sqrt{([^}]*)}/g, 'Math.sqrt($1)')
            .replace(/\\cdot/g, '*')
            .replace(/\\times/g, '*')
            .replace(/\\div/g, '/')
            .replace(/\\left\(/g, '(')
            .replace(/\\right\)/g, ')')
            .replace(/([0-9]+)\^([0-9]+)/g, 'Math.pow($1,$2)');
          const result = eval(expr);
          mathField.latex(result.toString());
        } catch {
          mathField.latex('Error');
        }
      } else if (button.id === 'sqrt') {
        mathField.cmd('\\sqrt');
        mathField.focus();
      } else if (button.id === 'square') {
        mathField.cmd('^2');
        mathField.focus();
      }
    });
  });
});