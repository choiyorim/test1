import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

export class SignTextInput extends React.Component {
    render() {
        return (
            <View style = { { marginBottom: 10, alignItems: 'center' } }>
                <View style = { styles.inputLayout }>
                    <View style = { styles.inputIcon }>
                        <Icon type = "font-awesome" name = { this.props.icon }/>
                    </View>
                    <TextInput
                        onChangeText = { this.props.handle }
                        value = { this.props.value }
                        secureTextEntry = { this.props.secureText }
                        style = { styles.input }
                        underlineColorAndroid = "transparent"
                        placeholder = { this.props.placeholder }
                    />
                </View>
            </View>
        )
    }
}

SignTextInput.propTypes = {
    secureText: PropTypes.bool,
    handle: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    icon: PropTypes.string
};

const styles = StyleSheet.create({
    inputLayout: {
        flexDirection: 'row',
        height: 55,
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        paddingLeft: 10,
    },
    input: {
        height: '100%',
        width: '100%',

    },
    inputIcon: {
        marginRight: 10,
        alignItems:'center',
        justifyContent:'center',
    }
});