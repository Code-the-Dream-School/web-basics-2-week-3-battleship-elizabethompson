const Battleship = {
  boardSize: 4,
  shipCount: 4,
  playerFactory: function (name) {
    const shipCount = this.shipCount
    const gameBoard = this.boardFactory(shipCount)
    return { name, shipCount, gameBoard }
  },
  boardFactory: function (shipCount) {
    const gameBoard = JSON.parse(
      JSON.stringify(Array(shipCount).fill(Array(shipCount).fill(0)))
    )
    const randomCoordinates = { x: 0, y: 0 }
    let addedShipCount = 0

    while (addedShipCount < shipCount) {
      let { x, y } = randomCoordinates
      x = Math.floor(Math.random() * Math.floor(this.boardSize))
      y = Math.floor(Math.random() * Math.floor(this.boardSize))

      if (gameBoard[x][y] !== 1) {
        gameBoard[x][y] = 1
        addedShipCount++
      }
    }

    return [...gameBoard]
  },
  playGame: function () {
    const players = [
      this.playerFactory(prompt('Player 1: Enter your name') || 'Player 1'),
      this.playerFactory(prompt('Player 2: Enter your name') || 'Player 2'),
    ]

    let currentPlayer = 0
    let losingPlayer = {}

    while (!losingPlayer) {
      const nextPlayer = players[currentPlayer + 1] ? currentPlayer + 1 : 0

      const response = prompt(
        `${players[currentPlayer].name}: Pick a location to strike! x,y`
      )

      const coordinates = { x: response.charAt(0), y: response.charAt(2) }
      const { x, y } = coordinates

      if (players[nextPlayer].gameBoard[x][y] === 1) {
        players[nextPlayer].gameBoard[x][y] = 'x'
        players[nextPlayer].shipCount--
      }

      losingPlayer = players.find((player) => player.shipCount <= 0)
      currentPlayer = nextPlayer
    }

    return `${losingPlayer.name} lost the game!`
  },
}

const gameResult = Battleship.playGame()

const htmlTarget = document.getElementById('result')
htmlTarget.innerHTML = gameResult
