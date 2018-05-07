import {handleActions} from 'redux-actions';
import config from "../../config";


const ROOT_URL = config.server;

const SIGN_IN = 'SIGN_IN';
const SIGN_IN_ID = 'SIGN_IN_ID';
const SIGN_IN_PWD = 'SIGN_IN_PWD';
const Terms2 ='Terms2';
const SIGN_UP_MODAL = 'SIGN_UP_MODAL';
const TERMS_FIRST_CHECKED = 'TERMS_FIRST_CHECKED';
const TERMS_SECOND_CHECKED = 'TERMS_SECOND_CHECKED';
const TERMS_FIRST_MODAL = 'TERMS_FIRST_MODAL';
const TERMS_SECOND_MODAL = 'TERMS_SECOND_MODAL';

const initialState = {
    sample: "",
    pending: false,
    error: false,
    login: false,
    id: '',
    pwd: '',
    register:false,
    currentPosition: 0,
    termsModal:false,
    userIdCheckModal:false,
    userEmailCheckModal:false,
    isFirstChecked: false,
    isSecondChecked: false,
    firstVisible: false,
    secondVisible: false,
    userId: undefined,
    userPw: undefined,
    userRePw: undefined,
    userNickName: undefined,
    email: undefined,
    major: undefined,
    minor: undefined,
    doubleMajor: undefined,
    connectedMajor: undefined,
    admissionYear: undefined,
    firstTerms:'',
    termsText:''
};

export const handleSignInId = (id) => dispatch => {
    dispatch({type:SIGN_IN_ID, payload:id});
};
export const handleSignInPwd = (pwd) => dispatch => {
    dispatch({type:SIGN_IN_PWD, payload:pwd});
};

export const handleSignUpModal = () => dispatch => {
    dispatch({type:SIGN_UP_MODAL});
};

export const handleTermsFirstCheck = () => dispatch => {
    dispatch({type:TERMS_FIRST_CHECKED});
};

export const handleTermsFirstModal = (modal) => dispatch => {
    dispatch({type:TERMS_FIRST_MODAL, payload: modal});
};

export const handleTermsSecondCheck = () => dispatch => {
    dispatch({type:TERMS_SECOND_CHECKED});
};

export const handleTermsSecondModal = (modal) => dispatch => {
    dispatch({type:TERMS_SECOND_MODAL, payload: modal});
};


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
    console.log('json : ' + jsonData.statusCode);
    if (jsonData.statusCode == 200) {
        dispatch({type: SIGN_IN, payload: true});
    } else {
        dispatch({type: SIGN_IN, payload: false});
    }


};
export const modal2 =() =>async dispatch =>{
    const signInTerms2 = await fetch(`${ROOT_URL}/terms/privacyPolicy`);
    const jsonData = await signInTerms2.json();
    if(jsonData.statusCode==200){
        dispatch({type:Terms2, payload:jsonData.result});
    }else{
        dispatch({type:Terms2, payload:false});
    }
}

export const checkUserId = (userId) => async dispatch => {
    const userIdCheck = await fetch(`${ROOT_URL}/userValidation/checkUserId/${userId}`);
    const jsonData = await userIdCheck.json();
    console.log('check dup id : ', jsonData.statusCode);
    if (jsonData.statusCode == 200) {
        return true;
    } else {
        return false;
    }
};

export const checkUserEmail = (email) => async dispatch => {
    const userIdCheck = await fetch(`${ROOT_URL}/userValidation/checkEmail/${email}`);
    const jsonData = await userIdCheck.json();
    console.log('check dup email : ', jsonData.statusCode);
    if (jsonData.statusCode == 200) {
        return true;
    } else {
        return false;
    }
};

export const signUpUser = (userId, userPw, userNickName, email, major, minor, doubleMajor, connectedMajor, admissionYear) => async dispatch => {
    let userData = {
        userId: userId,
        userPw: userPw,
        userNickName: userNickName,
        email: email,
        major: major,
        minor: minor,
        doubleMajor: doubleMajor,
        connectedMajor: connectedMajor,
        admissionYear: admissionYear
    };

    //서버로 전송
    const signUpCheck = await fetch( `${ROOT_URL}/signUp`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const jsonData = await signUpCheck.json();
    if(jsonData.statusCode == 200){
        return true;
    } else {
        return false;
    }
};




export default handleActions({
    // ... state, sample : action.payload.date
    [SIGN_IN]: (state, action) => {
        return {
            ...state,
            login: action.payload,
        }
    },
    [Terms2]:(state, action)=>{
        return {
            ...state,
            termsText: action.payload,
        }
    },

    [SIGN_IN_ID]: (state, action) => {
        return {
            ...state,
            id: action.payload,
        }
    },
    [SIGN_IN_PWD]: (state, action) => {
        return {
            ...state,
            pwd: action.payload
        }
    },
    [SIGN_UP_MODAL]: (state, action) => {
        return {
            ...state,
            register: !state.register,
        }
    },
    [TERMS_FIRST_CHECKED]: (state, action) => {
        return {
            ...state,
            isFirstChecked: !state.isFirstChecked
        }
    },
    [TERMS_FIRST_MODAL]: (state, action) => {
        return {
            ...state,
            firstVisible: action.payload
        }
    },
    [TERMS_SECOND_CHECKED]: (state, action) => {
        return {
            ...state,
            isSecondChecked: !state.isSecondChecked
        }
    },
    [TERMS_SECOND_MODAL]: (state, action) => {
        return {
            ...state,
            secondVisible: action.payload
        }
    }
}, initialState);