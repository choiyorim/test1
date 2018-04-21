import React from 'react';
import {Alert, View, Text, Animated, AsyncStorage} from 'react-native';
import {LinearGradient} from 'expo';
import {Button, Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from "./SignInStyles";
import config from "../../../../config";
import {SignTextInput} from "../../ui/SignTextInput";
import {LinkText} from "../../ui/LinkText";
import * as signin from "../../../modules/signin";
import StepIndicator from 'react-native-step-indicator';
import RoundCheckbox from 'rn-round-checkbox';

const labels = ["가입동의","기본정보","부가정보"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
}


class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this._opacity = new Animated.Value(0);
        this.state = {
            login: false,
            id: '',
            pwd: '',
            register:false,
            currentPosition: 0,
            isFirstChecked: false,
            isSecondChecked: false,
            firstVisible: false,
            secondVisible: false
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
        this.setState({
            register: !this.state.register,
        })
        //this.props.navigation.navigate('Terms');
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

    onPageChange = (diff) => {
        this.setState({currentPosition: this.state.currentPosition+diff});
    };
    renderModalHeader = (page) => {
        if(this.state.currentPosition!==0)
            return(<Icon name="arrow-left" type="font-awesome" style={{alignSelf:'flex-start'}} onPress={()=>{this.onPageChange(-1)}}/>);
        else{
            return(<View style={{alignSelf:'flex-start'}}></View>);
        }
    };
    renderModalBody = (page) => {
        switch(page){
            case 0:
                return(
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row', alignItems:'center', height:60, width:280}}>
                            <RoundCheckbox
                                size={24}
                                checked={this.state.isFirstChecked}
                                onValueChange={(newValue) => {this.setState({isFirstChecked:newValue})}}
                            />
                            <Text style={{width:180, marginLeft:10}}>
                                개인정보 수집 및 이용
                            </Text>
                            <Button small buttonStyle={{height:24}} title="보기"/>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', height:60, width:280}}>
                            <RoundCheckbox
                                size={24}
                                checked={this.state.isSecondChecked}
                                onValueChange={(newValue) => {this.setState({isSecondChecked:newValue})}}
                            />
                            <Text style={{width:180, marginLeft:10}}>
                                한담 서비스 이용 약관
                            </Text>
                            <Button small buttonStyle={{height:24}} title="보기"/>
                        </View>
                    </View>
                );
            case 1:
                return(
                    <View>

                    </View>
                );
            case 2:
                return(
                    <View>
                    </View>
                );

        }
    };
    renderModalFooter = (page) => {
      switch(page){
          case 0:
              return(
                  <View>
                      <Button onPress={()=>{this.onPageChange(1)}} title="다음"/>
                  </View>
              );
          case 1:
              return(
                  <View>
                      <Button onPress={()=>{this.onPageChange(1)}} title="다음"/>
                  </View>
              );
          case 2:
              return(
                  <View>
                      <Button title="가입"/>
                  </View>
              );
      }
    };
    render() {
        const {login, id, pwd, register} = this.state;
        const animation = this._opacity;
        return (

            <LinearGradient
                colors={[config.main_background_color1, config.main_background_color2, config.main_background_color3]}
                style={styles.container}
            >
                <Modal isVisible={register}>
                    <View style={{ flex: 1,justifyContent:'center', alignItems:'center'}}>
                        <View style={{height:500, width:300, backgroundColor:'#ffffff'}}>
                            <View name='header' style={{flex:1, flexDirection:'row', justifyContent: 'space-between', height:60, width:300, padding:10}}>
                                {this.renderModalHeader(this.state.currentPosition)}
                                <Icon name="times" type="font-awesome" style={{alignSelf:'flex-end'}}  onPress={this.handleSignUp}/>
                            </View>
                            <View name='body' style={{height:380, width:300, padding:10}}>
                                <StepIndicator
                                    stepCount={3}
                                    customStyles={customStyles}
                                    currentPosition={this.state.currentPosition}
                                    labels={labels}
                                />
                                {this.renderModalBody(this.state.currentPosition)}
                            </View>
                            <View name='footer' style={{height:60, width:300, padding:10}}>
                                {this.renderModalFooter(this.state.currentPosition)}
                            </View>
                        </View>
                    </View>
                </Modal>

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