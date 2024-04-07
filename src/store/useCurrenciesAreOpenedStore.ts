import { create } from 'zustand';
import {CurrenciesAreOpened} from '~type/use-currencies-are-opened';


const useCurrenciesAreOpenedStore = create<CurrenciesAreOpened>((set) => ({
	opened: false,
	updateOpened: (openedState) => set({ opened: openedState }),
}))

export default useCurrenciesAreOpenedStore;