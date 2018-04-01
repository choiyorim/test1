export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";

export function signin(){
    return{
        type: SIGN_IN
    }
}

export function signup(){
    return{
        type: SIGN_UP
    }
}