import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export class LinkText extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress = { this.props.handle }>
                <Text style = { styles.link }>
                    { this.props.value }
                </Text>
            </TouchableOpacity>
        )
    }
}

LinkText.propTypes = {
    handle: PropTypes.func,
    value: PropTypes.string,
};

const styles = StyleSheet.create({
    link: {
        color: 'white',
    }
});