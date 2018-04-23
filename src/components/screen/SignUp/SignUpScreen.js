import React from 'react';
import {Alert, View, Text, Picker, ScrollView} from 'react-native';
import {LinearGradient} from 'expo';
import {Button} from 'react-native-elements';
// import DatePicker from 'react-native-datepicker';
import styles from "./SignUpStyles";
import config from "../../../../config";
import {SignTextInput} from "../../ui/SignTextInput";
// import {SignUpPicker} from "../../ui/SignUpPicker";
import {SignUpMajor} from "../../ui/SignUpMajor";
import {SignUpDatePicker} from "../../ui/SignUpDatePicker";
import {connect} from 'react-redux';
import * as signin from "../../../modules/signin";
import {bindActionCreators} from "redux";

class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: undefined,
            userPw: undefined,
            userRePw: undefined,
            userNickName: undefined,
            email: undefined,
            major: undefined,
            minor: undefined,
            doubleMajor: undefined,
            connectedMajor: undefined,
            admissionYear: undefined
        }
    }

    _showAlert = () => {
        // this.props.navigator.showLocalAlert('가입되었습니다.', {
        //     text: {color: '#000'},
        //     container: {backgroundColor: '#FFEB3B'},
        // });
    };

    //회원가입 버튼
    signUpButton = async () => {
        let {userId, userPw, userNickName, email, major, minor, doubleMajor, connectedMajor, admissionYear} = this.state;
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
        const signUpCheck = await fetch(config.server + '/signUp', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const jsonData = await signUpCheck.json();
        if (jsonData.message) {
            Alert.alert(
                '회원가입 오류',
                '정보를 정확히 입력 해주세요',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        } else {
            //this._showAlert();
            // this.props.navigator.pop();
            this.props.navigation.navigate('SignIn');
        }
    };
    handleStateUserId = (userId) => {
        this.setState({userId});
    };
    handleStateUserPw = (userPw) => {
        this.setState({userPw});
    };
    handleStateUserNickName = (userNickName) => {
        this.setState({userNickName});
    };
    handleStateUserRePw = (userRePw) => {
        this.setState({userRePw});
    };
    handleStateEmail = (email) => {
        this.setState({email});
    };
    handleStateMajor = (major) => {
        this.setState({major});
    };
    handleStateMinor = (minor) => {
        this.setState({minor});
    };
    handleStateDoubleMajor = (doubleMajor) => {
        this.setState({doubleMajor});
    };
    handleStateConnectedMajor = (connectedMajor) => {
        this.setState({connectedMajor});
    };
    handleStateAdmissionYear = (admissionYear) => {
        this.setState({admissionYear});
    };

    render() {
        const {userNickName, userId, userPw, userRePw, email, major, minor, doubleMajor, connectedMajor, admissionYear} = this.state;

        return (
            <LinearGradient
                colors={[config.main_background_color1, config.main_background_color2, config.main_background_color3]}
                style={styles.container}
            >
                <View style={{height:500}}>
                    <ScrollView>
                        <SignTextInput handle={this.handleStateUserId}
                                       value={userId}
                                       placeholder={'아이디'}
                                       icon={'user'}/>
                        <SignTextInput handle={this.handleStateUserPw}
                                       value={userPw}
                                       placeholder={'비밀번호'}
                                       icon={'lock'}
                                       secureText={true}/>
                        <SignTextInput handle={this.handleStateUserRePw}
                                       value={userRePw}
                                       placeholder={'비밀번호 확인'}
                                       icon={'lock'}
                                       secureText={true}/>
                        <SignTextInput handle={this.handleStateUserNickName}
                                       value={userNickName}
                                       placeholder={'닉네임'}
                                       icon={'user-secret'}/>
                        <SignTextInput handle={this.handleStateEmail}
                                       value={email}
                                       placeholder={'이메일'}
                                       icon={'envelope'}/>
                        {/**<SignUpPicker handle={this.handleStateMajor}
                                      value={major}
                                      placeholder={'전공을 선택해 주세요'}/>**/}
                        <SignUpMajor handle={this.handleStateMajor}
                                     value={major}
                                     placeholder={'전공을 선택해 주세요'}/>
                        <SignUpMajor handle={this.handleStateMinor}
                                     value={minor}
                                     placeholder={'부전공을 선택해 주세요'}/>
                        <SignUpMajor handle={this.handleStateDoubleMajor}
                                     value={doubleMajor}
                                     placeholder={'복수전공을 선택해 주세요'}/>
                        <SignUpMajor handle={this.handleStateConnectedMajor}
                                     value={connectedMajor}
                                     placeholder={'연계전공을 선택해 주세요'}/>
                        {/**
                        <DatePicker
                            style={{width: 200}}
                            date={admissionYear}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={this.handleStateAdmissionYear}
                        />
                         **/}
                        <SignUpDatePicker handle={this.handleStateAdmissionYear}
                                          value={admissionYear}
                                          placeholder={'입학년도를 선택해 주세요'}/>
                    </ScrollView>
                    <Button
                        onPress={this.signUpButton}
                        title="회원가입"
                        buttonStyle={styles.button}
                    />
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('SignIn');
                        }}
                        title="취소"
                        buttonStyle={styles.button}
                    />
                </View>
            </LinearGradient>
        );
    }
}


export default connect((state) => ({
        login: state.signin.login,

    }),
    (dispatch) => ({
        SignIn: bindActionCreators(signin, dispatch)
    })
)(SignUpScreen);


