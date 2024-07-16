/* eslint-disable react/prop-types */
import Table from '../Table/Table';

function ExchangeRates({ currencies, isLoading }) {
	return (
		<div className="exchangeRatesContainer">
			<h2>Currency Exchange</h2>
			<Table data={currencies} isLoading={isLoading} />
		</div>
	);
}
export default ExchangeRates;
