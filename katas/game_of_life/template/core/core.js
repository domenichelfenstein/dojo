export class Calculator {
    sum(numbers) {
        return numbers
            .reduce((prev, curr) => prev + curr, 0);
    }
}