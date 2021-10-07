import { Result, makeFailure, makeOk, bind, either, isFailure } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult = <T>(pred: (x: T) => boolean, a: T[]): Result<T> => {
    if  (a.some(pred) === false){
        return makeFailure("Failure");
    }
    const ret: T[] = a.filter(pred);
    return makeOk(ret[0]);
}

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

const isEven = (x: number) : boolean  => {
    return x%2===0;
}

export const returnSquaredIfFoundEven_v2 = (a: number[]): Result<number> => {
    return bind(findResult(isEven, a), x => makeOk(x*x));
}



export const returnSquaredIfFoundEven_v3 = (arr:number[]): Result<number> | number => {
    return either(findResult(isEven, arr), x => x*x, () => -1);
}



const a: number[] = [1,2,3,4,5];

console.log(findResult(isEven,a));
