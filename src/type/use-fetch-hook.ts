import {CurrencySingleRecord} from '~type/currency';
import {ExchangeSingleRecord} from '~type/exchange';

export interface UseFetchHook {
    loading: boolean
    error: boolean | string
    data?: CurrencySingleRecord[] | ExchangeSingleRecord[] | null
}
