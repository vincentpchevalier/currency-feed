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
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(function () {
		const controller = new AbortController();
		async function fetchCurrencyInfo() {
			try {
				setError('');
				const res = await fetch(`${CURRENCY_API_URL}currencies`, {
					signal: controller.signal,
				});

				if (!res.ok)
					throw new Error('Something went wrong fetching the currency info.');

				const data = await res.json();

				const currData = Object.keys(data).map((key) => ({
					code: key,
					currency: data[key],
					exchange: 0,
				}));
				console.log(currData);
				setCurrencyInfo(currData);
				setUpdatedCurrencyInfo(currData);
			} catch (err) {
				if (err.name !== 'AbortError') setError(err.message);
			}
		}
		fetchCurrencyInfo();

		return () => controller.abort();
	}, []);

	useEffect(
		function () {
			const controller = new AbortController();

			async function fetchCountry() {
				if (country.length < 3) return; // to make sure not too many calls get made to the API
				try {
					setError('');
					const res = await fetch(`${COUNTRY_API_URL}name/${country}`, {
						signal: controller.signal,
					});

					console.log(res);
					console.log(res.status);

					if (res.status === 404)
						throw new Error(
							`Could not find "${country}." Please check the spelling and try again.`
						);

					if (!res.ok)
						throw new Error('Something went wrong with fetching the country.');

					const data = await res.json();

					// console.log(Object.keys(data[0].currencies)[0]);

					const currencyCode = Object.keys(data[0].currencies)[0];

					setCurrencyCode(currencyCode);
				} catch (err) {
					if (err.name !== 'AbortError') setError(err.message);
				}
			}
			fetchCountry();

			return () => controller.abort();
		},
		[country]
	);

	useEffect(
		function () {
			let timerId;
			const controller = new AbortController();
			async function fetchExchangeRates() {
				if (!currencyCode || !amount) return;
				console.log('Fetching exchange rates');
				try {
					setIsLoading(true);

					const res = await fetch(
						`${CURRENCY_API_URL}latest?amount=${amount}&from=${currencyCode}`,
						{ signal: controller.signal }
					);
					console.log(res.status);

					if (res.status === 404)
						throw new Error(
							`Cannot find the exchange rate for ${currencyCode}`
						);

					if (!res.ok) throw new Error('Something went wrong.');

					const data = await res.json();
					console.log(data.rates);

					timerId = setTimeout(() => {
						setExchangeRates(data.rates);
						setIsLoading(false);
					}, 1000);
				} catch (err) {
					if (err.name !== 'AbortError') setError(err.message);
					setIsLoading(false);
				}
			}
			fetchExchangeRates();
			return function () {
				clearTimeout(timerId);
				controller.abort();
			};
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
				error={error}
			/>
			<CurrencyExchanges
				currencies={updatedCurrencyInfo}
				isLoading={isLoading}
			/>
		</>
	);
}

export default App;
