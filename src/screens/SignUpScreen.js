import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CodeInput from 'react-native-confirmation-code-input';
import CountDown from 'react-native-countdown-component';
import LinearGradient from 'react-native-linear-gradient';
import {Button, useTheme} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './SignUpScreenStyles';
import firebaseSetup from '../../firebase';

const SignUpScreen = ({navigation}) => {
  const {colors} = useTheme();
  const otpRef = React.useRef();
  const {auth} = firebaseSetup();

  const [data, setData] = React.useState({
    fullName: '',
    phoneNumber: '',
    check_nameInputChange: false,
    check_numberInputChange: false,
    showInvalidNameError: false,
    showInvalidNumberError: false,
  });

  const [resendDisabled, setResendDisabled] = React.useState(false);
  const [showOtpBox, setShowOtpBox] = React.useState(false);
  const [counter, SetCounter] = React.useState(5);
  const [signUpButtonText, setSignUpButtonText] = React.useState('Send OTP');
  const [signUpButtonDisabled, setSignUpButtonDisabled] = React.useState(true);
  const [wrongOtpError, setWrongOtpError] = React.useState(false);
  const [firebaseConfirm, setFirebaseConfirm] = React.useState(null);

  const handleNameInputChange = (val) => {
    if (val.length > 2) {
      setData({
        ...data,
        fullName: val,
        check_nameInputChange: true,
      });

      if (data.check_numberInputChange) {
        setSignUpButtonDisabled(false);
      }
    } else {
      setData({
        ...data,
        fullName: val,
        check_nameInputChange: false,
        showInvalidNameError: true,
      });
      setSignUpButtonDisabled(true);
    }
  };

  const handleNumberInputChange = (val) => {
    if (val.length == 10) {
      setData({
        ...data,
        phoneNumber: val,
        check_numberInputChange: true,
      });

      if (data.check_nameInputChange) {
        setSignUpButtonDisabled(false);
      }
    } else {
      setData({
        ...data,
        phoneNumber: val,
        check_numberInputChange: false,
        showInvalidNumberError: true,
      });
      setSignUpButtonDisabled(true);
    }
  };

  const handleSendOtpButtonClick = async () => {
    setSignUpButtonDisabled(true);
    const confirmation = await auth().signInWithPhoneNumber(data.phoneNumber);
    if (confirmation) {
      setFirebaseConfirm(confirmation);
      setSignUpButtonText('Sign Up');
      setShowOtpBox(true);
    } else {
      setSignUpButtonDisabled(false);
    }
  };

  const handleChangeDetailsClick = () => {
    setShowOtpBox(false);
    setSignUpButtonText('Send OTP');
    setSignUpButtonDisabled(false);
  };

  const handleResend = async () => {
    // Handle Resend otp action here
    otpRef.current.clear();
    setWrongOtpError(false);
    const confirmation = await auth().signInWithPhoneNumber(data.phoneNumber);
    setResendDisabled(true);
    if(confirmation) {
    SetCounter(5);
    setFirebaseConfirm(confirmation);
    }
  };

  const handleOtpVerification = async (otp) => {
    // Write code to verify with correct otp
    // if (otp === '123456') {
    //   setSignUpButtonDisabled(false);
    //   setWrongOtpError(false);
    //   return;
    // }
    try{
      await firebaseConfirm.confirm(otp);
      setSignUpButtonDisabled(false);
      setWrongOtpError(false);
    }
    catch(err){
      console.log(JSON.stringify(err));
      setSignUpButtonDisabled(true);
      setWrongOtpError(true);
    }
  };

  const handleSignInButtonClick = () => {
    alert('Signed Up');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text_footer}>Full Name</Text>
          <View
            style={
              !data.check_nameInputChange && data.showInvalidNameError
                ? styles.actionError
                : styles.action
            }>
            <AntDesign name="adduser" color="#05375a" size={30} />
            <TextInput
              placeholder="Enter your full name"
              style={
                showOtpBox
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
              autoCapitalize="none"
              onChangeText={(val) => handleNameInputChange(val)}
              value={data.fullName}
              editable={!showOtpBox}
            />
            {data.check_nameInputChange && (
              <Animatable.View animation="bounceIn">
                <Feather name="user-check" color="green" size={20} />
              </Animatable.View>
            )}
          </View>
          {!data.check_nameInputChange && data.showInvalidNameError && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Name should be atleast 3 characters long
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
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
            <MaterialCommunityIcon
              name="phone-outline"
              color="#05375a"
              size={30}
            />
            <Text
              style={
                showOtpBox
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
              placeholder="Enter your phone number"
              keyboardType="number-pad"
              maxLength={10}
              style={
                showOtpBox
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
              onChangeText={(val) => handleNumberInputChange(val)}
              value={data.phoneNumber}
              editable={!showOtpBox}
            />
            {data.check_numberInputChange && (
              <Animatable.View animation="bounceIn">
                <MaterialCommunityIcon
                  name="phone-check-outline"
                  color="green"
                  size={20}
                />
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
            <Animatable.View animation="fadeIn" duration={300}>
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
                <MaterialCommunityIcon
                  name="lock-outline"
                  color="#05375a"
                  size={30}
                />
                <View style={{marginLeft: 10, alignSelf: 'baseline'}}>
                  <CodeInput
                    ref={otpRef}
                    secureTextEntry
                    className={'border-b'}
                    activeColor={wrongOtpError ? '#FF0000' : 'rgba(0, 0, 0, 1)'}
                    inactiveColor={
                      wrongOtpError ? '#FF0000' : 'rgba(0, 0, 0, 1)'
                    }
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
                      digitStyle={{backgroundColor: '#ffffff'}}
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
                    <Button mode="text" onPress={handleResend}>
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
              <TouchableOpacity onPress={handleChangeDetailsClick}>
                <Text style={{color: '#009387', marginTop: 15}}>
                  Change details?
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          )}

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={
                showOtpBox ? handleSignInButtonClick : handleSendOtpButtonClick
              }
              disabled={signUpButtonDisabled}>
              <LinearGradient
                colors={
                  signUpButtonDisabled
                    ? ['#aaa', '#bbb']
                    : ['#08d4c4', '#01ab9d']
                }
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  {signUpButtonText}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
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
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;
