import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, fontFamily, sizes } from '../config/constants/Theme'
import TopBarNavigator from '../navigation/TopBarNavigator'
import AppScreen from '../components/common/AppScreen'
import MainScreen from './MainScreen'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

    const { navigate } = useNavigation()

    return (
        <AppScreen>

            <View style={styles.topBarView}>
                <Text style={{ fontSize: 20, color: COLORS.white, fontFamily: fontFamily['SF-Pro-Display-Semibold'] }}>WhatsApp DM</Text>
                <TouchableOpacity
                    onPress={() => navigate("HistoryScreen")}
                    style={styles.button}
                >
                    <MaterialIcons name="history" size={30} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            {/* <TopBarNavigator /> */}

            <MainScreen />

        </AppScreen>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    topBarView: {
        width: "100%",
        backgroundColor: COLORS.secondary,
        height: 70,
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 2,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.rgba2
    },
    modalView: {
        width: "80%",
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
        paddingTop: 15,
        paddingBottom: 30
    },
})