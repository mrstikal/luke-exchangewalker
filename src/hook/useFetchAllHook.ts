import { useEffect } from 'react';
import useFetch from '~hook/useFetchHook';
import {API_ENDPOINT_BASE, API_ENDPOINT_CURRENCIES} from '~constant/common';
import createFullExchangeInfo from '~helper/createFullExchangeInfo';
import {ExchangeSingleRecord} from '~type/exchange';
import {CurrencySingleRecord} from '~type/currency';
import useFullInfoStore from '~store/useFullInfoStore';

const useFetchAll = () => {
	const apiKey = import.meta.env.VITE_API_KEY;
	
	const {
		loading: loadingExchangeRates, 
		error: errorExchangeRates, 
		data: dataExchangeRates,
	} = useFetch(`${API_ENDPOINT_BASE}?web-api-key=${apiKey}`, 'exchangerates');
	
	const {
		loading: loadingCurrencies,
		error: errorCurrencies, 
		data: dataCurrencies,
	} = useFetch(`${API_ENDPOINT_CURRENCIES}?web-api-key=${apiKey}`, 'currencies')


	useEffect(() => {
		if (
			!loadingExchangeRates
				&& !loadingCurrencies
				&& !errorExchangeRates
				&& !errorCurrencies
				&& dataExchangeRates
				&& dataCurrencies
		) {
			const exchangeRates = dataExchangeRates as ExchangeSingleRecord[];
			const currencies = dataCurrencies as CurrencySingleRecord[];
			const fullInfo = createFullExchangeInfo({exchangeRates, currencies});

			useFullInfoStore.setState({
				converted: fullInfo,
				loading: false,
				error: false,
			});
		}

		if (errorExchangeRates || errorCurrencies && (!loadingExchangeRates && !loadingCurrencies)) {
			useFullInfoStore.setState({
				converted: null,
				loading: false,
				error: '503',
			});
		}
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	  }, [loadingExchangeRates, loadingCurrencies]);

	return true;
}

export default useFetchAll;