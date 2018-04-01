import React from 'react';
import {StyleSheet, View, Text, Modal, Alert} from 'react-native';
import {CheckBox, Button} from 'react-native-elements';
import {SignRouter} from "../../navigations/SignNavigation";
import styles from "./TermsStyles";
import {TermsModal} from "../../ui/TermsModal";

export class TermsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNext: false,
            modalVisible: false,
            isFirstChecked: false,
            isSecondChecked: false,
            firstVisible: false,
            secondVisible: false
        }
    }

    //첫번째 동의 체크박스
    toggleFirst = () => {
        this.setState({isFirstChecked: !this.state.isFirstChecked});
    };

    //두번째 동의 체크박스
    toggleSecond = () => {
        this.setState({isSecondChecked: !this.state.isSecondChecked});
    };
    //모두 동의
    allTrue = () => {
        if (this.returnChecked()) {
            this.setState({
                isFirstChecked: false,
                isSecondChecked: false
            })
        } else {
            this.setState({
                isFirstChecked: true,
                isSecondChecked: true
            })
        }
    };

    //첫번째 동의 모달 열기, 닫기
    openFirst = () => {
        this.setState({firstVisible: true});
    };

    closeFirst = () => {
        this.setState({firstVisible: false});
    };

    //두번째 동의 모달 열기, 닫기
    openSecond = () => {
        this.setState({secondVisible: true});
    };
    closeSecond = () => {
        this.setState({secondVisible: false});
    };

    //모든 동의 확인 후 다음 화면
    nextPage = () => {
        if (this.returnChecked()) {
            // this.props.navigator.pop();
            // this.props.navigator.push(SignRouter.getRoute('SignUp'));
            this.props.navigation.navigate('SignUp');
        } else {
            Alert.alert(
                '경고',
                '약관에 동의 해주세요.',
                [
                    {text: '확인', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        }
    };

    //동의 체크
    returnChecked = () => {
        let {isFirstChecked, isSecondChecked} = this.state;
        return isFirstChecked && isSecondChecked;
    };


    render() {
        const { isFirstChecked, isSecondChecked, firstVisible, secondVisible } = this.state;
        return (
            <View style = { styles.screen }>
                <View style = { styles.container }>
                    <TermsModal
                        closeModal = { this.closeFirst }
                        modalVisible = { firstVisible }
                        title = '개인정보 수집 및 이용'
                    />
                    <TermsModal
                        closeModal = { this.closeSecond }
                        modalVisible = { secondVisible }
                        title = '한담 서비스 이용 약관'
                    />
                    <CheckBox
                        containerStyle = { styles.checkboxContainer }
                        title = '개인정보 수집 및 이용에 대한 동의'
                        checked = { isFirstChecked }
                        onPress = { this.openFirst }
                        onIconPress = { this.toggleFirst }
                        checkedColor = 'blue'
                    />
                    <CheckBox
                        containerStyle = { styles.checkboxContainer }
                        title = '한담 서비스 이용 약관 동의'
                        checked = { isSecondChecked }
                        onPress = { this.openSecond }
                        onIconPress = { this.toggleSecond }
                        checkedColor = 'blue'
                    />
                </View>
                <View style = { styles.allCheckBoxContainer }>
                    <CheckBox
                        containerStyle = { styles.allCheckBox }
                        title = '전체 약관 동의'
                        checked = { this.returnChecked() }
                        onIconPress = { this.allTrue }
                        onPress = { this.allTrue }
                        checkedColor = 'blue'
                    />
                </View>
                <View style = { styles.allCheckBoxContainer }>
                    <Button
                        title = '다음'
                        containerStyle = { styles.nextButton }
                        onPress = { this.nextPage }
                    />
                </View>
            </View>
        )
    }
}

