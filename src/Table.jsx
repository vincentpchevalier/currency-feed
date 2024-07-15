/* eslint-disable react/prop-types */
import Cell from './Cell';
import Row from './Row';

function Table({ data }) {
	return (
		<ul className="table">
			<Row>
				<Cell classModifier="header">Currency</Cell>
				<Cell classModifier="header">Code</Cell>
				<Cell classModifier="header">Value</Cell>
			</Row>
			{data.map((item) => {
				return (
					<Row key={item.code}>
						<Cell classModifier="">{item.currency}</Cell>
						<Cell classModifier="">{item.code}</Cell>
						<Cell classModifier="">{item.exchange}</Cell>
					</Row>
				);
			})}
		</ul>
	);
}
export default Table;
