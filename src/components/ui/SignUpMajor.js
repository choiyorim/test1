import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import PropTypes from 'prop-types';

export class SignUpMajor extends React.Component {

    render() {
        let data = [{
            value: '컴퓨터학부',
        }, {
            value: '글로벌미디어',
        }, {
            value: '경영학부',
        }];

        return (
            <View style={styles.container}>
                <Dropdown
                    label={this.props.placeholder}
                    data={data}
                    onChangeText={this.props.handle}
                />
            </View>
        )
    }
}

SignUpMajor.propTypes = {
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