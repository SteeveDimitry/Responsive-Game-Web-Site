const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endSreen = document.getElementById('endScreen');

daysLeft = 60;
gameOverNumber = 50;
loopPlay = false;

function start() {
    count = 0;
    getFaster = 6000;
    daysRemaining = daysLeft;

    canvas.innerHTML = '';
    score.innerHTML = count;
    days.innerHTML = daysRemaining;


    loopPlay ? '' : game();
    loopPlay = true;


    function game(){
        let randomTime = Math.round(Math.random() * getFaster);
        getFaster > 700 ? getFaster = (getFaster * 0.90) : '';
        
        setTimeout(() => {
            if (daysRemaining === 0){
                youWin();
            }else if (canvas.childElementCount < gameOverNumber){
             virusPop();
             game();
            }else{
                gameOver();
            }
        }, randomTime);
    };

    const gameOver = () => {
        endSreen.innerHTML = `<div class="gameOver">Game over<br/>score : ${count} </div>`;
        endSreen.style.visibility = 'visible';
        endSreen.style.opacity = '1';
        loopPlay = false;
       
    };

    const youWin = () => {
        let accuracy = Math.round(count / daysLeft * 100);
        endSreen.innerHTML = `<div class="youWin">Well done ! You overcome this Monster<br/><span>précision : ${accuracy}%</span></div>`
        endSreen.style.visibility = 'visible';
        endSreen.style.opacity = '1';
        loopPlay = false;
    };
};

// diplay virus movement & position

function virusPop() {
    let virus = new Image();

    virus.src="https://img.icons8.com/dusk/64/000000/coronavirus.png";

    virus.classList.add('virus');
    virus.style.top = Math.random() * 500 + 'px';
    virus.style.left = Math.random() * 500 + 'px';


    let x, y;
    x = y = (Math.random() * 45) + 30;
    virus.style.setProperty('--x', `${ x }px`);
    virus.style.setProperty('--y', `${ y }px`);

    let plusMinus = Math.random() < 0.5 ? -1 : 1;
    let trX = Math.random() * 500 * plusMinus;
    let trY = Math.random() * 500 * plusMinus;
    virus.style.setProperty('--trX', `${ trX }%`);
    virus.style.setProperty('--trY', `${ trY }%`);

    canvas.appendChild(virus);
}

// remover element clicked

document.addEventListener('click', function(e){
    let targetElement = e.target || e.srcElement;

    if (targetElement.classList.contains('virus')){
        targetElement.remove();
        count++;
        score.innerHTML = count;
    };
});

canvas.addEventListener('click', () => {
    if(daysRemaining > 0) {
        daysRemaining--;
        days.innerHTML = daysRemaining;
    }
});

endSreen.addEventListener('click', () => {
    setTimeout(() => {
    start();
    endSreen.style.opacity = '0' 
    endSreen.style.visibility = 'hidden'
    }, 3500)
});