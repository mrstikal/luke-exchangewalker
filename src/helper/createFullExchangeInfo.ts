import getCountryCode from '~helper/convertCountryToCode';
import {UseFullInfoStoreSingleRecord, InfoInput} from '~type/use-full-info-store';
import {CurrencySingleRecord} from '~type/currency';
import {findKey} from 'lodash-es';


function createFullExchangeInfo(infoInput: InfoInput) {
	const fullInfo = new Map<string, UseFullInfoStoreSingleRecord>();
	infoInput.exchangeRates.forEach((rate) => {
		const key = rate.shortName;
		const found = Number(findKey(infoInput.currencies, (curr: CurrencySingleRecord) => curr.shortName === key));
		const czechCountryName = infoInput.currencies[found].country;
		const czechCurrencyName = infoInput.currencies[found].longName;
		const countryFlag = (getCountryCode(czechCountryName) as string).toLowerCase();

		const fullRecord = {countryFlag, czechCurrencyName, czechCountryName, ...rate};
		fullInfo.set(key.toLowerCase(), fullRecord);
	});

	
	return fullInfo;
}

export default createFullExchangeInfo;