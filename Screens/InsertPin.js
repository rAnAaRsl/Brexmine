import React, {Component} from 'react';
import {
    Alert,
    View,
    Text,
    Image,
    BackHandler,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    NetInfo
} from 'react-native';


export default class InsertPin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userEmail: '',
            exactPin: '',
        }
        this._handlePress = this
            ._handlePress
            .bind(this);
    }

    static navigationOptions = {
        header: null
    };


    _handlePress() {

        if (this.state.userEmail === '') {
            Alert.alert("Please Provide Pin");
        }
        else if (this.state.userEmail === this.state.exactPin) {
            const {navigate} = this.props.navigation;
            navigate("WebViewScreen");
        }
        else {
            Alert.alert("Invalid Pin Please Try Again");
        }

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        AsyncStorage.getItem("pin").then((value) => {
            if (value) {
                this.setState({exactPin: value});
            } else {
                console.log("no token");
            }
        }).catch(function (err) {
            Alert.alert(err.toString())
        }).done();
    }

    handleBackPress = () => {
        console.log("clicked");
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }


    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }}>
                    <Image
                        source={require('../Images/bx_logo.png')}
                        style={{
                            height: 60,
                            width: 300,
                            alignSelf: "center",
                            marginBottom: 100
                        }}/>
                </View>
                <Text>Please Provide Pin to Continue</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType='numeric'
                    maxLength={4}
                    underlineColorAndroid="rgb(128,128,128)"
                    onChangeText=
                        {(text) => this.setState({userEmail: text})}
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder="Enter Pin"
                    placeholderTextColor="#000000"/>
                <View style={{
                    flexDirection: 'row'
                }}>
                    {this.state.isLoading ?
                        <TouchableOpacity style={styles.buttonContainer}>
                            <ActivityIndicator size="large" color="#ffffff"/>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this._handlePress()}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '80%',
        alignSelf: 'center',
        padding: 20,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        color: '#000000'
    },
    buttonContainer: {
        backgroundColor: '#008000',
        paddingVertical: 14,

        width: '40%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,

    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        alignSelf: 'center',
        fontSize: 18,
    }
});
