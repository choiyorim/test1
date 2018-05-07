import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import RoundCheckbox from 'rn-round-checkbox';
import {LinkText} from "./LinkText";

export class View1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }

    }

    render() {
        return(
            <View style={ styles.viewStyle1}>
                <RoundCheckbox
                    size={24}
                    checked={this.props.isFirstChecked}
                    onValueChange={this.props.handleTermsFirstCheck}
                />
                <Text style={styles.viewStyle2}>
                     {this.props.text1}
                </Text>
                <LinkText
                    value='보기'
                    handle={this.props.handleTermsFirstModalOpen}
                    link_style={styles.linkStyle1}
                />
            </View>
        );
    }
}
View1.PropTypes= {
    text1 : PropTypes.String,
    isFirstChecked : PropTypes.boolean,
    handleTermsFirstCheck : PropTypes.func,
    handleTermsFirstModalOpen : PropTypes.func
}
const styles = StyleSheet.create({
viewStyle1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: 280,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1
},
    viewStyle2:{
    width: 180, marginLeft: 10
    },
    linkStyle1:{
        color: 'grey'
    }
});