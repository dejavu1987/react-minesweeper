export default class Minesweeper {
  constructor(level) {
    this.boardMax = 5 + level * 2;
    this.board = new Array(this.boardMax)
      .fill("")
      .map((x) => new Array(this.boardMax).fill(""));

    this.mines = [];

    while (this.mines.length < level * level + 5) {
      const newMine = `${this.randomMax(this.boardMax)},${this.randomMax(
        this.boardMax
      )}`;
      if (!this.mines.includes(newMine)) this.mines.push(newMine);
    }
    this.filledBoard = this.getFilledBoard();
  }

  randomMax(max) {
    return Math.floor(Math.random() * max);
  }

  // @TODO Optimize?
  addMine(mine, filledBoard) {
    filledBoard[mine[0]][mine[1]] = "💣";
    if (mine[0] > 0) {
      if (mine[1] > 0) {
        let nw = filledBoard[mine[0] - 1][mine[1] - 1];
        if (nw !== "💣") {
          filledBoard[mine[0] - 1][mine[1] - 1] = !isNaN(nw) ? ++nw : 1;
        }
      }
      if (mine[1] < this.boardMax - 1) {
        let ne = filledBoard[mine[0] - 1][mine[1] + 1];
        if (ne !== "💣") {
          filledBoard[mine[0] - 1][mine[1] + 1] = !isNaN(ne) ? ++ne : 1;
        }
      }
      let n = filledBoard[mine[0] - 1][mine[1]];
      if (n !== "💣") {
        filledBoard[mine[0] - 1][mine[1]] = !isNaN(n) ? ++n : 1;
      }
    }
    if (mine[0] < this.boardMax - 1) {
      if (mine[1] > 0) {
        let sw = filledBoard[mine[0] + 1][mine[1] - 1];
        if (sw !== "💣") {
          filledBoard[mine[0] + 1][mine[1] - 1] = !isNaN(sw) ? ++sw : 1;
        }
      }
      if (mine[1] < this.boardMax - 1) {
        let se = filledBoard[mine[0] + 1][mine[1] + 1];
        if (se !== "💣") {
          filledBoard[mine[0] + 1][mine[1] + 1] = !isNaN(se) ? ++se : 1;
        }
      }
      let s = filledBoard[mine[0] + 1][mine[1]];
      if (s !== "💣") {
        filledBoard[mine[0] + 1][mine[1]] = !isNaN(s) ? ++s : 1;
      }
    }
    if (mine[1] > 0) {
      let w = filledBoard[mine[0]][mine[1] - 1];
      if (w !== "💣") {
        filledBoard[mine[0]][mine[1] - 1] = !isNaN(w) ? ++w : 1;
      }
    }
    if (mine[1] < this.boardMax - 1) {
      let e = filledBoard[mine[0]][mine[1] + 1];
      if (e !== "💣") {
        filledBoard[mine[0]][mine[1] + 1] = !isNaN(e) ? ++e : 1;
      }
    }
  }

  getFilledBoard() {
    const filledBoard = [...this.board];
    this.mines.forEach((mine) => {
      this.addMine(
        mine.split(",").map((c) => parseInt(c)),
        filledBoard
      );
    });
    return filledBoard;
  }
}
