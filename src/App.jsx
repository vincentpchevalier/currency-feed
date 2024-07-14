import { useState } from 'react';
import './App.css';
import CurrencyExchanges from './CurrencyExchanges';
import CurrencyInput from './CurrencyInput';

function App() {
	const [country, setCountry] = useState('Germany');
	const [currencyCode, setCurrencyCode] = useState('EUR');
	return (
		<>
			<h1>Current Currencies</h1>
			<CurrencyInput country={country} code={currencyCode} />
			<CurrencyExchanges />
		</>
	);
}

export default App;
