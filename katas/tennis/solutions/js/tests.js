var testSuite = {
    notUndefined_onStart: function() {
        var context = {
            playerA: 0,
            playerB: 0
        };

        var result = document.score(context, "a");

        assertNotEquals(result, undefined);
    },
    increasesScore_scenarios: function() {
        this._increasesScore(0, 0, "a", 1, "Fifteen", 0, "Love");
        this._increasesScore(0, 0, "b", 0, "Love", 1, "Fifteen");
        this._increasesScore(1, 0, "a", 2, "Thirty", 0, "Love");
        this._increasesScore(1, 1, "b", 1, "Fifteen", 2, "Thirty");
        this._increasesScore(1, 2, "b", 1, "Fifteen", 3, "Forty");
        this._increasesScore(1, 2, "a", 2, "Thirty", 2, "Thirty");

        this._increasesScore(2, 3, "a", 3, "Deuce", 3, "Deuce");
        this._increasesScore(3, 4, "a", 4, "Deuce", 4, "Deuce");
        this._increasesScore(3, 3, "a", 4, "Advantage A", 3, "");

        this._increasesScore(15, 16, "a", 16, "Deuce", 16, "Deuce");
        this._increasesScore(16, 16, "a", 17, "Advantage A", 16, "");

        this._increasesScore(1, 3, "b", 1, "", 4, "Player B wins");
        this._increasesScore(3, 1, "a", 4, "Player A wins", 1, "");
        this._increasesScore(4, 2, "a", 5, "Player A wins", 2, "");
    },
    concat_scenarios: function() {
        this._check_concat(0, "Love", 0, "Love", "Love - Love");
        this._check_concat(2, "Thirty", 3, "Forty", "Thirty - Forty");

        this._check_concat(3, "Deuce", 3, "Deuce", "Deuce");

        this._check_concat(6, "Advantage A", 5, "", "Advantage A");
        this._check_concat(5, "", 6, "Advantage B", "Advantage B");
        
        this._check_concat(7, "Player A wins", 5, "", "Player A wins");
    },

    _check_concat: function(pointsA, labelA, pointsB, labelB, expected) {
        var context = {
            playerA: pointsA,
            labelA: labelA,
            playerB: pointsB,
            labelB: labelB
        };

        var result = document.concatScore(context);

        assertEquals(result, expected);
    },

    _increasesScore: function(startA, startB, player, expectedA, expectedLabelA, expectedB, expectedLabelB) {
        var context = {
            playerA: startA,
            playerB: startB
        };

        var result = document.score(context, player);

        assertEquals(result.playerA, expectedA);
        assertEquals(result.playerB, expectedB);
        assertEquals(result.labelA, expectedLabelA);
        assertEquals(result.labelB, expectedLabelB);
    }
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