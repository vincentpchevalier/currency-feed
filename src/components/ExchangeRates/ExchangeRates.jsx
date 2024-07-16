import './ExchangeRates.css';

/* eslint-disable react/prop-types */
import Table from '../Table/Table';

function ExchangeRates({ currencyInfo }) {
	return (
		<div className="exchangeRatesContainer">
			<h2>Currency Exchange</h2>
			<Table currencyInfo={currencyInfo} />
		</div>
	);
}
export default ExchangeRates;
