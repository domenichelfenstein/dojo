import { expect } from "chai";
import pipe from "../core/functional.util";
import { calculateNextGeneration, createEmptyGrid, changeState, countLivingNeighbors } from "../core/gameOfLife"

/*
Approach:
1. Function that creates an empty grid
2. Function that sets cell to alive/dead state
3. Function that counts living neighbors
4. Function that applies rules (therefore calculates next generation)
5. UI that lets you set the initial state of the board as well as gives you control over play/pause functionality
*/

describe("Conway's GOF", () => {
    describe("Empty grid creator", () => {
        it("can create a minimal grid", () => {
            const grid = createEmptyGrid(1, 1);
            expect(grid[0][0]).to.equal(false);

        })

        it("can create a normal sized grid", () => {
            const grid = createEmptyGrid(4, 6);
            expect(grid[3][5]).to.equal(false);
            expect(grid[2][1]).to.equal(false);

        })
    })

    describe("Cell state changer", () => {
        let grid;
        beforeEach(() => grid = createEmptyGrid(4, 4))

        it("can change state", () => {
            const newGrid = changeState(grid, 2, 2, true);
            expect(newGrid[2][2]).to.equal(true)
        })

        it("should keep old state change state", () => {
            changeState(grid, 2, 2, true);
            expect(grid[2][2]).to.equal(false)
        })

        it("can change state back", () => {
            const newGrid = changeState(grid, 2, 2, true);
            const newerGrid = changeState(newGrid, 2, 2, false);
            expect(newerGrid[2][2]).to.equal(false)
        })
    })

    describe("Living neighbor counter", () => {
        let grid;
        beforeEach(() => grid = createEmptyGrid(4, 8))

        it("returns 0 by default", () => {
            expect(countLivingNeighbors(grid, 1, 4)).to.equal(0)
        })

        it("can find 1 living neighbor", () => {
            const alteredGrid = changeState(grid, 0, 3, true);
            expect(countLivingNeighbors(alteredGrid, 1, 4)).to.equal(1)
        })

        it("can find 2 living neighbors", () => {
            const alteredGrid = pipe(
                g => changeState(g, 0, 3, true),
                g => changeState(g, 0, 4, true),
            )(grid);
            expect(countLivingNeighbors(alteredGrid, 1, 4)).to.equal(2)
        })

        it("can find 8 living neighbors", () => {
            const alteredGrid = pipe(
                g => changeState(g, 0, 3, true),
                g => changeState(g, 0, 4, true),
                g => changeState(g, 0, 5, true),
                g => changeState(g, 1, 5, true),
                g => changeState(g, 2, 5, true),
                g => changeState(g, 2, 4, true),
                g => changeState(g, 2, 3, true),
                g => changeState(g, 1, 3, true),
            )(grid);
            expect(countLivingNeighbors(alteredGrid, 1, 4)).to.equal(8)
        })

        it("can find 3 living neighbors on top left corner cell", () => {
            const alteredGrid = pipe(
                g => changeState(g, 0, 1, true),
                g => changeState(g, 1, 1, true),
                g => changeState(g, 1, 0, true),
            )(grid);
            expect(countLivingNeighbors(alteredGrid, 0, 0)).to.equal(3)
        })
    })

    describe("Next generation calculator", () => {
        let grid;
        beforeEach(() => grid = createEmptyGrid(4, 8))

        describe("any live cell", () => {
            describe("with fewer than two live neighbours", () => {
                it("dies, as if by underpopulation (1)", () => {
                    const alteredGrid = pipe(
                        g => changeState(g, 2, 2, true),
                        g => changeState(g, 2, 3, true),
                        calculateNextGeneration
                    )(grid);
                    expect(alteredGrid[2][2]).to.equal(false)
                })
                it("dies, as if by underpopulation (2)", () => {
                    const alteredGrid = pipe(
                        g => changeState(g, 2, 2, true),
                        calculateNextGeneration
                    )(grid);
                    expect(alteredGrid[2][2]).to.equal(false)
                })
            })

            describe("with two or three live neighbours", () => {
                it("lives on to the next generation (1)", () => {
                    const alteredGrid = pipe(
                        g => changeState(g, 2, 2, true),
                        g => changeState(g, 2, 3, true),
                        g => changeState(g, 1, 2, true),
                        calculateNextGeneration
                    )(grid);
                    expect(alteredGrid[2][2]).to.equal(true)
                })
                it("lives on to the next generation (2)", () => {
                    const alteredGrid = pipe(
                        g => changeState(g, 2, 2, true),
                        g => changeState(g, 2, 3, true),
                        g => changeState(g, 1, 2, true),
                        g => changeState(g, 1, 1, true),
                        calculateNextGeneration
                    )(grid);
                    expect(alteredGrid[2][2]).to.equal(true)
                })
            })

            describe("with more than three live neighbours", () => {
                it("dies, as if by overpopulation", () => {
                    const alteredGrid = pipe(
                        g => changeState(g, 2, 2, true),
                        g => changeState(g, 2, 3, true),
                        g => changeState(g, 1, 2, true),
                        g => changeState(g, 1, 1, true),
                        g => changeState(g, 3, 2, true),
                        calculateNextGeneration
                    )(grid);
                    expect(alteredGrid[2][2]).to.equal(false)
                })
            })
        })

        describe("any dead cell", () => {
            describe("with exactly three live neighbours", () => {
                it("becomes a live cell, as if by reproduction", () => {
                    const alteredGrid = pipe(
                        g => changeState(g, 2, 2, false),
                        g => changeState(g, 2, 3, true),
                        g => changeState(g, 1, 2, true),
                        g => changeState(g, 1, 1, true),
                        calculateNextGeneration
                    )(grid);
                    expect(alteredGrid[2][2]).to.equal(true)
                })
            })
        })
    })
})