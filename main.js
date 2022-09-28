const prompt = require('prompt-sync')({sigint: true});

class Field {
  constructor(field) {
    this.field = field;
    this.x = 0;
    this.y = 0;
    this.foundHat = false;
    this.hat = '^';
    this.hole = 'O';
    this.fieldCharacter = '░';
    this.pathCharacter = '*';
  }

  // Print the field in the command line
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

  // Verify the user input
  inputValid(input) {
    if(input !== 'r' && input !== 'l' && input !== 'u' && input !== 'd') {
        console.log('Invalid instruction! Try again :)');
        return false;
    } 
    return true;
  }

  // Verify if the player won or lost
  winOrLost(m, n) {
    if(m >= 0 && m < this.field.length
        && n >= 0 && n < this.field[0].length) {
        if(this.field[m][n] === this.hat) {
            console.log("You found your hat!");
            return true;
        } else if(this.field[m][n] === this.hole) {
            console.log("You fell down a hole! Start again :(");
            return true;
        } else {
            this.field[m][n] = this.pathCharacter;
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

  // Update the player location
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

  // Run the main game loop until the game is won or lost
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

  // Generate a random Field
  static generateField(width, height, level) {
    let fieldOptions = ['^', '░', 'O'];
    let area = (width * height);
    level = Math.floor(area * level / 100);
    
    let validField = false;

    // Create a valid Field with one hat
    while(!validField) {
      let newField = [];
      let countHat = 0;
      let countHole = 0;
      for(let i = 0; i < height; i++) {
        let newRow = [];
        for(let j = 0; j < width; j++) {
          if(i === 0 && j === 0) {
            newRow.push('*');
          } else {
            let validRandomIndex = false;

            // Create a random row
            while(!validRandomIndex) {
              let randomIndex = Math.floor(Math.random() * fieldOptions.length * 10 * area * level);
              switch(true) {
                case randomIndex >= 0 && randomIndex < (0.25 * area) && countHat === 0:
                  newRow.push(fieldOptions[0]);
                  countHat += 1;
                  validRandomIndex = true;
                  break;
                case randomIndex >= (0.25 * area) && randomIndex < (area * level * 8) && countHole <= level:
                  newRow.push(fieldOptions[2]);
                  countHole += 1;
                  validRandomIndex = true;
                  break;
                case randomIndex >= (area * level * 8) && randomIndex < (fieldOptions.length * 10 * area * level):
                  newRow.push(fieldOptions[1]);
                  validRandomIndex = true;
                  break;
              }
            }
          }
        }
        newField.push(newRow);
      }

      // Verify if it has one hat
      for(let i = 0; i < newField.length; i++) {
        if(newField[i].some((element) => element === '^')) {
          validField = true;
          return newField;
        }
      }
    }
  }
}

const myField = new Field([['*', '░', 'O'], ['░', 'O', '░'], ['░', '^', '░']]);
// myField.playGame();

const randomField = Field.generateField(10, 10, 40);

const myField2 = new Field(randomField);
myField2.playGame();