import 'react-native-gesture-handler';
import React from 'react';
import MainAppNavigation from './app/navigation/MainAppNavigation';
import { store } from './app/redux/Store';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { navigationRef } from './app/navigation/RootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

let persister = persistStore(store)

export default function App() {

  const [loaded] = useFonts({
    'SF-Pro-Display-Black': require('./app/assets/fonts/SF-Pro-Display-Black.ttf'),
    'SF-Pro-Display-Bold': require('./app/assets/fonts/SF-Pro-Display-Bold.ttf'),
    'SF-Pro-Display-Heavy': require('./app/assets/fonts/SF-Pro-Display-Heavy.ttf'),
    'SF-Pro-Display-Light': require('./app/assets/fonts/SF-Pro-Display-Light.ttf'),
    'SF-Pro-Display-Medium': require('./app/assets/fonts/SF-Pro-Display-Medium.ttf'),
    'SF-Pro-Display-Regular': require('./app/assets/fonts/SF-Pro-Display-Regular.ttf'),
    'SF-Pro-Display-Semibold': require('./app/assets/fonts/SF-Pro-Display-Semibold.ttf'),
    'SF-Pro-Display-Thin': require('./app/assets/fonts/SF-Pro-Display-Thin.ttf'),
    'SF-Pro-Display-Ultralight': require('./app/assets/fonts/SF-Pro-Display-Ultralight.ttf'),
    'sf-pro-text-bold': require('./app/assets/fonts/sf-pro-text-bold.ttf'),
    'sf-pro-text-heavy': require('./app/assets/fonts/sf-pro-text-heavy.ttf'),
    'sf-pro-text-light': require('./app/assets/fonts/sf-pro-text-light.ttf'),
    'sf-pro-text-medium': require('./app/assets/fonts/sf-pro-text-medium.ttf'),
    'sf-pro-text-semibol': require('./app/assets/fonts/sf-pro-text-semibold.ttf'),
  })

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <NavigationContainer ref={navigationRef}>
            <MainAppNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};