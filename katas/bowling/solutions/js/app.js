document.Game = class Game {
    constructor() {
        this.rolls = [];
    }

    roll(pinsDown) {
        this.rolls.push(pinsDown);
    }
    
    getScore() {
        var score = 0;

        for (let roll = 0; roll < this.rolls.length;) {
            if(this._isSpare(roll)) {
                score += 10 + this._getPin(roll + 2);
                roll += 2;
            } else if(this._isStrike(roll)) {
                score += 10 + this._getPin(roll + 1) + this._getPin(roll + 2);
                roll += 1;
            } else {
                score += this._getPin(roll) + this._getPin(roll + 1);
                roll += 2;
            }
        }

        return score;
    }

    _getPin(i) {
        return this.rolls[i] ? this.rolls[i] : 0;
    }

    _isStrike(roll) {
        return this._getPin(roll) == 10;
    }

    _isSpare(roll) {
        return this._getPin(roll) + this._getPin(roll + 1) == 10;
    }
}