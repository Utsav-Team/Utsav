import React from 'react';
import {StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CodeInput from 'react-native-confirmation-code-input';
import CountDown from 'react-native-countdown-component';
import LinearGradient from 'react-native-linear-gradient';
import {Button, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './SignInScreenStyles';
import firebaseSetup from '../../firebase';

const COUNTRY_CODE_IN = '+91';

const SignInScreen = ({navigation}) => {
  const {firebase} = firebaseSetup();
  const {colors} = useTheme();
  const otpRef = React.useRef();

  const [data, setData] = React.useState({
    phoneNumber: '',
    check_numberInputChange: false,
    showInvalidNumberError: false,
  });

  const [showOtpBox, setShowOtpBox] = React.useState(false);
  const [counter, SetCounter] = React.useState(10);
  const [resendDisabled, setResendDisabled] = React.useState(true);
  const [signInButtonDisabled, setSignInButtonDisabled] = React.useState(true);
  const [signInButtonText, setSignInButtonText] = React.useState('Send OTP');
  const [wrongOtpError, setWrongOtpError] = React.useState(false);
  const [firebaseConfirm, setFirebaseConfirm] = React.useState(null);
  const [inputDisabled, setInputDisabled] = React.useState(false);

  const handleNumberInputChange = (val) => {
    if (val.trim().length == 10) {
      setData({
        ...data,
        phoneNumber: val.trim(),
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
    setInputDisabled(true);
    setSignInButtonDisabled(true);
    let phone_number = COUNTRY_CODE_IN + data.phoneNumber;
    firebase
      .auth()
      .signInWithPhoneNumber(phone_number)
      .then((confirmation) => {
        setFirebaseConfirm(confirmation);
        setSignInButtonText('Sign In');
        setShowOtpBox(true);
        setResendDisabled(true);
        SetCounter(10);
      })
      .catch((err) => {
        console.log("ERROR >>>>>>>>>> ", err);
        setSignInButtonDisabled(false);
      });
  };

  const handleChangePhoneNumberClick = () => {
    setShowOtpBox(false);
    setSignInButtonText('Send OTP');
    setSignInButtonDisabled(false);
    setInputDisabled(false);
  };

  const handleResendOtp = async () => {
    otpRef.current.clear();
    setSignInButtonDisabled(true);
    setWrongOtpError(false);
    setResendDisabled(true);
    SetCounter(10);
    await firebase
      .auth()
      .signInWithPhoneNumber(data.phoneNumber)
      .then((confirmation) => {
        setFirebaseConfirm(confirmation);
      })
      .catch((err) => {
        console.log("ERROR >>>>>>>>>> ", err);
      });
  };

  const handleOtpVerification = async (otp) => {
    try {
      await firebaseConfirm.confirm(otp);
      firebase.auth().currentUser.updateProfile({
        displayName: data.fullName,
      });
      setSignInButtonDisabled(false);
      setWrongOtpError(false);
    } catch (err) {
      setSignInButtonDisabled(true);
      setWrongOtpError(true);
    }
  };

  const handleSignInButtonClick = () => {
    alert('Signed In');
  };

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
        <View
          style={
            !data.check_numberInputChange && data.showInvalidNumberError
              ? styles.actionError
              : styles.action
          }>
          <Icon name="phone-outline" color="#05375a" size={30} />
          <Text
            style={
              inputDisabled
                ? [
                    styles.isoCode,
                    {
                      color: '#aaaaa0',
                    },
                  ]
                : [
                    styles.isoCode,
                    {
                      color: colors.text,
                    },
                  ]
            }>
            +91
          </Text>
          <TextInput
            placeholder="Registered phone number"
            placeholderTextColor="#666666"
            keyboardType="phone-pad"
            maxLength={10}
            style={
              inputDisabled
                ? [
                    styles.textInput,
                    {
                      color: '#aaaaa0',
                    },
                  ]
                : [
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]
            }
            value={data.phoneNumber}
            onChangeText={(val) => handleNumberInputChange(val)}
            editable={!inputDisabled}
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
                  activeColor={wrongOtpError ? '#FF0000' : 'rgba(0, 0, 0, 1)'}
                  inactiveColor={wrongOtpError ? '#FF0000' : 'rgba(0, 0, 0, 1)'}
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
                {resendDisabled ? (
                  <CountDown
                    until={counter}
                    size={15}
                    onFinish={() => setResendDisabled(() => false)}
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
            <TouchableOpacity onPress={handleChangePhoneNumberClick}>
              <Text style={{color: '#009387', marginTop: 15}}>
                Change phone number?
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={
              showOtpBox ? handleSignInButtonClick : handleSendOtpButtonClick
            }
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
