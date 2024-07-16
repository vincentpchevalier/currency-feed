/* eslint-disable react/prop-types */
import Table from './Table';

function CurrencyExchanges({ currencies, isLoading }) {
	return (
		<div className="balanceSheetContainer">
			<h2>Currency Exchange</h2>
			<Table data={currencies} isLoading={isLoading} />
		</div>
	);
}
export default CurrencyExchanges;
