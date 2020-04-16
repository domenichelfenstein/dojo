// Had to use a hack, because chai isn't fully ESM-compatible yet
import { default as chai } from "chai";
const { expect } = chai;

import { Calculator } from "../core/core.js";


describe("My application", () => {
    describe("Some component within the application", () => {
        let calculator;
        beforeEach(() => calculator = new Calculator())

        it("should do something, when something happened", () => {
            const result = calculator.sum([1, 2, 3]);

            expect(result).to.equal(6);
        })
    })
})