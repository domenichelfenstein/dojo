export function createGridWithAllCellsDead(width, height) {
    let grid = new Array(width);
    for (let i = 0; i < width; i++) {
        grid[i] = new Array(height);
        for (let j = 0; j < height; j++) {
            grid[i][j] = false;
        }
    }

    return grid;
}

export function isAlive(grid, x, y) {
    const width = grid.length;
    const height = grid[0].length;

    if (x < 0 || x >= width) {
        return false;
    }

    if (y < 0 || y >= height) {
        return false;
    }

    return grid[x][y];
}

export function countLivingNeighbors(grid, x, y) {
    let count = 0;

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i == x && j == y) {
                continue;
            }

            if (isAlive(grid, i, j)) {
                count++;
            }
        }
    }

    return count;
}

export function isCellAliveInNextGeneration(grid, x, y) {
    let livingNeighbours = countLivingNeighbors(grid, x, y);

    if (isAlive(grid, x, y)) {
        if (livingNeighbours < 2) {
            return false;
        }

        if (livingNeighbours > 3) {
            return false;
        }

        if (livingNeighbours == 2 || livingNeighbours == 3) {
            return true;
        }
    }

    return livingNeighbours == 3;
}