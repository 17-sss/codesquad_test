// [STEP-1]
const readInput = () => {    
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    let input = [];

    rl.on('line', (strLine) => {
        if (strLine === "exit") rl.close();
        input = strLine.split(' ');    
        
        if (input.length !== 3) {
            console.log('[!] 잘못된 입력입니다. 다시 입력해주세요.');   
        } else {
            const tmpNum = Number(input[1]);
            if (!tmpNum) {
                console.log('[!] 두번째 값이 정수가 아닙니다. 다시 입력해주세요.');   
            } else {
                // 범위 (-100 <= N < 100) 
                if (tmpNum >= 100 || tmpNum < -100) {
                    console.log('[!] 두번째 값(정수)는 -100 ~ 99까지 입력해주세요');   
                } else {
                    rl.close();
                }
            }                        
        }
    }).on('close', () => {
        if (!input || input.length !== 3)
            process.exit();
        
        const [word, number, direction] = input;        
        console.log(word, number, direction);
        process.exit();        
    });
};


console.log(
    '>> [STEP-1] 단어 하나, 정수 숫자 하나, 알파벳 L(l) 혹은 R(r)을 공백으로 분리하여 입력하세요.' 
    + '\n>> 예) apple -3 l'
    + '\n\t## 종료하시려면 \'exit\'를 입력하거나 Ctrl + C를 눌러주세요. ##'
);  
readInput();