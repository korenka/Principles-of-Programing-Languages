import * as R from "ramda";
import { emitKeypressEvents } from "readline";

const stringToArray = R.split("");

/* Question 1 */
const Vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
const checkVowel = (x: string) : boolean => Vowels.includes(x);
export const countVowels = (x: string) : number => {return(R.filter(checkVowel, stringToArray(x))).length;};

/* Question 2 */
const countLetters = (x: string[], counter: number, index: number): string => {
    if (index === x.length-1) {
        return x[index];
    }
    if (x[index] === x[index+1]) {
        return countLetters(x, counter +1, index +1);
    }
    else {

        return x[index] + counter +countLetters(x, 1, index + 1);
    } 
}

export const runLengthEncoding = (x: string) : string => {
    const counter: number = 1;
    const index: number = 0;
    const toCount = stringToArray(x);
    return countLetters(toCount, counter, index); 
}

// /* Question 3 */
const openBrack = ["{", "[", "("];
const closingBrack = ["}", "]", ")"];

const checkBracket = (inputArray: string[], index: number, finalArr: string[]): boolean => {
     //stop condition
    if(index === inputArray.length){
        if (finalArr.length === 0) {return true;}
        else {return false;}
    }
    if(openBrack.includes(inputArray[index])){
        const temp: string[] = [inputArray[index]];
        const newArr: string[] = finalArr.concat(temp);
        return checkBracket(inputArray, index + 1, newArr);
    }

    if(closingBrack.includes(inputArray[index])){
        if (inputArray[index] === "]" && finalArr[finalArr.length-1] === "["){
            const slicedArr: string[] = finalArr.slice(0,finalArr.length-1);
            return checkBracket(inputArray, index + 1, slicedArr);
        }
        else if (inputArray[index] === ")" && finalArr[finalArr.length-1] === "(") {
            const slicedArr: string[] = finalArr.slice(0,finalArr.length-1);
           return checkBracket(inputArray, index + 1, slicedArr);
        }
        else if (inputArray[index] === "}" && finalArr[finalArr.length-1] === "{") {
            const slicedArr: string[] = finalArr.slice(0,finalArr.length-1);
            return checkBracket(inputArray, index + 1, slicedArr);
        }
    }
        return checkBracket(inputArray, index + 1, finalArr);
}


export const isPaired = (x: string) : boolean => {
    const index: number = 0;
    const inputArray: string[] = stringToArray(x);
    const finalArr: string[] = [];
    return checkBracket(inputArray, index, finalArr);



}


// //tests
console.log(countVowels("This is SOME Text"));
console.log(runLengthEncoding("aaaabbbccd"));
console.log(isPaired("({ab1}c){"));
