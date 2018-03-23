import React from 'react';
import {Alert, View, Text, Picker, ScrollView} from 'react-native';
import {LinearGradient} from 'expo';
import {Button} from 'react-native-elements';
import styles from './SignUpStyles';
import config from '../../../config';
import {SignTextInput} from "../../ui/SignTextInput";
import {SignUpPicker} from "../../ui/SignUpPicker";

export class SignUpScreen extends React.Component {

    static route = {
        navigationBar: {
            title: '회원 가입',
            titleStyle:{alignItems:'center', justifyContent:'center'},
            height: 50
        }
    };

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
        this.props.navigator.showLocalAlert('가입되었습니다.', {
            text: {color: '#000'},
            container: {backgroundColor: '#FFEB3B'},
        });
    };

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

        const signUpCheck = await fetch(config.server + '/signUp', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const jsonData = signUpCheck.json();
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
            this._showAlert();
            this.props.navigator.pop();
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
                <ScrollView style={{height: 400}}>
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
                    <SignUpPicker handle={this.handleStateMajor}
                                  value={major}
                                  placeholder={'전공을 선택해 주세요'}/>
                    <Button
                        onPress={this.signUpButton}
                        title="회원가입"
                        buttonStyle={styles.button}
                    />
                    <Button
                        onPress={() => {
                            this.props.navigator.pop()
                        }}
                        title="취소"
                        buttonStyle={styles.button}
                    />
                </ScrollView>
            </LinearGradient>
        );
    }
}

