import React, { useEffect, useRef, useState } from 'react';
import useFullInfoStore from '~store/useFullInfoStore';
import useCurrenciesAreOpenedStore from '~store/useCurrenciesAreOpenedStore'
import { useNavigate, Link } from 'react-router-dom';
import { UseFullInfoStoreSingleRecord } from '~type/use-full-info-store';
import { FREQUENTLY_USED } from '~constant/common';
import ReactCountryFlag from 'react-country-flag';
import { TfiArrowRight } from 'react-icons/tfi';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Homepage = () => {
	
	const favouritesHeadRef = useRef<HTMLTableSectionElement | null>(null);
	const favouritesBodyRef = useRef<HTMLTableSectionElement | null>(null);
	const tableRef = useRef<HTMLTableElement | null>(null);
	const buttonTextRef = useRef<HTMLButtonElement | null>(null);
	
	const {opened, updateOpened} = useCurrenciesAreOpenedStore();
	const [othersAreOpened, setOthersAreOpened] = useState(opened);
	const [initialLength, setInitialLength] = useState(0);
	
	const navigate = useNavigate();
	
	const store = useFullInfoStore();
	const data = store.converted;
	const error = store.error;

	useEffect(() => {
		if (error) {
			navigate('error-page');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);
	
	const [dataset, setDataset]
		= useState<Map<string, UseFullInfoStoreSingleRecord> | null>(null);
	
	useGSAP(() => {
		if (data) {
			setDataset(data);
		}
		setTimeout(() => {
			if (data && tableRef.current) {
				const initHeight =
					(favouritesHeadRef.current?.getBoundingClientRect().height as number)
					+ (favouritesBodyRef.current?.getBoundingClientRect().height as number);
				
				if (!opened) {
					gsap.set(tableRef.current, { height: initHeight });
				}
				setInitialLength(initHeight);
			}
		}, 1);
	}, [data]);
	
	const { contextSafe } = useGSAP();
	
	const endOpeningOrClosing = () => {
		gsap.fromTo(
			buttonTextRef.current,
			{ autoAlpha: 0 },
			{ autoAlpha: 1, duration: 1 },
		);
		setOthersAreOpened(!othersAreOpened);
		updateOpened(!opened);
	};
	
	const onClickLessOrMore = contextSafe(() => {
		
		const targetHeight = opened ? initialLength : 'auto';
		
		gsap.to(tableRef.current, {
			height: targetHeight,
			duration: 0.8,
			onComplete: endOpeningOrClosing,
		});
	});
	
	if (dataset) {
		console.log('Homepage loaded')
		const dataSorted = new Map([...dataset.entries()]
			.sort(function(a, b) {
				return (a[0]).localeCompare(b[0]);
			}));
		
		const favourites = new Map<string, UseFullInfoStoreSingleRecord>();
		
		FREQUENTLY_USED.forEach((curr) => {
			if (dataSorted.has(curr)) {
				favourites.set(curr, dataSorted.get(curr) as UseFullInfoStoreSingleRecord);
				dataSorted.delete(curr);
			}
		});
		
		const favouritesKeys = Array.from(favourites.keys());
		const dataSortedKeys = Array.from(dataSorted.keys());
		
		return (
			<div className="py-8 px-6">
				<h1 className="text-3xl pb-6">Přehled měn</h1>
				<div ref={tableRef} className="overflow-hidden overflow-x-auto">
					<table className="table-fixed min-w-full whitespace-nowrap overflow-hidden rounded-t-lg">
						<thead className="sticky top-0 bg-gray-600 text-gray-100" ref={favouritesHeadRef}>
							<tr>
								<td className="table-cell more-padding"></td>
								<td className="table-cell font-medium more-padding">Kód měny</td>
								<td className="table-cell font-medium more-padding">Název měny</td>
								<td className="table-cell font-medium more-padding">Země</td>
								<td className="table-cell"></td>
							</tr>
						</thead>
						<tbody ref={favouritesBodyRef}>
							<tr>
								<td
									colSpan={5}
									className="table-cell more-padding bg-white font-medium"
								>
								Často hledané
								</td>
							</tr>
							{favouritesKeys.map((key) => {
								return (
									<tr key={key} className="odd:bg-white even:bg-gray-200">
										<td className="table-cell">
											<ReactCountryFlag
												countryCode={favourites.get(key)?.countryFlag.toUpperCase() as string}
												svg
												className="!w-10 !h-10"
											/>
										</td>
										<td className="table-cell">
											{favourites.get(key)?.shortName}
										</td>
										<td className="table-cell">
											{favourites.get(key)?.czechCurrencyName}
										</td>
										<td className="table-cell">
											{favourites.get(key)?.czechCountryName}
										</td>
										<td className="table-cell">
											<Link
												className="hover:text-sky-500 hover:underline"
												to={`currency/${key}`}
											>
											Detail měny
												<TfiArrowRight className="inline-block w-3.5 h-3.5 ml-2" />
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
						<tbody>
							<tr>
								<td
									colSpan={5}
									className="table-cell more-padding font-medium bg-white"
								>
								Ostatní
								</td>
							</tr>
							{dataSortedKeys.map((key) => {
								return (
									<tr key={key} className="odd:bg-white even:bg-gray-200">
										<td className="table-cell">
											<ReactCountryFlag
												countryCode={dataSorted.get(key)?.countryFlag.toUpperCase() as string}
												svg
												className="!w-10 !h-10"
											/>
										</td>
										<td className="table-cell">
											{dataSorted.get(key)?.shortName}
										</td>
										<td className="table-cell">
											{dataSorted.get(key)?.czechCurrencyName}
										</td>
										<td className="table-cell">
											{dataSorted.get(key)?.czechCountryName}
										</td>
										<td className="table-cell">
											<Link
												className="hover:text-sky-500 hover:underline"
												to={`currency/${key}`}
											>
												Detail měny
												<TfiArrowRight className="inline-block w-3.5 h-3.5 ml-2" />
											</Link>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<button
					className="
							block
							w-full
							px-6
							py-2
							bg-gray-600
							text-gray-100
							mt-8
							rounded-b-lg
							transition
							duration-300
							hover:bg-gray-700
						"
					onClick={onClickLessOrMore}
				>
					<span ref={buttonTextRef} className="inline-block">
						{othersAreOpened ? 'Skrýt ostatní' : 'Načíst ostatní'}
					</span>
				</button>
			</div>
		);
	} else {
		return null;
	}
};

export default Homepage;