document.score = function(context, player) {
    let result = context;
    if(player === "a") {
        result.playerA++;
    } else if(player === "b") {
        result.playerB++;
    }

    result.labelA = getLabel(result.playerA, result.playerB, "A");
    result.labelB = getLabel(result.playerB, result.playerA, "B");

    return result;
}

function getLabel(point, otherPoint, name) {
    if(isWin(point, otherPoint)) {
        return `Player ${name} wins`;
    }
    if(isWin(otherPoint, point)) {
        return "";
    }

    if(point >= 3 && otherPoint >= 3) {
        if(point > otherPoint) {
            return `Advantage ${name}`;
        }
        if(otherPoint > point) {
            return "";
        }

        return "Deuce";
    }
    switch(point) {
        case 1: return "Fifteen";
        case 2: return "Thirty";
        case 3: return "Forty";
    }

    return "Love";
}

function isWin(point, other) {
    return point >= 4 && point - other >= 2;
}

let simpleStrings = ["Advantage", "wins", "Deuce"];
document.concatScore = function(context) {
    if(isSimple(context.labelA)) {
        return context.labelA;
    }
    
    if(isSimple(context.labelB)) {
        return context.labelB;
    }
    return `${context.labelA} - ${context.labelB}`;
}

function isSimple(text) {
    for (let i = 0; i < simpleStrings.length; i++) {
        if(text.includes(simpleStrings[i])) {
            return true;
        }
    }
    return false;
}