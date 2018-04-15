import React from 'react';
import {Alert, View, Text, Animated, AsyncStorage} from 'react-native';
import {LinearGradient} from 'expo';
import {Button} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from "./SignInStyles";
import config from "../../../../config";
import {SignTextInput} from "../../ui/SignTextInput";
import {LinkText} from "../../ui/LinkText";
import * as signin from "../../../modules/signin";

class SignInScreen extends React.Component {

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
        //로그인화면 애니메이션 효과
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
        const {SignIn} = this.props;
        console.log('button');
        await SignIn.signInUser(this.state.id.valueOf(), this.state.pwd.valueOf());
        this.loginResult();
    };

    loginResult = () => {
        if (this.props.login === true) {
            this.props.navigation.navigate('Home');
        } else {
            Alert.alert(
                '로그인 오류',
                '아이디와 비밀번호를 확인해 주세요',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        }
    };

    render() {
        const {login, id, pwd} = this.state;
        const animation = this._opacity;
        return (

            <LinearGradient
                colors={[config.main_background_color1, config.main_background_color2, config.main_background_color3]}
                style={styles.container}
            >
                <Animated.View style={{opacity: animation}}>
                    <SignTextInput
                        handle={this.handleStateId}
                        value={id}
                        placeholder={'아이디'}
                        icon={'user'}
                    />
                    <SignTextInput
                        handle={this.handleStatePwd}
                        value={pwd}
                        placeholder={'비밀번호'}
                        icon={'lock'}
                        secureText={true}
                    />
                    <Button
                        title='로그인'
                        titleStyle={styles.buttonText}
                        buttonStyle={styles.button}
                        onPress={this.handleSignIn}
                    />
                    <View style={styles.linkView}>
                        <LinkText
                            value='회원가입'
                            handle={this.handleSignUp}
                        />
                        <Text> </Text>
                        <Text
                            style={styles.link}

                        >
                            아이디/비밀번호 찾기
                        </Text>
                    </View>
                </Animated.View>
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
)(SignInScreen);