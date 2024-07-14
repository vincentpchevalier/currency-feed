import './App.css';
import CurrencyExchanges from './CurrencyExchanges';
import CurrencyInput from './CurrencyInput';

function App() {
	return (
		<>
			<h1>Current Currencies</h1>
			<CurrencyInput />
			<CurrencyExchanges />
		</>
	);
}

export default App;
