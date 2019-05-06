var testSuite = {
    game: function() {
        this._check_score([], 0);
        this._check_score([1], 1);
        this._check_score([1, 1], 2);
        this._check_score([5, 4, 3], 12);
        this._check_score([5, 5, 3], 16);
        this._check_score([10, 3, 3], 22);
        this._check_score([10, 10, 10], 60);
        this._check_score([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 300);
    },

    _check_score: function(rolls, expected) {
        var game = new document.Game();
        rolls.forEach(pins => {
            game.roll(pins);
        });

        var result = game.getScore();

        assertEquals(result, expected);
    },
};
for (const testName in testSuite) {
    if (!testName.startsWith("_")) {
        try {
            testSuite[testName]();
        } catch(e) {
            console.error(testName + ":");
            throw e;
        }
    }
}

function assertNotEquals(a, b) {
    if(a === b) {
        throw new Error(`expected ${JSON.stringify(b)} NOT to be ${JSON.stringify(a)}`);
    }
}
function assertEquals(a, b) {
    if(a !== b) {
        throw new Error(`expected ${JSON.stringify(b)}, but was ${JSON.stringify(a)}`);
    }
}