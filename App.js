/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    BackHandler,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import {WebView} from "react-native-webview";

export default class App extends Component<Props> {
    web = null;
    i = 1;
    state = {
        isLoading: false,
        url: 'https://members.brixmine.com/MemberPanel/login?ReturnUrl=%2f'
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    onShowLoginForm = () => {
        this.setState({
            url: 'https://members.brixmine.com/MemberPanel/login?ReturnUrl=%2f',

        }, () => {
            this.setState({
                isLoading: false
            })
        });
    }
    onShowRegisterForm = () => {
        this.setState({
            url: 'https://members.brixmine.com/MemberPanel/Register',
        }, () => {
            this.setState({
                isLoading: false
            })
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        console.log("clicked");
        this.web.goBack(); // works best when the goBack is async
        if (this.state.url === 'https://brixmine.com/')
            this.setState({isLoading: false})
        return true;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    source={{uri: this.state.url}}
                    ref={r => this.web = r}

                    onLoadStart={e => {
                        console.log("stateresd")

                    }}
                    renderLoading={() => {
                        return (<ActivityIndicator style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}/>)
                    }}
                    startInLoadingState
                    onLoad={e => {
                        if (this.state.url === 'https://brixmine.com/')
                            this.setState({isLoading: false})
                    }}
                    scalesPageToFit={true}
                    onError={e => {
                        Alert.alert("Failed To load Please Check Your Internet Connection");
                    }}
                >

                </WebView>

                {this.state.isLoading && <View style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    height: 50,
                    flex: 1,
                    flexDirection: 'row',
                    left: 0,
                    opacity: 1
                }}>

                    <View style={styles.buttonContainer}>
                        < TouchableOpacity onPress={() => this.onShowLoginForm()}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        < TouchableOpacity style={styles.buttonContainer} onPress={() => this.onShowRegisterForm()}>
                            <Text style={styles.buttonText}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>}


            </View>
        );
    }
}
const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#F5FCFF'
        },
        input: {
            height: 40,
            margin: 10,
            padding: 10,
            color: '#000000'
        },

        buttonContainer: {
            backgroundColor: '#007bff',
            paddingVertical: 14,

            width: '50%',
            flexDirection: 'row',
            justifyContent: 'center'

        },
        buttonText: {
            color: '#fff',
            textAlign: 'center',
            fontWeight: '700',
            alignSelf: 'center',
            fontSize: 18,
        }


    });