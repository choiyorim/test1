import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from "./MyInfoStyles";

export class MyInfoScreen extends React.Component{

    render(){
        return(
            <View style = {styles.container}>
                <Text>내정보</Text>
            </View>
        )
    }
}