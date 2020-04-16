export class Calculator {
    sum(numbers: number[]) {
        return numbers
            .reduce((prev, curr) => prev + curr, 0);
    }
}