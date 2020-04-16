import pipe from "./functional.util.js"

export const createEmptyGrid = (width, height) =>
    Array.from(
        Array(width),
        () => Array.from(
            Array(height),
            () => false))

            export const copyGrid = grid =>
    Array.from(grid.map(column => Array.from(column)))

    export const changeState = (grid, x, y, newState) => {
    const newGrid = copyGrid(grid)
    newGrid[x][y] = newState
    return newGrid
}

export const isAliveAndExisting = (grid, x, y) => {
    const width = grid.length;
    const height = grid[0].length;

    const isInbound = (size, index) =>
        index >= 0 && index < size;

    return (!isInbound(width, x) || !isInbound(height, y))
        ? false
        : grid[x][y];
}

export const countLivingNeighbors = (grid, x, y) => {
    const increaseIfAlive = (t, a, b) =>
        t += isAliveAndExisting(grid, a, b)
    return pipe(
        t => increaseIfAlive(t, x - 1, y),
        t => increaseIfAlive(t, x + 1, y),
        t => increaseIfAlive(t, x, y - 1),
        t => increaseIfAlive(t, x, y + 1),
        t => increaseIfAlive(t, x - 1, y - 1),
        t => increaseIfAlive(t, x + 1, y - 1),
        t => increaseIfAlive(t, x - 1, y + 1),
        t => increaseIfAlive(t, x + 1, y + 1)
    )(0);
}

export const calculateNextGeneration = (oldGrid) => {
    const calculatesNextGenerationOfCell = (x, y) => {
        const livingNeighbors = countLivingNeighbors(oldGrid, x, y);
        const isAlive = isAliveAndExisting(oldGrid, x, y);

        if (isAlive) {
            if (livingNeighbors < 2) {
                return false
            }
            if (livingNeighbors === 2 || livingNeighbors === 3) {
                return true
            }
            if (livingNeighbors > 3) {
                return false
            }
        } else {
            if (livingNeighbors === 3) {
                return true
            }
        }
        return isAlive;
    }

    const newGrid = copyGrid(oldGrid)

    return newGrid
        .map((column, x) => column
            .map((cell, y) => calculatesNextGenerationOfCell(x, y)));
}