import {handleActions} from 'redux-actions';
import config from "../../config";

const SIGN_IN = 'SIGN_IN';

const ROOT_URL = config.server;

export const signInUser = (userId, userPw) => async dispatch => {
    console.log('start');
    var userData = {
        userId: userId,
        userPw: userPw
    };

    //로그인 서버로 post 형식으로 보냄
    const signInCheck = await fetch(`${ROOT_URL}/signIn`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const jsonData = await signInCheck.json();
    console.log('json : ' + jsonData.message);
    if (jsonData.message === 'logged in successfully') {
        dispatch({type: SIGN_IN, payload: true});
    } else {
        dispatch({type: SIGN_IN, payload: false});
    }

};


const initialState = {
    sample: "",
    pending: false,
    error: false,
    login: false,
};


export default handleActions({
    // ... state, sample : action.payload.date
    [SIGN_IN]: (state, action) => {
        return {
            ...state,
            login: action.payload,
        }
    }
}, initialState);