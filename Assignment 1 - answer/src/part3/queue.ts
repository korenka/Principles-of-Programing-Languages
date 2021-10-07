import { State, bind } from "./state";

export type Queue = number[];

export const enqueue: (x: number) => State<Queue, undefined> = (x: number) => (q: Queue) => {
    return [q.concat([x]) ,undefined];
}


export const dequeue: State<Queue, number> = (q: Queue) => {
    return [q.slice(1), q[0]];
}

export const queueManip: State<Queue, number> = bind(dequeue, (x: number) => bind(enqueue(x*2), (y: undefined) => bind(enqueue(x/3), () => dequeue)));
