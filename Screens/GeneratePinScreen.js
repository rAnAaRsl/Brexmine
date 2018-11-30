import React, {Component} from 'react';
import {
    Alert,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    BackHandler,
    NetInfo,
    Dimensions,
    StyleSheet, AsyncStorage
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default class GeneratePinScreen extends Component {
    city = '';
    data = '';
    email = '';
    name = '';
    mobile = '';
    cnic = '';
    address = '';

    constructor(props) {
        super(props)
        this.state = {
            userPassword: '',
            confirmPassword: '',
            isLoading: false,
        }
        this._handlePress = this
            ._handlePress
            .bind(this);

    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    }

    handleBackPress = () => {

        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }


    _handlePress() {
        if (this.state.userPassword === '' || this.state.confirmPassword === '') {
            Alert.alert("Kindly Provide Pin");
        }
        else if (this.state.userPassword !== this.state.confirmPassword) {
            Alert.alert("Pin Does not Match");
        }
        else {
            AsyncStorage.setItem('pin', this.state.userPassword);
            const {navigate} = this.props.navigation;
            navigate("WebViewScreen");

        }
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
                            marginBottom: 70
                        }}/>
                </View>
                <Text style={{marginBottom: 10}}>
                    Please Provide Pin for Protection of Your App
                </Text>
                <TextInput
                    style={styles.input}
                    returnKeyType="go"
                    keyboardType='numeric'
                    maxLength={4}
                    underlineColorAndroid="rgb(128,128,128)"
                    onChangeText=
                        {(text) => this.setState({userPassword: text})}
                    ref={(input) => {
                    }}
                    placeholder="Password"
                    placeholderTextColor="#000000"
                    secureTextEntry/>
                <TextInput
                    style={styles.input}
                    returnKeyType="go"
                    keyboardType='numeric'
                    maxLength={4}
                    underlineColorAndroid="rgb(128,128,128)"
                    onChangeText=
                        {(text) => this.setState({confirmPassword: text})}
                    ref={(input) => {
                    }}
                    placeholder="Confirm Password"
                    placeholderTextColor="#000000"
                    secureTextEntry/>

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
                <View>
                    <Text>
                        Note: If your forget your Pin then simply uninstall the App and install it again to recover.
                    </Text>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 10,
        padding: 10,
        color: '#000000'
    },
    buttonContainer: {
        backgroundColor: '#008000',
        paddingVertical: 14,
        marginBottom: 10,
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

