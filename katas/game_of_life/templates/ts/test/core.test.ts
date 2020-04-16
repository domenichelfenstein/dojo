import { expect } from "chai";
import { Calculator } from "../core/core";


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