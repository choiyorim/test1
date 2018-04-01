import React from "react";
import {StackNavigator, TabNavigator} from 'react-navigation';
import {HomeScreen} from "../screen/Home/HomeScreen";
import {MyInfoScreen} from "../screen/MyInfo/MyInfoScreen";
import {Icon} from 'react-native-elements';

//홈 Tab 네비게이션
export const HomeTabs = TabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: '홈',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='home' size={20} color={tintColor}/>)
            }
        },
        MyInfo: {
            screen: MyInfoScreen,
            navigationOptions: {
                tabBarLabel: '내정보',
                tabBarIcon: ({tintColor}) => (<Icon type="font-awesome" name='user' size={20} color={tintColor}/>)
            }
        }
    },
    {
        lazy: true,
        initialRouteName: 'Home',
        tabBarPosition: 'bottom',
        //swipeEnabled:false,
        //animationEnabled:false,
        navigationOptions : {
            header: null
        },
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'black',
            style: {
                backgroundColor: 'white'
            },
            showIcon: true
        },
    }
);