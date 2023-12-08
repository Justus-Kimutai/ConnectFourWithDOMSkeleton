function Gameboard() {
  const rows = 6;
  const columns = 7;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const dropToken = (column, player) => {
    const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);

    if (!availableCells.length) return;

    const lowestRow = availableCells.length - 1;
    board[lowestRow][column].addToken(player);
  }; 

  const clearBoard = ()=>{
    for(i=0;i<rows;i++){
      for(j=0;j<columns;j++){
        board[i][j].resetValue();
      }
    }
  }


  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  };

  return { getBoard, dropToken, printBoard, clearBoard };
}


function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const resetValue = () =>{
    value = 0;
  }

  const getValue = () => value;

  return {
    addToken,
    resetValue,
    getValue,
  };
}

function GameController() {

  let playerOneName = '';
  let playerTwoName = '';

  const setNames = (name1,name2)=>{
    playerOneName = name1;
    playerTwoName = name2;

    players[0].name = playerOneName;
    players[1].name = playerTwoName;

    console.log(players[0].name ,players[1].name );

  }

  const board = Gameboard();

  let winner = false;
  const getWinner = ()=> winner;

  const players = [
    {
      name:playerOneName,
      token: 1
    },
    {
      name:playerTwoName,
      token: 2
    }
  ];

  let activePlayer = players[0];


  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const areAllEqualButNotZero = (arr) => {
    // Check if the array is not empty
    if (arr.length === 0) {
      return false;
    }
  
    // Get the first non-zero element in the array
    const nonZeroElement = arr.find(element => element !== 0);
  
    // Check if all elements are equal to the first non-zero element
    return arr.every(element => element === nonZeroElement);
  }

  const checkZero = (arr)=>{

    let newArr = []

    for(i=0;i<arr.length;i++){
        for(j=0;j<arr[i].length;j++){
            newArr.push(arr[i][j].getValue());
        }
    }

    for(q=0;q<newArr.length;q++){
        if(newArr[q] === 0){
            return false;
        }
    }
    return true;
  }

  const playRound = (column) => {
    console.log(
      `Dropping ${getActivePlayer().name}'s token into column ${column}...`
    );
    board.dropToken(column, getActivePlayer().token);

    /*  This is where we would check for a winner and handle that logic,
        such as a win message. */
        const currentBoardState = board.getBoard();


        //check the array diagonally towards the right
        for(let currentArrIndex = currentBoardState.length-1;currentArrIndex >=0 ;currentArrIndex--){
          let diagonalElements = []
          let found = false;
  
          //Takes the current index Of the array
          let arrIndexAtaTime = currentArrIndex
  
          //This loop iterates over every element of a given array
          for(let currentIndex=0;currentIndex<20;currentIndex++){
              
              //Takes the currect index value and uses it to grab every diagonal value of the element in the 2d array
              let j = currentIndex;
      
              //loops throuh every array in the 2d and grabs the values in incremented way
              for(i=arrIndexAtaTime;i>=0;i--){
          
                  let currentArr = currentBoardState[i];
                  
                  if(currentArr[j] !== undefined){
                     diagonalElements.push(currentArr[j].getValue())
                  }
          
                  j++
              
              }
              //compares the pushed values if they are equal in 4 batches
              for(k=0;k<diagonalElements.length;k++){
                  let newArr = [diagonalElements[k],diagonalElements[k+1],diagonalElements[k+2],diagonalElements[k+3]];
                  if(areAllEqualButNotZero(newArr)){
                      console.log(`${getActivePlayer().name} is the winner`);
                      found = true;
                      winner = true;
                      break;
                  }
              }
      
              if(found) {
                  break;
              }
              diagonalElements = []
          
          }
          if(found){
              break;
          }
        }


        //Checks the diagonal part towards the left
        //This loop iterates from the bottom of the array to the top
        for(let currentArrIndex = currentBoardState.length-1;currentArrIndex >=0 ;currentArrIndex--){
          let diagonalElements = []
          let found = false;

          //Takes the current index Of the array
          let arrIndexAtaTime = currentArrIndex

          //This loop iterates over every element of a given array
          for(let currentIndex=20;currentIndex>=0;currentIndex--){
              
              //Takes the currect index value and uses it to grab every diagonal value of the element in the 2d array
              let j = currentIndex;
      
              //loops throuh every array in the 2d and grabs the values in incremented way
              for(i=arrIndexAtaTime;i>=0;i--){
          
                  let currentArr = currentBoardState[i];
                  
                  if(currentArr[j] !== undefined){
                    diagonalElements.push(currentArr[j].getValue())
                  }
          
                  j--
              
              }
              //compares the pushed values if they are equal in 4 batches
              for(k=0;k<diagonalElements.length;k++){
                  let newArr = [diagonalElements[k],diagonalElements[k+1],diagonalElements[k+2],diagonalElements[k+3]];
                  if(areAllEqualButNotZero(newArr)){
                    console.log(`${getActivePlayer().name} is the winner`);
                    found = true;
                    winner = true;
                  }
              }
      
              if(found) {
                  break;
              }
              diagonalElements = []
          
          }
          
          if(found){
              break;
          }
        }

        // Check the horizontal 
        for(i=currentBoardState.length-1;i>=0;i--){
          let currentArr = currentBoardState[i];
          let matching = false;
          for(j=0;j<currentArr.length;j++){
              let newArr =[]
              for(k=0;k<4;k++){
                  let currentItem = currentArr[j+k]
                  if(currentItem !== undefined){
                      newArr.push(currentItem.getValue());
                  }
              }
              if(newArr.length < 4) break;
              if(areAllEqualButNotZero(newArr)){
                  console.log(`${getActivePlayer().name} is the winner`);
                  matching = true;
                  winner = true;
                  break;
              }
          }
           if(matching) break;
        }

        //check vertical
        for(j=0;j<7;j++){
          let verticalElements = []
          let found = false;
      
      
          for(i=currentBoardState.length-1;i>=0;i--){
              let currentArr = currentBoardState[i];
              verticalElements.push(currentArr[j].getValue());
          }
      
          for(k=0;k<verticalElements.length;k++){
              let newArr = [verticalElements[k],verticalElements[k+1],verticalElements[k+2],verticalElements[k+3]];
              if(areAllEqualButNotZero(newArr)){
                  console.log(`${getActivePlayer().name} is the winner`);
                  found = true;
                  winner = true;
                  break;
              }
          }
      
          if(found) break;
          verticalElements = [];
        }

        //check for potential ties
        if(checkZero(currentBoardState)){
          winner = null;
          console.log('tied');
        }
        

        if(winner || winner === null) return;


    switchPlayerTurn();
    printNewRound();
  };

  function playAgain(){
    winner = false;
    board.clearBoard();
  }

  printNewRound();

  return {
    playRound,
    getWinner,
    playAgain,
    setNames,
    getActivePlayer,
    getBoard: board.getBoard
  };

}



function ScreenController() {
  const game = GameController();
  
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const displayWinner = document.querySelector('.playAgainDiv')
  const playAgainButton = document.querySelector('#playAgain')
  const startBtn = document.querySelector('.startBtn')
  const introScreen = document.querySelector('.IntroScreen')
  const playerOneName = document.querySelector('#playerOneName')
  const playerTwoName = document.querySelector('#playertwoName')


  const updateScreen = () => {

    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const winner = game.getWinner();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    // Render board squares
    board.forEach(row => {
      row.forEach((cell, index) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function 
        cellButton.dataset.column = index
        // cellButton.textContent = cell.getValue();

        if(cell.getValue() === 0){
          cellButton.textContent = 0
          cellButton.style.color = 'gray'
          cellButton.style.background = 'gray'
        }else if(cell.getValue() === 1){
          cellButton.textContent = 1
          cellButton.style.color = 'blue'
          cellButton.style.background = 'blue'
        }else{
          cellButton.textContent = 2
          cellButton.style.color = 'red'
          cellButton.style.background = 'red'
        }

        boardDiv.appendChild(cellButton);
      })

    })

    if(winner){
      playerTurnDiv.textContent = `${activePlayer.name} is the winner`
      displayWinner.style = `
                            display: flex;
                            justify-content: center;
                            background-color: rgba(255, 255, 255, 0.658);
                            align-items: center;`;

      playerOneName.value = '';
      playerTwoName.value = ''
      return;
    }else if(winner === null){
      playerTurnDiv.textContent = `A tie`;
      displayWinner.style = `
                            display: flex;
                            justify-content: center;
                            background-color: rgba(255, 255, 255, 0.658);
                            align-items: center;`;

      playerOneName.value = '';
      playerTwoName.value = ''
      return;
    }
  }

 
  playAgainButton.addEventListener("click",()=>{
    game.playAgain();
    updateScreen();
    displayWinner.style.display = 'none';

    introScreen.style = `
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              flex-direction: column;
                              z-index:100;
    `
  });


  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn) return;
    
    game.playRound(selectedColumn);
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);

  startBtn.addEventListener("click",()=>{

    if(playerOneName.value === "" || playerTwoName.value === "" ){
      playerOneName.value = ''
      playerTwoName.value = ''
      alert("Insert Valid name");
      return;
    }
    game.setNames(playerOneName.value,playerTwoName.value);
    introScreen.style.display = 'none';
    updateScreen();
  })

};

ScreenController();