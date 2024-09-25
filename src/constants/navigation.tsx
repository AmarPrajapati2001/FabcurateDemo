import React from 'react';

/**
 * Navigates to a next screen using react navigation.
 * @param navigation
 * @param item
 */
const navigateTo = ({ navigate, routeId, props }: any) => {
  navigate(routeId, props);
};

const navigationRef = React.createRef<any>();

//Auth Screen
const SPLASH = 'Splash';
const LOGIN = 'Login';
const REGISTER = 'Register';
const HOMESCREEN = 'HomeScreen';
const OTPVERIFICATIONSCREEN = 'OTPVerificationScreen';
const ALLCATEGORYSCREEN = 'AllCategoryScreen';
const PROFILESCREEN = 'ProfileScreen';
const TEXTTOSPEECHSCREEN = 'TextToSpeechScreen';
const SPEECHTOSPEECHSCREEN = 'SpeechToSpeechScreen';
const SELECTEDVOICESCREEN = 'SelectedVoiceScreen';
const VOICELISTSCREEN = 'VoiceListScreen';
const GENERATEDVOICESCREEN = 'GeneratedVoiceScreen';
const CREATEOWNVOICESCREEN = 'CreateOwnVoiceScreen';
const HISTORYSCREEN = 'HistoryScreen';
const UPLOADFILESCREEN = 'UploadFileScreen';
const AIVOICEGENERATIONSCREEN = 'AIVoiceGenerationScreen';
const RECENTHISTORYSCREEN = 'RecentHistoryScreen';
const NOTIFICATIONSCREEN = 'NotificationScreen';
const REGISTRATIONSCREEN = 'RegistrationScreen';
const BOTTOMTABNAVIGATOR = 'bottomTabNavigator';

const NAVIGATION = {
  SPLASH,
  BOTTOMTABNAVIGATOR,
  LOGIN,
  REGISTER,
  HOMESCREEN,
  OTPVERIFICATIONSCREEN,
  ALLCATEGORYSCREEN,
  PROFILESCREEN,
  TEXTTOSPEECHSCREEN,
  SPEECHTOSPEECHSCREEN,
  SELECTEDVOICESCREEN,
  VOICELISTSCREEN,
  GENERATEDVOICESCREEN,
  CREATEOWNVOICESCREEN,
  HISTORYSCREEN,
  UPLOADFILESCREEN,
  AIVOICEGENERATIONSCREEN,
  RECENTHISTORYSCREEN,
  NOTIFICATIONSCREEN,
  REGISTRATIONSCREEN
};

const popupModalOptions = {
  animationEnabled: true,
  cardStyle: { backgroundColor: 'rgba(0,0,0, 0.15)' },
  cardStyleInterpolator: ({ current: { progress } }: any) => {
    return {
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.15, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1],
        }),
      },
    };
  },
};

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const navigateByRef = (name: any, params: any) => {
  navigationRef.current?.navigate(name, params);
};

const popAndGoToByRef = (to: any, params: any) => {
  navigationRef.current?.goBack();
  setTimeout(() => {
    navigationRef.current?.navigate(to, params);
  }, 200);
};

export {
  navigationRef,
  navigateByRef,
  popAndGoToByRef,
  navigateTo,
  NAVIGATION,
  popupModalOptions,
  horizontalAnimation,
};
