import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

export class SignTextInput extends React.Component {

    renderLabel = () => {
        if(this.props.label!==undefined){
            return(
                <View style={{alignSelf:'flex-start'}}>
                    <Text>{this.props.label}</Text>
                </View>
            )
        }
    };
    renderCheckLabel = () => {
        if(this.props.checkNo!==undefined){
            return(
                <View style={{height:10, alignSelf:'flex-start'}}>
                    {this.renderCheck()}
                </View>
            )
        }
    };
    renderCheck = () => {
      if (this.props.checkNo==1) {
          return(
              <Text style={{color:'red', fontSize:10}}>{this.props.checkLabel}</Text>
          )
      } else if (this.props.checkNo==2) {
          return(
              <Text style={{color:'green', fontSize:10}}>{this.props.checkLabel}</Text>
          )
      }
    };
    render() {
        return (
            <View style = { { marginBottom: 10, alignItems: 'center' } }>
                {this.renderLabel()}
                <View style = { styles.inputLayout }>
                    {/**<View style = { styles.inputIcon }>
                        <Icon type = "font-awesome" name = { this.props.icon }/>
                    </View>**/}
                    <TextInput
                        onBlur = {this.props.blur}
                        onChangeText = { this.props.handle }
                        value = { this.props.value }
                        secureTextEntry = { this.props.secureText }
                        style = { styles.input }
                        underlineColorAndroid = "transparent"
                        placeholder = { this.props.placeholder }
                    />
                </View>
                {this.renderCheckLabel()}
            </View>
        )
    }
}

SignTextInput.propTypes = {
    secureText: PropTypes.bool,
    handle: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    checkNo: PropTypes.number,
    checkLabel: PropTypes.string,
    blur: PropTypes.func
};

const styles = StyleSheet.create({
    inputLayout: {
        flexDirection: 'row',
        height: 40,
        width: '90%',
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        borderRadius:3,
        borderWidth:1,
        borderColor:'#aaaaaa'
    },
    input: {
        width: '100%',
    },
    inputIcon: {
        marginRight: 10,
        alignItems:'center',
        justifyContent:'center',
    }
});