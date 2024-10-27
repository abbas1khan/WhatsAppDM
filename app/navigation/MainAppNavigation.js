import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { isAndroid } from '../config/constants/Theme';

const MainAppNavigation = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...(isAndroid && { ...TransitionPresets.SlideFromRightIOS })
            }}
            initialRouteName={'HomeScreen'}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
        </Stack.Navigator>
    )
}

export default MainAppNavigation