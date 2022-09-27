const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
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
}

let x = 0;
let y = 0;
const myField = new Field([['*', '░', 'O'], ['░', 'O', '░'], ['░', '^', '░']]);
myField.print();
let foundHat = false;
let xNew = x;
let yNew = y;
while(!foundHat) {
    let diretion = prompt('r = right | l = left | u = up | d = down | Which way?: ');
    if(diretion !== 'r' && diretion !== 'l' && diretion !== 'u' && diretion !== 'd') {
        console.log('Invalid instruction! Try again :)');
    } else {
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
        
        if(xNew >= 0 && xNew < myField.field.length
            && yNew >= 0 && yNew < myField.field[0].length) {
            if(myField.field[xNew][yNew] === hat) {
                console.log("You found your hat!");
                foundHat = true;
            } else if(myField.field[xNew][yNew] === hole) {
                console.log("You fell down a hole! Start again :(");
                foundHat = true;
            } else {
                myField.field[xNew][yNew] = pathCharacter;
                myField.print();
                x = xNew;
                y = yNew;
            }  
        } else {
            console.log('Out of the Field! Try again :)');
        }
    }
};