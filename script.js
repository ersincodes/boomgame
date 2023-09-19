'use strict';

//Selecting Elements
const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');

const score0El= document.querySelector('#score--0');

const score1El= document.getElementById('score--1');

const current0El=document.getElementById('current--0');

const current1El=document.getElementById('current--1');

const diceEl=document.querySelector('.dice');

const buttonNew=document.querySelector('.btn--new');
const buttonRoll=document.querySelector('.btn--roll');
const buttonHold=document.querySelector('.btn--hold');

let scores,currentScore,activePlayer,playing;
const init = () => {
    const scores=[0,0];
     currentScore=0;
     activePlayer=0;
     playing=true;
    diceEl.classList.add('hidden');
    player1El.classList.remove('player--winner');
    player0El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;
}
init();
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore=0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
//Rolling dice functionality

buttonRoll.addEventListener('click',function () {
    //1.Generating a dice roll
    if (playing){
        const dice=Math.trunc(Math.random()*6)+1;
        //2.Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`
        //3.Check for rolled 1:if true
        if (dice!==1){
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        }else{
            //Switch to next player
            switchPlayer();
        }
    }
});

buttonHold.addEventListener('click',function () {
    if(playing){
        //Add current score to active player's score
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //Check if the player's score is >=100 -> Finish the game
        if (scores[activePlayer] >= 100){
            playing=false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        }else{
            switchPlayer();
        }
    }
})

buttonNew.addEventListener('click',init);




