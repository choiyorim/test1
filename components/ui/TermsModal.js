import React from 'react';
import { StyleSheet, Modal, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
export class TermsModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }

    }

    render(){
        return(
            <Modal
                visible = { this.props.modalVisible }
                animationType = { 'slide' }
                onRequestClose = { this.props.closeModal }
            >
                <View style = { styles.modalContainer } >
                    <ScrollView style = { styles.innerContainer } >
                        <Text h3 style = { styles.headerText }>{ this.props.title }</Text>
                        <Text h3>
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa
                            fsdfasdfasdfasdfasdfafsdfasdfasdfasdfasdfa

                        </Text>
                    </ScrollView>
                    <View style = { styles.buttonContainer }>
                        <Button
                            onPress = { this.props.closeModal }
                            title = "닫기"
                        />
                    </View>
                </View>

            </Modal>
        )
    }
}

TermsModal.propTypes = {
    closeModal : PropTypes.func,
    modalVisible : PropTypes.bool,
    title : PropTypes.string,
};

const styles = StyleSheet.create({
    modalContainer : {
        flex : 1,
        padding : 0,
        paddingTop : 30,
        backgroundColor : 'white',
    },
    innerContainer : {
        flex : 1,
        padding : 10,
    },
    headerText : {
      textAlign : 'center'
    },
    buttonContainer : {
        height : 60,
        paddingTop : 5,
        paddingBottom : 5,
        width : '100%'
    }
});