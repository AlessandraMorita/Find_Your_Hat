const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.x = 0;
    this.y = 0;
    this.foundHat = false;
  }

  print() {
    let fieldImg = [];
    for(let i = 0; i < this.field.length; i++) {
        for(let j = 0; j < this.field[i].length; j++) {
            fieldImg.push(this.field[i][j]);
        }
        fieldImg.push("\n");
    }
    return console.log(fieldImg.join(""));
  }

  inputValid(input) {
    if(input !== 'r' && input !== 'l' && input !== 'u' && input !== 'd') {
        console.log('Invalid instruction! Try again :)');
        return false;
    } 
    return true;
  }

  winOrLost(m, n) {
    if(m >= 0 && m < this.field.length
        && n >= 0 && n < this.field[0].length) {
        if(this.field[m][n] === hat) {
            console.log("You found your hat!");
            return true;
        } else if(this.field[m][n] === hole) {
            console.log("You fell down a hole! Start again :(");
            return true;
        } else {
            this.field[m][n] = pathCharacter;
            this.print();
            this.x = m;
            this.y = n;
            return false;
        }  
    } else {
        console.log('Out of the Field! Try again :)');
        return false;
    }
  }

  move(diretion) {
    let xNew = this.x;
    let yNew = this.y;
    switch(diretion) {
        case 'r':
            xNew += 0;
            yNew += 1;
            break;
        case 'l':
            xNew += 0;
            yNew += -1;
            break;
        case 'u':
            xNew += -1;
            yNew += 0;
            break;
        case 'd':
            xNew += 1;
            yNew += 0;
            break;
    }
    return {xNew, yNew};
  }

  playGame() {
    this.print();
    while(!this.foundHat) {
        let diretion = prompt('r = right | l = left | u = up | d = down | Which way?: ');
        if(this.inputValid(diretion) === true) {
            let {xNew, yNew} = this.move(diretion);
            this.foundHat = this.winOrLost(xNew, yNew);
        }
    };
  }
}

const myField = new Field([['*', '░', 'O'], ['░', 'O', '░'], ['░', '^', '░']]);
myField.playGame();
