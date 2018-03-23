import React from 'react';
import { Alert, View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo';
import { Button } from 'react-native-elements';
import styles from './SignInStyles';
import config from '../../../config';
import { SignTextInput } from "../../ui/SignTextInput";
import { SignRouter } from "../../navigations/SignNavigation";
import { LinkText } from "../../ui/LinkText";

export class SignInScreen extends React.Component {

    static route = {};

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

    handleSignUp = () => {
        this.props.navigator.push(SignRouter.getRoute('Terms'));
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

