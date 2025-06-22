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
            .replace(/([0-9]+)\^([0-9]+)/g, 'Math.pow($1,$2)')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(');

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

  // 삼각함수 버튼 이벤트 등록
  document.querySelectorAll('.btn[data-function]').forEach(button => {
    button.addEventListener('click', () => {
      const func = button.getAttribute('data-function');
      mathField.executeCommand('insert', `\\${func}(`);
    });
  });
});

// 삼각함수 입력 함수
function appendFunction(func) {
    const mf = document.getElementById('math-input');
    if (mf) {
        mf.executeCommand(['insert', `\\${func}(`]);
    }
}

// calculate 함수 내에 삼각함수 처리 추가
function calculate() {
    let expression = document.getElementById('display').value;
    expression = expression.replace(/sin\(/g, 'Math.sin(')
                           .replace(/cos\(/g, 'Math.cos(')
                           .replace(/tan\(/g, 'Math.tan(');
    try {
        document.getElementById('display').value = eval(expression);
    } catch (e) {
        document.getElementById('display').value = 'Error';
    }
}
