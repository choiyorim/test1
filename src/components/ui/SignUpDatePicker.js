import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';

export class SignUpDatePicker extends React.Component {

    render() {
        return (
                <View style={styles.container}>
                    <DatePicker
                        style={{width: '100%'}}
                        date={this.props.value}
                        mode="date"
                        placeholder={this.props.placeholder}
                        format="YYYY-MM-DD"
                        confirmBtnText="확인"
                        cancelBtnText="취소"
                        onDateChange={this.props.handle}
                    />
                </View>
        )
    }
}

SignUpDatePicker.propTypes = {
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