import React from 'react';
import { Alert, View, Text, Animated, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo';
import { Button } from 'react-native-elements';
import styles from './SignInStyles';
import config from '../../../../config';
import { SignTextInput } from "../../ui/SignTextInput";
import { LinkText } from "../../ui/LinkText";

export class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this._opacity = new Animated.Value(0);
        this.state = {
            login: false,
            id: '',
            pwd: ''
        }
    }

    componentDidMount() {
        //로그인화면 에니메이션 효과
        Animated.timing(          // Uses easing functions
            this._opacity,    // The value to drive
            {
                toValue: 1,
                duration: 500,
                // ease: Easing.inout(),
                delay: 200,
            }            // Configuration
        ).start();                // Don't forget start!
    }

    handleStateId = (id) => {
        this.setState({id});
    };

    handleStatePwd = (pwd) => {
        this.setState({pwd});
    };

    //회원가입 클릭 시 동의화면 이동
    handleSignUp = () => {
        //this.props.navigator.push(SignRouter.getRoute('Terms'));
        this.props.navigation.navigate('Terms');
    };

    //로그인버튼 클릭 시
    handleSignIn = async () => {
        //보낼 데이터
        var userData = {
            userId: this.state.id.valueOf(),
            userPw: this.state.pwd.valueOf()
        };

        //로그인 서버로 post 형식으로 보냄
        const signInCheck = await fetch(`${config.server}/signIn`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        //받은 데이터가 promise형식이므로 json형태로 변형
        const jsonData = await signInCheck.json();

        //현재 error시에 message가 있음
        if (jsonData.message) {
            Alert.alert(
                '로그인 오류',
                '아이디와 비밀번호를 확인해 주세요',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        } else {
            //로그인 성공시 자동로그인 key값을 true로 설정 후 홈 화면으로 이동
            try {
                await AsyncStorage.setItem('AutoLogin', 'true');
                this.props.navigation.navigate('Home');
            } catch (error) {
                // Error saving data
            }
        }
    };
    render() {
        const { login, id, pwd } = this.state;
        const animation = this._opacity;
        return (

            <LinearGradient
                colors={ [ config.main_background_color1, config.main_background_color2, config.main_background_color3 ] }
                style={styles.container}
            >
                <Animated.View style = { { opacity: animation } }>
                    <SignTextInput
                        handle = { this.handleStateId }
                        value = { id }
                        placeholder = { '아이디' }
                        icon = { 'user' }
                    />
                    <SignTextInput
                        handle = { this.handleStatePwd }
                        value = { pwd }
                        placeholder = { '비밀번호' }
                        icon = { 'lock' }
                        secureText = { true }
                    />
                    <Button
                        title = '로그인'
                        titleStyle = { styles.buttonText }
                        buttonStyle = { styles.button }
                        onPress = { this.handleSignIn }
                    />
                    <View style = { styles.linkView }>
                        <LinkText
                            value = '회원가입'
                            handle = { this.handleSignUp }
                        />
                        <Text>         </Text>
                        <Text
                            style = { styles.link }
                        >
                            아이디/비밀번호 찾기
                        </Text>
                    </View>
                </Animated.View>
            </LinearGradient>
        );
    }
}

