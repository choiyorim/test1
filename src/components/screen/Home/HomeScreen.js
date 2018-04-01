import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from "./HomeStyles";

export class HomeScreen extends React.Component{

    render(){
        return(
            <View style = {styles.container}>
                <Text>Home</Text>
            </View>
        )
    }
}