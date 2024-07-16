import './App.css';
import ExchangeRates from '../components/ExchangeRates/ExchangeRates';
import UserInput from '../components/UserInput/UserInput';

// const COUNTRY_API_URL = 'https://restcountries.com/v3.1/';
// const CURRENCY_API_URL = 'https://api.frankfurter.app/';

function App() {
	return (
		<>
			<h1>Current Currencies</h1>
			<UserInput />
			<ExchangeRates />
		</>
	);
}

export default App;
