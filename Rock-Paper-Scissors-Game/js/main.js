document.addEventListener("DOMContentLoaded", function () {
  const display_winner_ms = 4500;

  let playerScore = 0;

  let computerScore = 0;

  function compChoice() {
    computerChoice = Math.random();

    document.querySelector(".computer").classList.add("chose-something");

    if (computerChoice < 0.34) {
      computerChoice = "rock";

      document
        .querySelector(".computer img.rock")
        .classList.add("selected-item");
    } else if (computerChoice <= 0.67) {
      computerChoice = "paper";

      document
        .querySelector(".computer img.paper")
        .classList.add("selected-item");
    } else {
      computerChoice = "scissors";

      document
        .querySelector(".computer img.scissors")
        .classList.add("selected-item");
    }
  }

  function compare() {
    let lookuptable = {
      scissors: { rock: -1, scissors: 0, paper: 1 },

      rock: { rock: 0, scissors: 1, paper: -1 },

      paper: { rock: 1, scissors: -1, paper: 0 },
    };

    let winLoss = lookuptable[playerschoice][computerChoice];

    if (winLoss == 1) {
      playerScore++;
    } else if (winLoss == -1) {
      computerScore++;
    }

    document.querySelector(".player .score").innerHTML = playerScore;

    document.querySelector(".computer .score").innerHTML = computerScore;

    let gif = document.querySelector("#gif");

    let fightAnimation = "";

    let afterAnimation = "";

    gif.setAttribute("src", "");

    fightAnimation = playerschoice + computerChoice;

    if (playerschoice === computerChoice) {
      afterAnimation = "images/tie.png";
    } else {
      afterAnimation = "images/" + fightAnimation + "after.png";
    }

    fightAnimation = fightAnimation + ".gif";

    gif.setAttribute("src", "images/" + fightAnimation);

    if (afterAnimation === "") {
      document.body.classList.add("reset");
    } else {
      setTimeout(function () {
        document.body.classList.add("reset");

        gif.setAttribute("src", afterAnimation);
      }, display_winner_ms);
    }

    document.body.classList.add("game-over");
  }

  let computerChoice;

  let playerschoice = "";

  const playerclasses = document.querySelector(".player").classList;

  const computerclasses = document.querySelector(".computer").classList;

  const elements = document.querySelectorAll(".player img");

  for (let i = 0; i < elements.length; i += 1) {
    let element = elements[i];

    element.addEventListener("click", function () {
      const choice = this.classList[0];

      playerschoice = choice;

      playerclasses.add("chose-something");

      this.classList.add("selected-item");

      compChoice();

      setTimeout(compare, 1800);
    });
  }

  const btnreset = document.querySelector(".btnreset");

  btnreset.addEventListener("click", function () {
    playerclasses.remove("chose-something");

    computerclasses.remove("chose-something");

    document.body.classList.remove("game-over");

    document.body.classList.remove("reset");

    let selected = document.querySelector(".player .selected-item");

    if (selected) selected.classList.remove("selected-item");

    selected = document.querySelector(".computer .selected-item");

    if (selected) selected.classList.remove("selected-item");

    playerschoice = "";

    computerChoice = "";
  });
});
