import React, { useEffect, useState } from 'react'
import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { COLORS, fontFamily, sizes } from '../config/constants/Theme'
import InProgress2SVG from '../components/SVGs/InProgress2SVG'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Entypo, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { deleteAllPhoneNums, deletePhoneNum, sortByOld, sortByRecent } from '../redux/HistorySlice'
import AppScreen from '../components/common/AppScreen'
import moment from 'moment'
import { Menu, Divider, PaperProvider, Snackbar } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import NoDataSVG from '../components/SVGs/NoDataSVG'

const HistoryScreen = () => {

    const [visible, setVisible] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [showSortBy, setShowSortBy] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1)


    const dispatch = useDispatch();
    const { navigate } = useNavigation()
    const historyData = useSelector(state => state.historyData);



    const renderPhoneCard = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => onCardPress(index)}
            style={{
                width: sizes.width - 25,
                borderWidth: selectedIndex == index ? 1.2 : 0.5,
                borderColor: COLORS.secondary,
                paddingTop: 13,
                paddingHorizontal: 15,
                paddingBottom: selectedIndex == index ? 10 : 16,
                borderRadius: 10,
                backgroundColor: COLORS.white,
                marginTop: index == 0 ? 15 : null,
                marginBottom: index == historyData.length - 1 ? 15 : null,
                marginVertical: 5,
                alignSelf: 'center',
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={{ fontSize: 16, marginBottom: 2, fontFamily: fontFamily['SF-Pro-Display-Medium'] }}>+{item.phoneCode} {item.phoneNumber}</Text>
                    <Text numberOfLines={1} style={{ color: COLORS.mygrey, fontFamily: fontFamily['SF-Pro-Display-Regular'] }}>{moment(item.createdAt).format('D MMMM YYYY,  hh:mm A')}</Text>
                </View>
                {selectedIndex !== index ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: -12, marginTop: -15, }}>
                        <TouchableOpacity
                            style={styles.topButtons}
                            onPress={() => openWhatsApp(item)}
                        >
                            <FontAwesome name="whatsapp" size={26} color={COLORS.secondary} />
                        </TouchableOpacity>
                        <View
                            // onPress={() => onCardPress(index)}
                            style={styles.topButtons}
                        >
                            <Feather name="more-vertical" size={24} color={COLORS.rgba5} />
                        </View>
                    </View>
                    :
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: -6, marginTop: -22, }}>
                        <View style={styles.topButtons}>
                            <Feather name="chevron-up" size={24} color={COLORS.secondary} />
                        </View>
                    </View>
                }
            </View>
            {item.message !== '' ?
                <>
                    {selectedIndex !== index ?
                        <Text numberOfLines={5} style={{ marginTop: 5, fontFamily: fontFamily['SF-Pro-Display-Regular'], fontSize: 15 }}>{item.message}</Text>
                        :
                        <Text style={{ marginTop: 5, fontFamily: fontFamily['SF-Pro-Display-Regular'], fontSize: 15 }}>{item.message}</Text>
                    }
                </>
                : <></>
            }
            {isSelected && selectedIndex == index ?
                <View style={{ width: '100%', marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={styles.cardButtons}
                        onPress={() => callPress(item)}
                    >
                        <MaterialIcons name="call" size={24} color={COLORS.secondary} />
                    </TouchableOpacity>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        contentStyle={{ backgroundColor: COLORS.white, marginTop: 10, marginLeft: -20, paddingVertical: 2 }}
                        anchor={
                            <TouchableOpacity
                                style={styles.cardButtons}
                                onPress={() => {
                                    if (item?.message) {
                                        openMenu()
                                    } else {
                                        copyPress(item, 'phoneNum')
                                    }
                                }}
                            >
                                <MaterialCommunityIcons name="content-copy" size={22} color={COLORS.secondary} />
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item onPress={() => copyPress(item, 'phoneNum')} title="Copy Phone number" titleStyle={{ fontFamily: fontFamily['SF-Pro-Display-Regular'] }} style={styles.menuBtn} />
                        {item?.message !== '' ?
                            <>
                                <Divider />
                                <Menu.Item onPress={() => copyPress(item, 'message')} title="Copy Message" titleStyle={{ fontFamily: fontFamily['SF-Pro-Display-Regular'] }} style={styles.menuBtn} />
                            </>
                            : <></>
                        }
                    </Menu>
                    <TouchableOpacity
                        style={styles.cardButtons}
                        onPress={() => openWhatsApp(item)}
                    >
                        <FontAwesome name="whatsapp" size={26} color={COLORS.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cardButtons}
                        onPress={() => deletePress(item)}
                    >
                        <MaterialIcons name="delete-outline" size={26} color={COLORS.secondary} />
                    </TouchableOpacity>
                </View>
                : <></>
            }
        </TouchableOpacity>
    )

    const onCardPress = (index) => {
        if (selectedIndex == index) {
            setSelectedIndex(-1)
            setIsSelected(false)
        }
        else {
            setSelectedIndex(index)
            setIsSelected(true)
        }
    }

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const onDismissSnackBar = () => setShowSnackBar(false);

    const callPress = (item) => {
        Linking.openURL(`tel:+${item.phoneCode + item.phoneNumber}`)
    }

    const copyPress = async (item, type) => {
        closeMenu()
        if (type === 'phoneNum') {
            await Clipboard.setStringAsync(`+${item.phoneCode + item.phoneNumber}`);
            setSnackBarText(`Copied +${item.phoneCode} ${item.phoneNumber}`)
        }
        else if (type === 'message') {
            await Clipboard.setStringAsync(item.message);
            setSnackBarText(`Copied ${item.message}`)
        }
        setShowSnackBar(true)
    }

    const openWhatsApp = (item) => {
        let url = 'whatsapp://send?text=&phone=' + item.phoneCode + item.phoneNumber;
        Linking.openURL(url)
            .then(() => { })
            .catch(() => {
                Alert.alert('', 'Make sure Whatsapp is installed on your device', [
                    {
                        text: 'OK',
                        style: 'cancel',
                    },
                ]);
            });
    }

    const deletePress = (item) => {
        setSnackBarText(`Deleted +${item.phoneCode} ${item.phoneNumber}`)
        dispatch(deletePhoneNum(item))
        setShowSnackBar(true)
        setSelectedIndex(-1)
    }

    const deleteAllPress = (item) => {
        Alert.alert('Confirmation', 'Are you sure you want to delete the history?', [
            {
                text: 'Yes',
                onPress: () => {
                    setSnackBarText('History deleted')
                    dispatch(deleteAllPhoneNums())
                    setShowSnackBar(true)
                }
            },
            {
                text: 'No',
                style: 'cancel',
            },
        ]);
    }

    useEffect(() => {
        if (historyData.length > 0) {
            dispatch(sortByRecent())
        }
    }, [])


    return (
        <AppScreen>
            <PaperProvider>
                <View style={{ flex: 1 }}>
                    <View style={styles.topBarView}>
                        <View style={styles.topBarButtonsView}>
                            <TouchableOpacity
                                onPress={() => navigate("HomeScreen")}
                                style={[styles.button, { paddingRight: 18 }]}
                            >
                                <Feather name='arrow-left' size={24} color={COLORS.white} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 19, color: COLORS.white, marginTop: -1, fontFamily: fontFamily['SF-Pro-Display-Medium'] }}>History</Text>
                        </View>

                        {historyData.length > 0 ?
                            <View style={styles.topBarButtonsView}>
                                {historyData.length > 1 ?
                                    <Menu
                                        visible={showSortBy}
                                        onDismiss={() => setShowSortBy(false)}
                                        contentStyle={{ backgroundColor: COLORS.white, marginTop: 10, marginLeft: -20, paddingVertical: 2 }}
                                        anchor={
                                            <TouchableOpacity
                                                onPressIn={() => setShowSortBy(true)}
                                                onPress={() => setShowSortBy(true)}
                                                style={[styles.button, { paddingRight: 10 }]}
                                            >
                                                <MaterialCommunityIcons name='sort' size={28} color={COLORS.white} />
                                            </TouchableOpacity>
                                        }
                                    >
                                        <Menu.Item onPress={() => { setShowSortBy(false); setSelectedIndex(-1); dispatch(sortByRecent()) }} titleStyle={{ fontFamily: fontFamily['SF-Pro-Display-Regular'] }} style={styles.menuBtn} title="Sort by Recent" />
                                        <Divider />
                                        <Menu.Item onPress={() => { setShowSortBy(false); setSelectedIndex(-1); dispatch(sortByOld()) }} titleStyle={{ fontFamily: fontFamily['SF-Pro-Display-Regular'] }} style={styles.menuBtn} title="Sort by Old" />
                                    </Menu>
                                    : <></>
                                }
                                <TouchableOpacity
                                    onPress={() => deleteAllPress()}
                                    style={styles.button}
                                >
                                    <MaterialCommunityIcons name="delete-sweep-outline" size={28} color={COLORS.white} />
                                </TouchableOpacity>
                            </View>
                            : <></>
                        }
                    </View>

                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: COLORS.white }}>
                        {/* <InProgress2SVG size={sizes.width / 1.2} /> */}
                        {historyData.length > 0 ?
                            <FlatList
                                data={historyData}
                                bounces={false}
                                keyExtractor={item => item.id}
                                renderItem={renderPhoneCard}
                                style={{ width: sizes.width }}
                            />
                            :
                            <View style={{ marginTop: 30, alignSelf: 'center', alignItems: 'center', }}>
                                <Text style={{ fontSize: 20, color: COLORS.primary, fontFamily: fontFamily['SF-Pro-Display-Semibold'], letterSpacing: 0.5 }}>No History</Text>
                                <View style={{ marginTop: -30 }}>
                                    <NoDataSVG size={sizes.width + 20} />
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigate("HomeScreen")}
                                    style={{ backgroundColor: COLORS.primary, marginTop: -20, paddingHorizontal: 18, paddingLeft: 23, height: 45, borderRadius: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}
                                >
                                    <Entypo name="plus" size={20} color={COLORS.white} style={{ marginBottom: -1 }} />
                                    <Text style={{ color: COLORS.white, marginLeft: 3, marginRight: 5, fontSize: 17, fontFamily: fontFamily['SF-Pro-Display-Medium'], letterSpacing: 0.7 }}>ADD</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>


                    <Snackbar
                        visible={showSnackBar}
                        onDismiss={onDismissSnackBar}
                        duration={2000}
                        style={{ width: sizes.width - 25, alignSelf: 'center', marginBottom: 20 }}
                    >
                        <Text numberOfLines={3} style={{ color: COLORS.white }}>{snackBarText}</Text>
                    </Snackbar>
                </View>
            </PaperProvider>
        </AppScreen>
    )
}

export default HistoryScreen

const styles = StyleSheet.create({
    sortbyView: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    sortbyText: {
        fontSize: 16
    },
    topButtons: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "gold",
    },
    topBarView: {
        width: "100%",
        backgroundColor: COLORS.secondary,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cardButtons: {
        paddingHorizontal: 15,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "gold",
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    topBarButtonsView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 3,
    },
    menuBtn: {
        paddingRight: 20
    }
})