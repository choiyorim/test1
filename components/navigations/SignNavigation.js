import React from "react";
import { View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createRouter, NavigationProvider, StackNavigation } from "@expo/ex-navigation";
import { SignInScreen } from "../screen/SignIn/SignInScreen";
import { SignUpScreen } from "../screen/SignUp/SignUpScreen";
import {TermsScreen} from "../screen/Terms/TermsScreen";

export const SignRouter = createRouter(() => ({
    SignIn : () => SignInScreen,
    SignUp : () => SignUpScreen,
    Terms : () => TermsScreen
}));

export class SignNavigation extends React.Component{
    render(){
        return(
            <NavigationProvider router = { SignRouter }>
                <View style = { styles.statusBar }/>
                <StackNavigation
                    initialRoute = { SignRouter.getRoute('SignIn') }/>
            </NavigationProvider>
        );
    }
}

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: '#000000',
        height: Constants.statusBarHeight
    }
});