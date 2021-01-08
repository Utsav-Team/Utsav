import React from 'react';
import {StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CodeInput from 'react-native-confirmation-code-input';
import CountDown from 'react-native-countdown-component';
import LinearGradient from 'react-native-linear-gradient';
import {Button, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './SignInScreenStyles';

const SignInScreen = ({navigation}) => {

  const {colors} = useTheme();
  const otpRef = React.useRef();

  const [data, setData] = React.useState({
    phoneNumber: '',
    check_numberInputChange: false,
    showInvalidNumberError: false,
  });

  const [showOtpBox, setShowOtpBox] = React.useState(false);
  const [counter, SetCounter] = React.useState(5);
  const [disabled, setDisabled] = React.useState(true);
  const [signInButtonDisabled, setSignInButtonDisabled] = React.useState(true);
  const [signInButtonText, setSignInButtonText] = React.useState('Send OTP');
  const [wrongOtpError, setWrongOtpError] = React.useState(false);

  const handleNumberInputChange = (val) => {
    if (val.trim().length == 10) {
      setData({
        ...data,
        phoneNumber: val,
        check_numberInputChange: true,
      });
      setSignInButtonDisabled(false);
    } else {
      setData({
        ...data,
        phoneNumber: val,
        check_numberInputChange: false,
        showInvalidNumberError: true,
      });
      setSignInButtonDisabled(true);
    }
  };

  const handleSendOtpButtonClick = () => {
    // Write code to send otp
    setSignInButtonText('Sign In');
    setShowOtpBox(true);
    setSignInButtonDisabled(true);
  };

  const handleChangePhoneNumberClick = () => {
    setShowOtpBox(false);
    setData({
      phoneNumber: '',
      check_numberInputChange: false,
      showInvalidNumberError: false,
    });
    setSignInButtonText('Send OTP');
    setSignInButtonDisabled(false);
  }

  const handleResendOtp = () => {
    // Write code to send a new otp
    otpRef.current.clear();
    setWrongOtpError(false);
    SetCounter(5);
    setDisabled(true);
    setSignInButtonDisabled(true);
  };

  const handleOtpVerification = (otp) => {
    // Write code to verify with correct otp
    if (otp === '123456') {
      setSignInButtonDisabled(false);
      setWrongOtpError(false);
      return;
    }
    setSignInButtonDisabled(true);
    setWrongOtpError(true);
  };

  const handleSignInButtonClick = () => {
    alert('Signed In');
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Sign In</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}>
          Phone Number
        </Text>
        <View style={!data.check_numberInputChange && data.showInvalidNumberError ? styles.actionError : styles.action}>
          <Icon name="phone-outline" color="#05375a" size={30} />
          <Text
            style={showOtpBox ? [
              styles.isoCode,
              {
                color: '#aaaaa0'
              },
            ] : 
            [
              styles.isoCode,
              {
                color: colors.text,
              },
            ]}>
            +91
          </Text>
          <TextInput
            placeholder="Registered phone number"
            placeholderTextColor="#666666"
            keyboardType="phone-pad"
            maxLength={10}
            style={showOtpBox ? [
              styles.textInput,
              {
                color: '#aaaaa0'
              },
            ] : 
            [
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            value={data.phoneNumber}
            onChangeText={(val) => handleNumberInputChange(val)}
            editable={!showOtpBox}
          />
          {data.check_numberInputChange && (
            <Animatable.View animation="bounceIn">
              <Icon name="phone-check-outline" color="green" size={20} />
            </Animatable.View>
          )}
        </View>

        {!data.check_numberInputChange && data.showInvalidNumberError && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Please enter a valid phone number
            </Text>
          </Animatable.View>
        )}

        {showOtpBox && (
          <Animatable.View animation="fadeInDown" duration={300}>
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  marginTop: 20,
                },
              ]}>
              OTP
            </Text>
            <View style={styles.otp}>
              <Icon name="lock-outline" color="#05375a" size={30} />
              <View style={{marginLeft: 10, alignSelf: 'baseline'}}>
                <CodeInput
                  ref={otpRef}
                  secureTextEntry
                  className={'border-b'}
                  activeColor={wrongOtpError ? '#FF0000' : "rgba(0, 0, 0, 1)"}
                  inactiveColor={wrongOtpError ? '#FF0000' : "rgba(0, 0, 0, 1)"}
                  space={10}
                  keyboardType="numeric"
                  // autoFocus={true}
                  codeLength={6}
                  size={20}
                  inputPosition="left"
                  onFulfill={(code) => handleOtpVerification(code)}
                  onFocus={() => setHideButtons(true)}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {disabled ? (
                  <CountDown
                    until={counter}
                    size={15}
                    onFinish={() => setDisabled(() => false)}
                    separatorStyle={{color: 'black'}}
                    digitStyle={{backgroundColor: '#f6f6f6'}}
                    digitTxtStyle={{
                      color: 'black',
                      fontWeight: '100',
                      fontSize: 14,
                    }}
                    timeToShow={['M', 'S']}
                    showSeparator
                    timeLabels={{m: '', s: ''}}
                  />
                ) : (
                  <Button mode="text" onPress={handleResendOtp}>
                    RESEND
                  </Button>
                )}
              </View>
            </View>
            {wrongOtpError && (
              <Animatable.View animation="wobble">
                <Text style={styles.errorMsg}>Please enter correct OTP</Text>
              </Animatable.View>
            )}
            <TouchableOpacity onPress={handleChangePhoneNumberClick} >
                <Text style={{color: '#009387', marginTop:15}}>Change phone number?</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={showOtpBox ? handleSignInButtonClick : handleSendOtpButtonClick}
            disabled={signInButtonDisabled}>
            <LinearGradient
              colors={
                signInButtonDisabled ? ['#aaa', '#bbb'] : ['#08d4c4', '#01ab9d']
              }
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                {signInButtonText}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              {
                borderColor: '#009387',
                borderWidth: 2,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#009387',
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
