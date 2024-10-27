import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Modal, FlatList, Linking, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TextInput, Snackbar } from 'react-native-paper';
import { COLORS, fontFamily, isAndroid, sizes } from '../config/constants/Theme';
import ChatSVG2 from '../components/SVGs/ChatSVG2';
import { CountryPhoneCodesData } from '../config/constants/CountryPhoneCodesData';
import { Feather } from '@expo/vector-icons';
import { TextInput as NormalTextInput } from 'react-native'
import { useDispatch } from 'react-redux';
import { addPhoneNum } from '../redux/HistorySlice';
import { Alert } from 'react-native';

const MainScreen = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [whatsAppMsg, setWhatsAppMsg] = useState('');
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [countryCodesModalVisible, setCountryCodesModalVisible] = useState(false);
    const [countryCodesData, setcountryCodesData] = useState(CountryPhoneCodesData);
    const [phoneCode, setPhoneCode] = useState('91');
    const [seacrhPhnCode, setSeacrhPhnCode] = useState('');
    const [selectedPhnCode, setSelectedPhnCode] = useState('IN');

    const dispatch = useDispatch()

    const openWhatsaApp = () => {
        if (mobileNumber.trim().length <= 3) {
            setShowSnackBar(true)
        }
        else {
            let url = 'whatsapp://send?text=' + whatsAppMsg.trim() + '&phone=' + phoneCode + mobileNumber;
            Linking.openURL(url)
                .then((data) => addPhnNumAndStoreInCache())
                .catch(() => {
                    Alert.alert('', 'Make sure Whatsapp is installed on your device', [
                        {
                            text: 'OK',
                            style: 'cancel',
                        },
                    ]);
                });
        }
    }

    const addPhnNumAndStoreInCache = async () => {
        let data = {
            phoneCode: phoneCode,
            phoneNumber: mobileNumber,
            message: whatsAppMsg.trim(),
            id: (Date.now() * Math.random() * 1000).toFixed(0),
            createdAt: Date.now(),
        }
        dispatch(addPhoneNum(data))
        setTimeout(() => {
            setMobileNumber("")
            setWhatsAppMsg("")
        }, 100);
    }

    const onDismissSnackBar = () => {
        setShowSnackBar(false)
    }

    const renderCountryPhoneCodeItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            onPress={() => {
                setCountryCodesModalVisible(false)
                let code = item.dial_code.replace('+', '')
                setPhoneCode(code)
                setSelectedPhnCode(item.code)
            }}
        >
            <View style={{ width: '100%', paddingVertical: 9, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <View style={{ width: 60 }}>
                    <Text style={{ fontSize: 15, fontFamily: fontFamily['SF-Pro-Display-Regular'] }}>{item.dial_code}</Text>
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Text numberOfLines={2} style={{ marginLeft: 5, fontSize: 15, fontFamily: fontFamily['SF-Pro-Display-Medium'] }}>{item.name}</Text>
                </View>
                {selectedPhnCode === item.code && <Feather name="check" size={14} color="black" />}
            </View>
        </TouchableOpacity>
    )

    const onSearch = (searchText) => {
        if (searchText.trim() == '') {
            setcountryCodesData(CountryPhoneCodesData)
            setSeacrhPhnCode(searchText)
        }
        else {
            const newData = CountryPhoneCodesData.filter(item => {
                if (item.name.toLowerCase().indexOf(searchText.trim().toLowerCase()) > -1) {
                    return item;
                }
                if (item.dial_code.toLowerCase().indexOf(searchText.trim().toLowerCase()) > -1) {
                    return item;
                }
            })
            if (newData.length > 0) {
                setcountryCodesData(newData)
            }
            else {
                setcountryCodesData([])
            }
            setSeacrhPhnCode(searchText)
        }
    }

    const openCountryPhoneCodesModal = () => {
        setCountryCodesModalVisible(true)
        setSeacrhPhnCode('')
        setcountryCodesData(CountryPhoneCodesData)
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={isAndroid ? 'padding' : 'padding'} // Adjust for platform
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='always'
                showsVerticalScrollIndicator={false}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.subContainer}>
                            <View style={{ marginTop: -15, marginBottom: -10 }}>
                                <ChatSVG2 size={sizes.width / 1.2} />
                            </View>
                            <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, }}>
                                <View style={{ width: '100%' }}>
                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPress={() => openCountryPhoneCodesModal()}
                                        >
                                            <View style={{ height: 50, backgroundColor: COLORS.white, borderColor: COLORS.rgba5, paddingLeft: 12, paddingRight: 6, flexDirection: 'row', borderRadius: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 1.1, marginTop: 6, marginRight: 8 }}>
                                                <Text style={{ fontSize: 15, fontFamily: fontFamily['SF-Pro-Display-Regular'] }}>+{phoneCode}</Text>
                                                <Feather name="chevron-down" size={20} color={COLORS.rgba8} style={{ marginTop: 2, marginLeft: 4 }} />
                                            </View>
                                        </TouchableOpacity>
                                        <TextInput
                                            mode='outlined'
                                            value={mobileNumber}
                                            onChangeText={(mobileNumber) => setMobileNumber(mobileNumber.trim().replaceAll(/[^0-9]/g, ''))}
                                            placeholder='Ex: 987654321'
                                            label="Enter whatsapp number"
                                            keyboardType='number-pad'
                                            maxLength={13}
                                            activeOutlineColor={COLORS.primary}
                                            style={{ flex: 1 }}
                                            theme={{ fonts: { bodyLarge: { fontFamily: fontFamily['SF-Pro-Display-Regular'], letterSpacing: 0.3 } } }}
                                        />
                                    </View>
                                    <TextInput
                                        mode='outlined'
                                        value={whatsAppMsg}
                                        onChangeText={(whatsAppMsg) => setWhatsAppMsg(whatsAppMsg)}
                                        label="Enter message (optional)"
                                        multiline={true}
                                        placeholder="Ex: Hi, how are you?"
                                        activeOutlineColor={COLORS.primary}
                                        style={{ maxHeight: 200, marginTop: 10, marginBottom: 15 }}
                                        contentStyle={{ paddingTop: 12 }}
                                        theme={{ fonts: { bodyLarge: { fontFamily: fontFamily['SF-Pro-Display-Regular'], letterSpacing: 0.3 } } }}
                                    />
                                    <TouchableOpacity
                                        activeOpacity={0.4}
                                        style={styles.buttonStyle}
                                        onPress={() => openWhatsaApp()}>
                                        <Text style={styles.buttonTextStyle}>
                                            OPEN IN WHATSAPP
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', paddingLeft: 2 }}>
                                    <Text style={{ marginVertical: 25, color: COLORS.grey[500], textAlign: 'left', fontFamily: fontFamily['SF-Pro-Display-Regular'] }}>
                                        Note: You can directly open a chat with a number on WhatsApp without saving it to your contacts.
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={countryCodesModalVisible}
                            onRequestClose={() => {
                                setCountryCodesModalVisible(false)
                            }}>
                            <TouchableWithoutFeedback onPress={() => { setCountryCodesModalVisible(false), setSeacrhPhnCode('') }}>
                                <View style={styles.centeredView}>
                                    <TouchableWithoutFeedback>
                                        <View style={styles.modalView}>
                                            <View style={{ flexDirection: 'row', margin: 12 }}>
                                                <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderRadius: 7 }}>
                                                    <Feather name="search" size={24} color={COLORS.grey[600]} style={{ marginLeft: 8, marginRight: 6 }} />
                                                    <NormalTextInput
                                                        value={seacrhPhnCode}
                                                        placeholder='Search'
                                                        onChangeText={(txt) => onSearch(txt)}
                                                        style={{ flex: 1, height: '100%', fontFamily: fontFamily['SF-Pro-Display-Regular'] }}
                                                    />
                                                </View>
                                            </View>
                                            {countryCodesData.length > 0 ?
                                                <FlatList
                                                    data={countryCodesData}
                                                    keyboardShouldPersistTaps='always'
                                                    keyExtractor={(item, index) => index}
                                                    ItemSeparatorComponent={<View style={{ borderWidth: 0.5, borderColor: COLORS.grey[300] }} />}
                                                    renderItem={renderCountryPhoneCodeItem}
                                                />
                                                :
                                                <View style={{ paddingHorizontal: 15 }}>
                                                    <Text style={{ textAlign: 'center', fontFamily: fontFamily['SF-Pro-Display-Regular'], fontSize: 15 }}>No result for {seacrhPhnCode}</Text>
                                                </View>
                                            }
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                        <Snackbar
                            visible={showSnackBar}
                            onDismiss={onDismissSnackBar}
                            duration={3000}
                            wrapperStyle={{ alignSelf: 'center', position: 'absolute', top: sizes.width - 20 }}
                        >
                            <Text numberOfLines={1} style={{ color: COLORS.white, fontFamily: fontFamily['SF-Pro-Display-Regular'], letterSpacing: 0.3 }}>
                                Please enter valid whatsapp number
                            </Text>
                        </Snackbar>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    subContainer: {
        alignItems: 'center',
    },
    buttonStyle: {
        justifyContent: 'center',
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        // fontWeight: '600',
        fontFamily: fontFamily['sf-pro-text-bold']
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.rgba2
    },
    modalView: {
        width: "80%",
        height: '75%',
        position: 'absolute',
        alignSelf: 'center',
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
        overflow: 'hidden'
    },
});