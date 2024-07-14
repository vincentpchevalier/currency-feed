import './App.css';
import CurrencyExchanges from './CurrencyExchanges';
import CurrencyForm from './CurrencyForm';

function App() {
	return (
		<>
			<h1>Current Currencies</h1>
			<CurrencyForm />
			<CurrencyExchanges />
		</>
	);
}

export default App;
