import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CurrencyListContext } from '../context/CurrencyListProvider';

const HomeScreen = ({ navigation }) => {

    const { currentCurrency1, currentCurrency2, setCurrentOption } = useContext(CurrencyListContext);
    const [currencyVal1, setCurrencyVal1] = useState('');
    const [currencyVal2, setCurrencyVal2] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    var myHeaders = new Headers();
    myHeaders.append("apikey", "FjvojSWyGTT6clnC1zAr56fte3sOevGw");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    useEffect(() => {
        if (!isFocused) {
            fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currentCurrency2.title}&from=${currentCurrency1.title}&amount=${Number(currencyVal1)}`, requestOptions)
                .then(response => response.json())
                .then(data => setCurrencyVal2(String(data.result)))
                .catch(error => console.error(error));
        } else {
            fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currentCurrency1.title}&from=${currentCurrency2.title}&amount=${Number(currencyVal2)}`, requestOptions)
                .then(response => response.json())
                .then(data => setCurrencyVal1(String(data.result)))
                .catch(error => console.error(error));
        }
    }, [currencyVal1, currencyVal2]);

    return (
        <View style={styles.mainView}>
            <View>
                <View style={styles.currencyView}>
                    <View style={{ width: '50%' }}>
                        <TouchableWithoutFeedback onPress={() => {
                            setCurrentOption(1)
                            navigation.push('CurrencyList')
                        }}>
                            <View>
                                <Text style={styles.countryText}>{currentCurrency1.value} {currentCurrency1.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <AntDesign name="right" size={24} color="grey" />
                    <View style={styles.countryValue}>
                        <TextInput
                            style={[styles.countryInput, { color: isFocused ? '#fff' : '#38d6d5' }]}
                            keyboardType="numeric"
                            autoFocus={true}
                            maxLength={10}
                            value={currencyVal1 == 'undefined' ? '0' : currencyVal1}
                            onChangeText={(newValue) => setCurrencyVal1(newValue)}
                        />
                    </View>
                </View>
                <View style={styles.currencyView}>
                    <View style={{ width: '50%' }}>
                        <TouchableWithoutFeedback onPress={() => {
                            setCurrentOption(2)
                            navigation.push('CurrencyList')
                        }}>
                            <View>
                                <Text style={styles.countryText}>{currentCurrency2.value} {currentCurrency2.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <AntDesign name="right" size={24} color="grey" />
                    <View style={styles.countryValue}>
                        <TextInput
                            style={[styles.countryInput, { color: isFocused ? '#38d6d5' : '#fff' }]}
                            keyboardType="numeric"
                            maxLength={10}
                            value={currencyVal2 == 'undefined' ? '0' : currencyVal2}
                            onChangeText={(newValue) => setCurrencyVal2(newValue)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#1c1e21',
        flex: 1,
    },
    currencyView: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    countryText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',

    },
    countryValue: {
        flex: 1,
        marginLeft: 10
    },
    countryInput: {
        color: '#38d6d5',
        fontSize: 22,
        textAlign: 'right',
        padding: 5,
    },
})

export default HomeScreen
