import { UseFullInfoStoreSingleRecord } from '~type/use-full-info-store';
import cnl from '~helper/convertNumberToLocale';

const currencyMap = (currency: UseFullInfoStoreSingleRecord) => {
	const map = new Map();
	map.set('Množství', currency.amount);
	map.set('Směnný kurz pro hotovostní operace - nákup', cnl(currency.valBuy));
	map.set('Směnný kurz pro hotovostní operace - prodej', cnl(currency.valSell));
	map.set('Směnný kurz pro hotovostní operace - střed', cnl(currency.valMid));
	map.set('Směnný kurz pro bezhotovostní operace - nákup', cnl(currency.currBuy));
	map.set('Směnný kurz pro bezhotovostní operace - prodej', cnl(currency.currSell));
	map.set('Směnný kurz pro bezhotovostní operace - střed', cnl(currency.currMid));
	map.set('Střední směnný kurz České národní banky', cnl(currency.cnbMid));
	map.set('Změna hodnoty směnného kurzu oproti poslednímu stavu', cnl(currency.move));
	return map;
}

export default currencyMap;