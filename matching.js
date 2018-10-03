function match(input, answer) {
    input = input.toLowerCase().trim();
    answer = answer.toLowerCase().trim();

    var pattern = /[\s\.\,\:\?\"]+/;

    input = input.split(pattern).filter(v => v != '');
    answer = answer.split(pattern).filter(v => v != '');

    for (k = 0; k < answer.length; k++) {
        if (answer[k] === input[0]) break;
    }

    let mark = 0;
    let res = "";

    for (let i = 0; i < Math.max(input.length, answer.length); i++, k++) {
        if (typeof answer[k] === "undefined") break;
        if (decode(answer[k]) === decode(input[i])) {
            ++mark;
            res += `<span id='ok'>${answer[k]}</span> `;
        } else {
            res += `<span id='err'>${input[i]}</span> `;
        }
    }

    return { resultText: res, correct: mark / answer.length * 100 };
}

function decode(string) {
    let parser = new DOMParser();
    var dom = parser.parseFromString(
        '<!doctype html><body>' + string,
        'text/html');
    return dom.body.textContent;
}