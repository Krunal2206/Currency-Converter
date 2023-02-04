import React, { createContext, useEffect, useState } from 'react'

export const CurrencyListContext = createContext();

const CurrencyListProvider = (props) => {

    const [currency, setCurrency] = useState({});
    const [currentOption, setCurrentOption] = useState();
    const [currentCurrency1, setCurrentCurrency1] = useState({ title: 'USD', value: 'United States Dollar' });
    const [currentCurrency2, setCurrentCurrency2] = useState({ title: 'INR', value: 'Indian Rupee' });
    const currencyItems = Object.entries(currency).map(([key, value]) => ({ key, value }));

    var myHeaders = new Headers();
    myHeaders.append("apikey", "FjvojSWyGTT6clnC1zAr56fte3sOevGw");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    useEffect(() => {
        fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
            .then(response => response.json())
            .then(data => setCurrency(data.symbols))
            .catch(error => console.error(error));
    }, []);

    return (
        <CurrencyListContext.Provider value={{ currencyItems, currentCurrency1, setCurrentCurrency1, currentCurrency2, setCurrentCurrency2, currentOption, setCurrentOption }}>
            {props.children}
        </CurrencyListContext.Provider>
    )
}

export default CurrencyListProvider
