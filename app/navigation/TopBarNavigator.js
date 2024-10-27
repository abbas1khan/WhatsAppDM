import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainScreen from '../screens/MainScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { COLORS } from "../config/constants/Theme";

const Tab = createMaterialTopTabNavigator();

function TopBarNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.secondary,
                },
                tabBarLabelStyle: {
                    color: COLORS.white,
                    fontWeight: '500',
                    fontSize: 16,
                    textTransform: 'none'
                },
                tabBarIndicatorStyle: {
                    backgroundColor: COLORS.white,
                    height: 3
                },

            }}
        >
            <Tab.Screen name="MainScreen" component={MainScreen}
                options={{
                    title: "Chat"
                }}
            />
            <Tab.Screen name="HistoryScreen" component={HistoryScreen}
                options={{
                    title: "History"
                }}
            />
        </Tab.Navigator>
    );
}

export default TopBarNavigator