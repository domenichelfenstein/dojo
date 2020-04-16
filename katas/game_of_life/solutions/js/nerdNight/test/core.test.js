// Had to use a hack, because chai isn't fully ESM-compatible yet
import { default as chai } from "chai";
const { expect } = chai;

import { countLivingNeighbors, createGridWithAllCellsDead, isCellAliveInNextGeneration } from "../core/core.js";

describe("Game of Life", () => {
  describe("isAliveCheck", () => {
    it("should return true if cell is alive (1)", () => {
      // arrange
      const grid = createGridWithAllCellsDead(1, 1);
      grid[0][0] = true;

      // act
      const result = grid[0][0];

      // assert
      expect(result).to.equal(true);
    });
    it("should return true if cell is alive (2)", () => {
      // arrange
      const grid = createGridWithAllCellsDead(2, 2);
      grid[1][0] = true;

      // act
      const result = grid[0][1];

      // assert
      expect(result).to.equal(false);
    });
  });
  describe("count neighbours tests", () => {
    it("should return the correct count of alive neighbours (1)", () => {
      // arrange
      const grid = createGridWithAllCellsDead(3, 3);
      grid[1][1] = true;

      grid[0][0] = true;
      grid[2][1] = true;

      // act
      const result = countLivingNeighbors(grid, 1, 1);

      // assert
      expect(result).to.equal(2);
    });
    it("should return the correct count of alive neighbours (2)", () => {
      // arrange
      const grid = createGridWithAllCellsDead(3, 3);
      grid[1][1] = true;

      grid[0][0] = true;
      grid[2][1] = true;

      // act
      const result = countLivingNeighbors(grid, 1, 1);

      // assert
      expect(result).to.equal(2);
    });
    it("should not exceed array boundaries", () => {
      // arrange
      const grid = createGridWithAllCellsDead(3, 3);
      grid[0][0] = true;
      grid[0][1] = true;
      grid[1][0] = true;

      // act
      const result = countLivingNeighbors(grid, 0, 0);

      // assert
      expect(result).to.equal(2);
    });
  });
  describe("isCellAliveInNextGeneration", () => {
    it("should return false with 1 neighbours", () => {
      // arrange
      const grid = createGridWithAllCellsDead(2, 2);
      grid[0][0] = true;
      grid[0][1] = true;

      // act
      const result = isCellAliveInNextGeneration(grid, 0, 0);

      // assert
      expect(result).to.equal(false);
    });
    it("should return false with 4 neighbours", () => {
      // arrange
      const grid = createGridWithAllCellsDead(3, 3);
      grid[1][1] = true;

      grid[0][1] = true;
      grid[1][0] = true;
      grid[2][1] = true;
      grid[1][2] = true;

      // act
      const result = isCellAliveInNextGeneration(grid, 1, 1);

      // assert
      expect(result).to.equal(false);
    });
  });
  describe("Check two or three neighbours", () => {
    it("should return true with two neighbours", () => {
      // arrange
      const grid = createGridWithAllCellsDead(2, 2);
      grid[0][0] = true;
      grid[1][0] = true;
      grid[0][1] = true;

      // act
      const result = isCellAliveInNextGeneration(grid, 0, 1);

      // assert
      expect(result).to.equal(true);
    });
    it("should return true with three neighbours", () => {
      // arrange
      const grid = createGridWithAllCellsDead(2, 2);
      grid[0][0] = true;
      grid[1][0] = true;
      grid[1][1] = true;
      grid[0][1] = true;

      // act
      const result = isCellAliveInNextGeneration(grid, 0, 1);

      // assert
      expect(result).to.equal(true);
    });
  });
  describe("dead cell", () => {
    it("should return true with three neighbours", () => {
      // arrange
      const grid = createGridWithAllCellsDead(2, 2);
      grid[0][0] = false;
      grid[1][0] = true;
      grid[1][1] = true;
      grid[0][1] = true;

      // act
      const result = isCellAliveInNextGeneration(grid, 0, 0);

      // assert
      expect(result).to.equal(true);
    });
  });
});
