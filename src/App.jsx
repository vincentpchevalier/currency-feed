import { useEffect, useState } from 'react';
import './App.css';
import CurrencyExchanges from './CurrencyExchanges';
import CurrencyInput from './CurrencyInput';

const COUNTRY_API_URL = 'https://restcountries.com/v3.1/';
const CURRENCY_API_URL = 'https://api.frankfurter.app/';

function App() {
	const [currencyInfo, setCurrencyInfo] = useState([]);
	const [currencyCode, setCurrencyCode] = useState('');
	const [country, setCountry] = useState('');
	const [amount, setAmount] = useState('');
	const [exchangeRates, setExchangeRates] = useState(null);
	const [updatedCurrencyInfo, setUpdatedCurrencyInfo] = useState([]);

	useEffect(function () {
		async function fetchCurrencyInfo() {
			try {
				const res = await fetch(`${CURRENCY_API_URL}currencies`);

				if (!res.ok)
					throw new Error('Something went wrong fetching the currencies.');

				const data = await res.json();

				// console.log(data);

				const currData = Object.keys(data).map((key) => ({
					code: key,
					currency: data[key],
					exchange: 0,
				}));
				console.log(currData);
				setCurrencyInfo(currData);
				setUpdatedCurrencyInfo(currData);
			} catch (err) {
				console.warn(err);
			} finally {
				//
			}
		}
		fetchCurrencyInfo();
	}, []);

	useEffect(
		function () {
			async function fetchCountry() {
				if (country.length < 3) return; // to make sure not too many calls get made to the API
				try {
					const res = await fetch(`${COUNTRY_API_URL}name/${country}`);

					if (!res.ok)
						throw new Error('Something went wrong with fetching the country.');

					const data = await res.json();

					// console.log(Object.keys(data[0].currencies)[0]);

					const currencyCode = Object.keys(data[0].currencies)[0];

					setCurrencyCode(currencyCode);
				} catch (err) {
					console.warn(err);
				} finally {
					// setIsLoading()
				}
			}
			fetchCountry();
		},
		[country]
	);

	useEffect(
		function () {
			async function fetchExchangeRates() {
				if (!currencyCode || !amount) return;
				console.log('Fetching exchange rates');

				const res = await fetch(
					`${CURRENCY_API_URL}latest?amount=${amount}&from=${currencyCode}`
				);
				const data = await res.json();
				console.log(data.rates);
				// const rates = Object.keys(data.rates).map((key) => ({
				// 	code: key,
				// 	exchange: data.rates[key],
				// }));
				// console.log(rates);

				setExchangeRates(data.rates);
			}
			fetchExchangeRates();
		},
		[currencyCode, amount]
	);

	useEffect(
		function () {
			if (!exchangeRates) return;
			console.log(exchangeRates);

			const updatedCurrencies = currencyInfo.map((curr) => {
				const exchange = exchangeRates[curr.code] || amount;
				return {
					...curr,
					exchange,
				};
			});
			console.log(updatedCurrencies);
			setUpdatedCurrencyInfo(updatedCurrencies);
		},
		[exchangeRates, currencyInfo, amount]
	);

	return (
		<>
			<h1>Current Currencies</h1>
			<CurrencyInput
				country={country}
				code={currencyCode}
				amount={amount}
				setCountry={setCountry}
				setAmount={setAmount}
			/>
			<CurrencyExchanges currencies={updatedCurrencyInfo} />
		</>
	);
}

export default App;
