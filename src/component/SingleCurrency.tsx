import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useFullInfoStore from '~store/useFullInfoStore';
import { UseFullInfoStoreSingleRecord } from '~type//use-full-info-store';
import ReactCountryFlag from 'react-country-flag';
import { TfiArrowLeft } from 'react-icons/tfi';
import toTitleCase from '~helper/toTitleCase';
import currencyMap from '~helper/currencyMap';

const SingleCurrency = () => {
	
	const { currencyCode } = useParams();
	
	const [currency, setCurrency]
		= useState<UseFullInfoStoreSingleRecord | null>(null)
	
	const store = useFullInfoStore();
	const data = store.converted;
	const error = store.error;
	
	const currentCurrency = data?.get(currencyCode as string);
	
	const navigate = useNavigate();
	
	useEffect(() => {
		window.scroll(0,0);
	}, []);
	
	useEffect(() => {
		if (currentCurrency && data) {
			setCurrency(currentCurrency);
		}
		if (error || (!currentCurrency && data)) {
			navigate('error-page');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentCurrency, error, data]);
	
	if (currency) {
		const cm = currencyMap(currency);
		const cmKeys = [...cm.keys()];
		console.log('Currency loaded')
		
		return (
			<div className="py-8 px-6">
				<div
					className="
					flex
					justify-between
					bg-gray-600
					rounded-lg
					px-5
					pt-2
					pb-3
					mb-8
					"
				>
					<h1
						className="text-2xl text-gray-300"
					>
						{toTitleCase(currency.czechCurrencyName)}
					</h1>
					<Link
						className="text-gray-200 hover:text-sky-300 hover:underline self-center"
						to={'/'}
					>
						<TfiArrowLeft className="inline-block w-3.5 h-3.5 mr-2" />
						Zpět na přehled měn
					</Link>
				</div>
				<div className="flex items-center gap-2 mb-3 text-lg">
					<ReactCountryFlag
						countryCode={currency.countryFlag.toUpperCase()}
						svg
						className="!w-8 !h-8 mr-1"
					/>
					<div>{currency.shortName}</div>
					<div>({currency.czechCountryName})</div>
				</div>
				<table className="border-separate w-full border-spacing-y-2">
					<tbody>
						{cmKeys.map((key) => (
							cm.get(key) !== '0' &&
							<tr key={key} className="odd:bg-white even:bg-gray-200">
								<td className="text-sm table-cell more-padding rounded-l-lg">{key}</td>
								<td className="!text-right table-cell more-padding rounded-r-lg">{cm.get(key)}</td>
							</tr>
						))}
					</tbody>
				</table>
				<div
					className="
					flex
					justify-end
					mt-6
					bg-gray-600
					px-5
					pt-2
					pb-3
					rounded-lg
					text-gray-200
					"
				>
					<Link
						className="hover:text-sky-300 hover:underline self-center"
						to={'/'}
					>
						<TfiArrowLeft className="inline-block w-3.5 h-3.5 mr-2" />
					Zpět na přehled měn
					</Link>
				</div>
			</div>
		)
	}
	
}

export default SingleCurrency;