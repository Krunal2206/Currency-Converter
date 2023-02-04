import React, { useContext } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { CurrencyListContext } from '../context/CurrencyListProvider';

const Item = ({ title, value, navigation }) => {

    const { currentCurrency1, setCurrentCurrency1, currentCurrency2, setCurrentCurrency2, currentOption } = useContext(CurrencyListContext);

    return (
        <TouchableWithoutFeedback onPress={() => {
            if (currentOption == 1) {
                setCurrentCurrency1({ title, value })
            } else {
                setCurrentCurrency2({ title, value })
            }
            navigation.push('Home')
        }}>
            <View style={styles.item}>
                <Text style={styles.title}>{title} - {value}</Text>
                {
                    currentCurrency1.title == title || currentCurrency2.title == title ? <Ionicons name="radio-button-on" size={22} color="#38d6d5" /> : <Ionicons name="radio-button-off" size={22} color="grey" />
                }
            </View>
        </TouchableWithoutFeedback>
    )
};

const CurrencyListScreen = ({ navigation }) => {

    const { currencyItems } = useContext(CurrencyListContext);

    return (
        <View style={styles.mainView}>
            <FlatList
                data={currencyItems}
                renderItem={({ item }) => <Item title={item.key} value={item.value} navigation={navigation} />}
                keyExtractor={item => item.key}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#1c1e21',
        flex: 1
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 20,
        color: '#fff',
        width: '90%'
    },
})

export default CurrencyListScreen
