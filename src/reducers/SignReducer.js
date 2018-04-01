import * as types from "../actions/SignActionTypes";

const initalState = {

};

export default sign = (state=initalState, action) => {
    switch(action.type){
        case types.SIGN_IN:
            return {
                ...state,

            };
        case types.SIGN_UP:
            return {
                ...state,

            };
        default:
            return state;
    }
}