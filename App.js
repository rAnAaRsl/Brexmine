import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import WelcomeScreen from './Screens/WelcomeScreen';
import WebViewScreen from './Screens/WebViewScreen';
import GeneratePinScreen from './Screens/GeneratePinScreen';
import InsertPin from './Screens/InsertPin';

const RootStack = createStackNavigator({
    SplashScreen: {
        screen: WelcomeScreen
    },
    GeneratePin: {
        screen: GeneratePinScreen
    },
    insertPin: {
        screen: InsertPin
    },
    WebViewScreen: {
        screen: WebViewScreen
    }
});

const App = createAppContainer(RootStack);

export default App;