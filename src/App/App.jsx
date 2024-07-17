import { useEffect, useState } from 'react';
import ExchangeRates from '../components/ExchangeRates/ExchangeRates';
import UserInput from '../components/UserInput/UserInput';
import './App.css';

const COUNTRY_API_URL = 'https://restcountries.com/v3.1/name/';
const CURRENCY_API_URL = 'https://api.frankfurter.app/';

function App() {
	const [currencyInfo, setCurrencyInfo] = useState([]);
	const [userInput, setUserInput] = useState(null);
	const [currencyCode, setCurrencyCode] = useState('');
	const [rates, setRates] = useState(null);
	const [errorMsg, setErrorMsg] = useState('');

	function handleUserInput(info) {
		// console.log('user info: ', info);
		setUserInput(info);
	}

	useEffect(function () {
		console.log('useEffect - no dependency');
		async function fetchCurrencyInfo() {
			try {
				const res = await fetch(`${CURRENCY_API_URL}currencies`);

				if (!res.ok)
					throw new Error('Something went wrong fetching the currency list.');

				const data = await res.json();

				// console.log(data);

				const currData = Object.keys(data).map((key) => ({
					code: key,
					currency: data[key],
					exchange: 0,
				}));
				// console.log(currData);

				setCurrencyInfo(currData);

				// {code: 'CAD', currency: 'Canadian Dollar', exchange: 0}
			} catch (err) {
				//
			}
		}
		fetchCurrencyInfo();
	}, []);

	useEffect(
		function () {
			console.log('useEffect - userInput dependency');
			async function fetchRatesData() {
				if (!userInput) return;

				const { country, amount } = userInput;

				if (!country || country.length < 3) return; // guard clause

				try {
					setErrorMsg('');
					console.log('fetch country info');
					const res = await fetch(`${COUNTRY_API_URL}${userInput.country}`);

					console.log(res);
					if (res.status === 404)
						throw new Error(
							`Couldn't find "${userInput.country}". Please check spelling and try again.`
						);
					if (!res.ok)
						throw new Error(
							'Something went wrong fetching the data from the Country API.'
						);

					const data = await res.json();
					console.log(data);
					const code = Object.keys(data[0].currencies)[0];
					console.log(code);
					setCurrencyCode(code);

					if (currencyCode) {
						const res = await fetch(
							`${CURRENCY_API_URL}latest?amount=${amount}&from=${currencyCode}`
						);
						if (!res.ok) throw new Error('Something went wrong.');

						const data = await res.json();
						console.log(data.rates);
						setRates(data.rates);
					}
				} catch (err) {
					// console.warn(err);
					setErrorMsg(err.message);
				}
			}
			fetchRatesData();
		},
		[userInput, currencyCode]
	);

	useEffect(
		function () {
			console.log('useEffect - userInput dependency');

			if (!userInput) return;
			const { amount } = userInput;
			if (!rates) return;

			setCurrencyInfo((prevInfo) =>
				prevInfo.map((curr) => {
					const exchange = rates[curr.code] || amount;
					return { ...curr, exchange };
				})
			);
		},
		[rates, userInput]
	);

	return (
		<>
			<h1>Current Currencies</h1>
			<UserInput
				onHandleUserInput={handleUserInput}
				currencyCode={currencyCode}
				errorMsg={errorMsg}
			/>
			<ExchangeRates currencyInfo={currencyInfo} />
		</>
	);
}

export default App;
