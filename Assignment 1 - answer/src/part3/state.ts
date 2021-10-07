import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "node:constants";
import { F } from "ramda";

export type State<S, A> = (initialState: S) => [S, A];

export const bind: <S, A, B>(state: State<S, A>, f: (x: A) => State<S, B>) => State<S, B> = (state,f)=> {
        return (initialState) => { 
        const first = state(initialState); //[S,A]
        const state_2 = f(first[1]); // f(A) -> State<S,B>
        const second = state_2(first[0]); //[S,B]
        return second;
    }
}

