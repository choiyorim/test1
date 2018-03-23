import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Constants } from 'expo';
import { SignNavigation } from "./components/navigations/SignNavigation";

export default class App extends React.Component {
  render() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style = { styles.statusBar }/>
          <SignNavigation/>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    statusBar: {
        backgroundColor: '#000000',
        height: Constants.statusBarHeight
    }
});