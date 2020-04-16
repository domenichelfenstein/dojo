import { expect } from "chai";
import { FiFoQueue } from "../lib/Queue";

describe("Queues", () => {
    describe("FIFO Queue", () => {
        it("has size", () => {
            const q = new FiFoQueue();
            expect(q.size()).to.equal(0);
        })
    })
})

/*
    Part 1: FiFo Queue
        Methoden (aller Queues):
            - size(): number
            - enqueue(obj)
            - peek(): any
            - poll(): any
            - isEmpty(): boolean

    Part 2: QueueFactory
        QueueFactory.create(type: QueueModes): IQueue (QueueModes ist enum)
        Modes:
            - FIFO
            - FILO
            - LIFO
            - LILO
    
    Part 3: Testfälle selbst schreiben

    Part 4: Generics verwenden
*/