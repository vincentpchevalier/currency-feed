import Table from './Table';

function CurrencyExchanges({ currencies }) {
	return (
		<div className="balanceSheetContainer">
			<h2>Currency Exchange</h2>
			<Table data={currencies} />
		</div>
	);
}
export default CurrencyExchanges;
