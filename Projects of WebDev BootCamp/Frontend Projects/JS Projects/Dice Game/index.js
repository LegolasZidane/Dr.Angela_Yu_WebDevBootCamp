function func(){
    var randomNumber1 = Math.floor(Math.random()*6)+1;
    var randomNumber2 = Math.floor(Math.random()*6)+1;

    var newDiceImageLeft = "./images/dice"+randomNumber1+".png";
    var newDiceImageRight = "./images/dice"+randomNumber2+".png";

    document.querySelector(".img1").setAttribute("src", newDiceImageLeft);
    document.querySelector(".img2").setAttribute("src", newDiceImageRight);

    if( randomNumber1 > randomNumber2 ){
        document.querySelector("h1").textContent = "🚩Player 1 Wins!";
    } else if( randomNumber1 < randomNumber2 ){
        document.querySelector("h1").textContent = "Player 2 Wins!🚩";
    } else {
        document.querySelector("h1").textContent = "Draw!";
    }
}

onload = func();