const convertNumberToLocale = (number: number) => {
	return new Intl.NumberFormat('cs-CZ', {maximumFractionDigits: 2}).format(number)
}

export default convertNumberToLocale;