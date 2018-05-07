export const validation = {};

validation.checkNickNameLength = (userNickName) => {
    if(0 < userNickName.length && userNickName.length < 2)
        return false;
    else
        return true;
};

validation.checkIdLength = (userId) => {
    if(0 < userId.length && userId.length < 6)
        return false;
    else
        return true;
};

validation.checkEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(reg.test(email))
        return true;
    else
        return false;
};
validation.checkPassLength = (pass) => {
    if( pass.length < 8 )
        return false;
    else
        return true;
};
validation.checkPassRe = (pass, passRe) => {
    if(pass.length > 7 && 7 < passRe.length && pass === passRe){
        return true;
    }
    else
        return false;
}