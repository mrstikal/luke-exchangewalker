import {ExchangeSingleRecord} from '~type/exchange';
import {CurrencySingleRecord} from '~type/currency';

interface UseFullInfoStoreSingleRecord extends ExchangeSingleRecord {
	countryFlag: string
    czechCurrencyName: string
    czechCountryName: string
}

interface InfoInput {
    exchangeRates: ExchangeSingleRecord[]
    currencies: CurrencySingleRecord[]
}

interface UseFullInfoStore {
    converted: Map<string, UseFullInfoStoreSingleRecord>| null
    loading: boolean
    error: boolean | string
}

export {UseFullInfoStoreSingleRecord, InfoInput, UseFullInfoStore}