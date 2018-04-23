import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export class LinkText extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress = { this.props.handle }>
                <Text style = {this.props.link_style}>
                    { this.props.value }
                </Text>
            </TouchableOpacity>
        )
    }
}

LinkText.propTypes = {
    handle: PropTypes.func,
    value: PropTypes.string,
    link_style: PropTypes.object
};