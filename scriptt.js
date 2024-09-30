let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let historyList = document.getElementById('historyList');

let string = "";
let history = [];

const updateHistory = (expression, result) => {
    const li = document.createElement('li');
    li.textContent = `${expression} = ${result}`;
    li.addEventListener('click', () => {
        input.value = result;
        string = result;
    });
    historyList.appendChild(li);
};

const evaluateExpression = () => {
    try {
        let result = eval(string);
        if (result === Infinity || isNaN(result)) {
            throw new Error('Invalid operation');
        }
        updateHistory(string, result);
        input.value = result;
        string = result;
    } catch {
        input.value = 'Error';
        string = '';
    }
};

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML === '=') {
            evaluateExpression();
        } else if (e.target.innerHTML === 'AC') {
            string = '';
            input.value = string;
        } else if (e.target.innerHTML === 'CE') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } else if (e.target.innerHTML === 'sqrt') {
            string = `Math.sqrt(${string})`;
            input.value = string;
        } else if (e.target.innerHTML === '^') {
            string = `Math.pow(${string.split('^')[0]}, ${string.split('^')[1]})`;
            input.value = string;
        } else if (e.target.innerHTML === 'sin') {
            string = `Math.sin(${string})`;
            input.value = string;
        } else if (e.target.innerHTML === 'cos') {
            string = `Math.cos(${string})`;
            input.value = string;
        } else {
            string += e.target.innerHTML;
            input.value = string;
        }
    });
});

document.getElementById('toggleTheme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const themeButton = document.getElementById('toggleTheme');
    if (document.body.classList.contains('dark-mode')) {
        themeButton.textContent = 'Light Mode';
    } else {
        themeButton.textContent = 'Dark Mode';
    }
});

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if ('0123456789/*-+.()'.includes(key)) {
        string += key;
    } else if (key === 'Backspace') {
        string = string.slice(0, -1);
    } else if (key === 'Enter') {
        evaluateExpression();
    } else if (key === 'Escape') {
        string = '';
    }

    input.value = string;
});

