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
import {TermsModal} from "../../ui/TermsModal";
import {SignUpMajor} from "../../ui/SignUpMajor";
import {SignUpDatePicker} from "../../ui/SignUpDatePicker";
import Toast, {DURATION} from 'react-native-easy-toast';
import {validation} from "../../../utils/validations";
import {View1} from "../../ui/View1";
const labels = ["가입동의","기본정보","부가정보"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#0b6aff',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#0b6aff',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#0b6aff',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#0b6aff',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#0b6aff',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#0b6aff'
};


class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this._opacity = new Animated.Value(0);
        this.state = {
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
            userRePw: '',
            userNickName: undefined,
            email: undefined,
            major: undefined,
            minor: undefined,
            doubleMajor: undefined,
            connectedMajor: undefined,
            admissionYear: undefined,
            checkIdNo: 0,
            checkIdLabel: '',
            checkIdClient:false,
            checkIdServer:false,
            checkNickNameNo: 0,
            checkNickNameLabel: '',
            checkNickNameClient:false,
            checkNickNameServer:false,
            checkEmailNo:0,
            checkEmailLabel:'',
            checkEmailClient:false,
            checkEmailServer:false,
            checkPasswordNo:0,
            checkPasswordLabel:'',
            checkPassRe:0,
            checkPassReLabel:'',
            passCheck:false
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

        const {SignIn} = this.props;

        SignIn.modal2();

    }


    //로그인화면 id 입력
    handleSignInId = (id) => {
        const {SignIn} = this.props;
        SignIn.handleSignInId(id);
    };

    //로그인화면 password 입력
    handleSignInPwd = (pwd) => {
        const {SignIn} = this.props;
        SignIn.handleSignInPwd(pwd);
    };

    //로그인버튼 클릭 시
    signInUser = async () => {
        const {SignIn} = this.props;
        await SignIn.signInUser(this.props.id, this.props.pwd);
        this.loginResult();
    };

    //로그인 결과
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

    //회원가입 클릭 시 동의화면 이동
    handleSignUpModal = () => {
        const {SignIn} = this.props;
        SignIn.handleSignUpModal();
    };

    //약관동의 처리
    handleTerms = () => {
        this.setState({
            termsModal:!this.state.termsModal
        })
    };

    //첫번째 동의 체크박스
    handleTermsFirstCheck = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsFirstCheck();

    };

    //두번째 동의 체크박스
    handleTermsSecondCheck = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsSecondCheck();
    };

    //동의 체크
    returnChecked = () => {
        return this.props.isFirstChecked && this.props.isSecondChecked;
    };

    //첫번째 동의 모달 열기, 닫기
    handleTermsFirstModalOpen = async () => {
        const {SignIn} = this.props;
        SignIn.handleTermsFirstModal(true);

    };

    handleTermsFirstModalClose = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsFirstModal(false);
    };

    //두번째 동의 모달 열기, 닫기
    handleTermsSecondModalOpen = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsSecondModal(true);
    };
    handleTermsSecondModalClose = () => {
        const {SignIn} = this.props;
        SignIn.handleTermsSecondModal(false);
    };

    nextTerms = () => {
        if(this.returnChecked()){
            return this.onPageChange(1);
        }
        this.handleTerms();
    };



    handleCheckUserId = () => {
        this.setState({
            userIdCheckModal:!this.state.userIdCheckModal
        })
    };

    handleCheckUserEmail = () => {
        this.setState({
            userEmailCheckModal:!this.state.userEmailCheckModal
        })
    };

    handleStateUserId = (userId) => {
        if (validation.checkIdLength(userId)) {
            this.setState({checkIdClient:true, checkIdNo:0, checkIdLabel:''});
        } else {
            this.setState({checkIdClient:false, checkIdNo:1, checkIdLabel:'아이디는 6자 이상이여야 합니다.'});
        }
        this.setState({userId});
    };
    handleCheckUserId = async () => {
        const {SignIn} = this.props;
        if(this.state.checkIdClient && this.state.userId.length > 0) {
            const result = await SignIn.checkUserId(this.state.userId);
            if (result) {
                this.setState({checkIdServer:true, checkIdNo: 2, checkIdLabel: '사용가능한 아이디 입니다.'});
            } else {
                this.setState({checkIdServer:false, checkIdNo: 1, checkIdLabel: '사용불가능한 아이디 입니다.'});
            }
        } else {
            this.setState({checkIdServer: false});
        }
    };

    handleStateUserNickName = (userNickName) => {
        if(validation.checkNickNameLength(userNickName)){
            this.setState({checkNickNameClient:true, checkNickNameNo:0, checkNickNameLabel: ''});
        }else{
            this.setState({checkNickNameClient:false, checkNickNameNo:1, checkNickNameLabel: '닉네임은 한글자 이상이여야 합니다.'});
        }
        this.setState({userNickName});
    };
    handleCheckUserNickName = async () => {
        const {SignIn} = this.props;
        if(this.state.checkNickNameClient && this.state.userNickName.length > 0) {
            const result = await SignIn.checkUserNickName(this.state.userNickName);
            if (result) {
                this.setState({checkNickNameServer:true, checkNickNameNo: 2, checkNickNameLabel: '사용가능한 닉네임 입니다.'});
            } else {
                this.setState({checkNickNameServer:false, checkNickNameNo: 1, checkNickNameLabel: '사용불가능한 닉네임 입니다.'});
            }
        } else {
            this.setState({checkNickNameServer: false});
        }
    };


    handleStateUserEmail = (email) => {
        if(validation.checkEmail(email)){
            this.setState({checkEmailClient:true, checkEmailNo: 0, checkEmailLabel: ''});
        }else{
            this.setState({checkEmailClient:false, checkEmailNo: 1, checkEmailLabel: '이메일 형식이 아닙니다.'});
        }
        this.setState({email});
    };

    handleCheckUserEmail = async () => {
        const {SignIn} = this.props;
        if(this.state.checkEmailClient && this.state.email.length > 0) {
            const result = await SignIn.checkUserEmail(this.state.email);
            if (result) {
                this.setState({checkEmailServer: true, checkEmailNo: 2, checkEmailLabel: '사용가능한 이메일 입니다.'});
            } else {
                this.setState({checkEmailServer: false, checkEmailNo: 1, checkEmailLabel: '사용불가능한 이메일 입니다.'});
            }
        } else {
            this.setState({checkEmailServer: false});
        }
    };


    handleStateUserPw = (userPw) => {
        this.setState({userPw});

        if(validation.checkPassLength(userPw)){
            if(this.state.userRePw.length < 7 ){
                this.setState({checkPasswordNo:0,checkPasswordLabel:''});
            }else if(this.state.userRePw === userPw && this.state.userRePw.length>7){
                this.setState({checkPasswordNo:0,checkPasswordLabel:''});
                this.setState({checkPassRe: 2, checkPassReLabel: '일치합니다'});
            }else {
                this.setState({checkPasswordNo:0,checkPasswordLabel:''});
                this.setState({checkPassRe: 1, checkPassReLabel: '비밀번호가 불일치 합니다'});
            }
        }
        else{
            if(this.state.userRePw.length > 0 && this.state.userRePw !== userPw ) {
                if (0 < userPw.length && userPw.length < 8) {
                    this.setState({checkPasswordNo: 1, checkPasswordLabel: '8자 이상 입력해주세요.'});
                    this.setState({checkPassRe: 1, checkPassReLabel: '비밀번호가 불일치 합니다'});
                }
                else {
                    this.setState({checkPasswordNo: 0, checkPasswordLabel: ''});
                    this.setState({checkPassRe: 0, checkPassReLabel:''});
                }
            }
            else {
                if (userPw.length === 0 && this.state.userRePw.length === 0) {
                    this.setState({checkPasswordNo: 0, checkPasswordLabel: ''});
                }
                else {
                    this.setState({checkPasswordNo: 1, checkPasswordLabel: '8자 이상 입력해주세요.'});
                }
            }
        }
    };
    handleStateUserRePw = (userRePw) => {
        this.setState({userRePw});
        if (this.state.userPw.length < 8 ){
            this.setState({checkPassRe: 0, checkPassReLabel:''});
        }
        else if (validation.checkPassRe(this.state.userPw, userRePw)){
            this.setState({checkPassRe: 2, checkPassReLabel: '일치합니다'});
        }
        else {
            if (userRePw.length <= 0) {
                this.setState({checkPassRe: 0, checkPassReLabel: ''});
            }
            else if (this.state.userPw !== userRePw) {
                this.setState({checkPassRe: 1, checkPassReLabel: '비밀번호가 불일치 합니다'});
            }
        }
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
        const {userId, userNickName, userPw, userRePw, email, major, doubleMajor, minor, connectedMajor, admissionYear} = this.state;
        switch(page){
            case 0:
                return(
                    <View style={{flex:1, marginTop:20}}>
                        <View1
                            isFirstChecked ={this.props.isFirstChecked}
                            handleTermsFirstCheck = {this.handleTermsFirstCheck}
                            text1 = '개인정보 수집 및 이용'
                            handleTermsFirstModalOpen = {this.handleTermsFirstModalOpen}
                        />
                            <View1
                                isFirstChecked ={this.props.isSecondChecked}
                                handleTermsFirstCheck = {this.handleTermsSecondCheck}
                                text1 = '한담 서비스 이용 약관'
                                handleTermsFirstModalOpen ={ this.handleTermsSecondModalOpen}
                            />
                        </View>
                );
            case 1:
                return(
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <SignTextInput handle={this.handleStateUserId}
                                       value={userId}
                                       placeholder={'아이디'}
                                       icon={'user'}
                                       label={'아이디'}
                                       checkNo={this.state.checkIdNo}
                                       checkLabel={this.state.checkIdLabel}
                                       blur={this.handleCheckUserId}
                        />
                        <SignTextInput handle={this.handleStateUserPw}
                                       value={userPw}
                                       placeholder={'비밀번호'}
                                       icon={'lock'}
                                       secureText={true}
                                       label={'비밀번호'}
                                       checkNo={this.state.checkPasswordNo}
                                       checkLabel={this.state.checkPasswordLabel}
                        />
                        <SignTextInput handle={this.handleStateUserRePw}
                                       value={userRePw}
                                       placeholder={'비밀번호 확인'}
                                       icon={'lock'}
                                       secureText={true}
                                       label={'비밀번호 확인'}
                                       checkNo ={this.state.checkPassRe}
                                       checkLabel={this.state.checkPassReLabel}
                        />
                        <SignTextInput handle={this.handleStateUserNickName}
                                       value={userNickName}
                                       placeholder={'닉네임'}
                                       icon={'user-secret'}
                                       label={'닉네임'}
                                       checkNo={this.state.checkNickNameNo}
                                       checkLabel={this.state.checkNickNameLabel}
                                       blur={this.handleCheckUserNickName}
                        />
                        <SignTextInput handle={this.handleStateUserEmail}
                                       value={email}
                                       placeholder={'이메일'}
                                       icon={'envelope'}
                                       label={'이메일'}
                                       checkNo={this.state.checkEmailNo}
                                       checkLabel={this.state.checkEmailLabel}
                                       blur={this.handleCheckUserEmail}
                        />
                    </View>
                );
            case 2:
                return(
                    <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:10}}>
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
                        <SignUpDatePicker handle={this.handleStateAdmissionYear}
                                          value={admissionYear}
                                          placeholder={'입학년도를 선택해 주세요'}/>
                    </View>
                );

        }
    };
    renderModalFooter = (page) => {
        switch(page){
            case 0:
                return(
                    <View>
                        <Button onPress={this.nextTerms} title="다음"/>
                    </View>
                );
            case 1:
                return(
                    <View>
                        <Button onPress={this.basicChecked} title="다음"/>
                    </View>
                );
            case 2:
                return(
                    <View>
                        <Button onPress={this.signUpUser} title="가입 완료"/>
                    </View>
                );
        }
    };

    basicChecked = async () => {
        const { SignIn } = this.props;
        // let checkid = await SignIn.checkUserId(this.state.userId);
        // if(!checkid) return this.handleCheckUserId();
        // let checknickname = await SignIn.checkUserNickName(this.state.userNickName);
        // if(!checknickname)
        // let checkemail = await SignIn.checkUserEmail(this.state.email);
        // if(!checkemail) return this.handleCheckUserEmail();
        this.onPageChange(1);
    };
    signUpUser = async () => {
        const {SignIn} = this.props;
        const {userId, userPw, userNickName, email, major, minor, doubleMajor, connectedMajor, admissionYear} = this.state;
        let signUpCheck = await SignIn.signUpUser(userId, userPw, userNickName, email, major, minor, doubleMajor, connectedMajor, admissionYear);
        if(signUpCheck){
            this.handleSignUpModal();
            this.refs.toast.show('회원가입에 성공했습니다.');
        } else {

        }
    };

    render() {
        const {id, pwd, register, termsModal, userIdCheckModal, userEmailCheckModal, firstVisible, secondVisible} = this.state;
        const animation = this._opacity;
        return (

            <LinearGradient
                colors={[config.main_background_color1, config.main_background_color2, config.main_background_color3]}
                style={styles.container}
            >
                <Toast ref="toast"/>
                <Modal isVisible={this.props.register}>
                    <TermsModal
                        closeModal = { this.handleTermsFirstModalClose }
                        modalVisible = { this.props.firstVisible }
                        title = '개인정보 수집 및 이용'
                    />
                    <TermsModal
                        closeModal = { this.handleTermsSecondModalClose }
                        modalVisible = { this.props.secondVisible }
                        text = {this.props.secondTerms}
                        title = '한담 서비스 이용 약관'
                    />
                    <Modal isVisible={termsModal}>
                        <View style={{ flex: 1,justifyContent:'center', alignItems:'center'}}>
                            <View style={{height:300, width:250, backgroundColor:'#ffffff'}}>
                                <View name='header' style={{flex:1, flexDirection:'row', justifyContent: 'center', height:60, width:250, padding:10}}>
                                    <Text>경고</Text>
                                </View>
                                <View name='body' style={{height:180, width:250, padding:10}}>
                                    <Text>약관에 동의해 주세요</Text>
                                </View>
                                <View name='footer' style={{height:60, width:250, padding:10}}>
                                    <LinkText
                                        value='닫기'
                                        handle={this.handleTerms}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal isVisible={userIdCheckModal}>
                        <View style={{ flex: 1,justifyContent:'center', alignItems:'center'}}>
                            <View style={{height:300, width:250, backgroundColor:'#ffffff'}}>
                                <View name='header' style={{flex:1, flexDirection:'row', justifyContent: 'center', height:60, width:250, padding:10}}>
                                    <Text>경고</Text>
                                </View>
                                <View name='body' style={{height:180, width:250, padding:10}}>
                                    <Text>이미 존재하는 아이디 입니다.</Text>
                                </View>
                                <View name='footer' style={{height:60, width:250, padding:10}}>
                                    <LinkText
                                        value='닫기'
                                        handle={this.handleCheckUserId}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal isVisible={userEmailCheckModal}>
                        <View style={{ flex: 1,justifyContent:'center', alignItems:'center'}}>
                            <View style={{height:300, width:250, backgroundColor:'#ffffff'}}>
                                <View name='header' style={{flex:1, flexDirection:'row', justifyContent: 'center', height:60, width:250, padding:10}}>
                                    <Text>경고</Text>
                                </View>
                                <View name='body' style={{height:180, width:250, padding:10}}>
                                    <Text>이미 존재하는 이메일 입니다.</Text>
                                </View>
                                <View name='footer' style={{height:60, width:250, padding:10}}>
                                    <LinkText
                                        value='닫기'
                                        handle={this.handleCheckUserEmail}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View style={{ flex: 1,justifyContent:'center', alignItems:'center'}}>
                        <View style={{height:600, width:300, backgroundColor:'#ffffff'}}>
                            <View name='header' style={{flex:1, flexDirection:'row', justifyContent: 'space-between', height:60, width:300, padding:10}}>
                                {this.renderModalHeader(this.state.currentPosition)}
                                <Icon name="times" type="font-awesome" style={{alignSelf:'flex-end'}}  onPress={this.handleSignUpModal}/>
                            </View>
                            <View name='body' style={{height:480, width:300, padding:10}}>
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
                        handle={this.handleSignInId}
                        value={this.props.id}
                        placeholder={'아이디'}
                        icon={'user'}
                    />
                    <SignTextInput
                        handle={this.handleSignInPwd}
                        value={this.props.pwd}
                        placeholder={'비밀번호'}
                        icon={'lock'}
                        secureText={true}
                    />
                    <Button
                        title='로그인'
                        titleStyle={styles.buttonText}
                        buttonStyle={styles.button}
                        onPress={this.signInUser}
                    />
                    <View style={styles.linkView}>
                        <LinkText
                            value='회원가입'
                            handle={this.handleSignUpModal}
                            link_style={{color:'white'}}
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
        id: state.signin.id,
        pwd: state.signin.pwd,
        register: state.signin.register,
        currentPosition: state.signin.currentPosition,
        termsModal: state.signin.termsModal,
        userIdCheckModal: state.signin.userIdCheckModal,
        userEmailCheckModal: state.signin.userEmailCheckModal,
        isFirstChecked: state.signin.isFirstChecked,
        isSecondChecked: state.signin.isSecondChecked,
        firstVisible: state.signin.firstVisible,
        secondVisible: state.signin.secondVisible,
        userId: state.signin.userId,
        userPw: state.signin.userPw,
        userRePw: state.signin.userRePw,
        userNickName: state.signin.userNickName,
        email: state.signin.email,
        major: state.signin.major,
        minor: state.signin.minor,
        doubleMajor: state.signin.doubleMajor,
        connectedMajor: state.signin.connectedMajor,
        admissionYear: state.signin.admissionYear,
        firstTerms:state.signin.firstTerms,
        secondTerms: state.signin.termsText

    }),
    (dispatch) => ({
        SignIn: bindActionCreators(signin, dispatch)
    })
)(SignInScreen);