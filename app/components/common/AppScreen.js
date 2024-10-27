import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { COLORS } from '../../config/constants/Theme'

const AppScreen = ({ children }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={COLORS.secondary}
            />
            {children}
        </SafeAreaView>
    )
}

export default AppScreen