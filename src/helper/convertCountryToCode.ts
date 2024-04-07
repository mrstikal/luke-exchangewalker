import COUNTRY_CODES from '~constant/country-codes';
import {findKey} from 'lodash-es';

function getCountryCode(countryName: string) {
	return findKey(COUNTRY_CODES, (cn) => cn === countryName)
}

export default getCountryCode;