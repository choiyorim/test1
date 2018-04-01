import React from 'react';
import {StyleSheet, View, Picker} from 'react-native';
import PropTypes from 'prop-types';

export class SignUpPicker extends React.Component {
    render() {
        return (
            <View style = { { marginBottom: 10, alignItems: 'center' } }>
                <View style={styles.container}>
                    <Picker
                            selectedValue={this.props.value}
                            onValueChange={(itemValue, itemIndex) => this.props.handle(itemValue)}>
                        <Picker.Item label={this.props.placeholder} value="" />
                        <Picker.Item label="컴퓨터학부" value="컴퓨터학부" />
                        <Picker.Item label="글로벌미디어학부" value="글로벌미디어" />
                    </Picker>
                </View>
            </View>
        )
    }
}

SignUpPicker.propTypes = {
    handle: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      width: '90%'
    },
});