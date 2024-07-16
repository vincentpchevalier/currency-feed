/* eslint-disable react/prop-types */
import Cell from './Cell';
import Row from './Row';

import './Table.css';

function Table() {
	return (
		<ul className="table">
			<Row>
				<Cell classModifier="header">Currency</Cell>
				<Cell classModifier="header">Code</Cell>
				<Cell classModifier="header">Value</Cell>
			</Row>

			<Row key={0}>
				<Cell classModifier="">Canadian Dollar</Cell>
				<Cell classModifier="">CAD</Cell>
				<Cell classModifier="">0.00</Cell>
			</Row>
		</ul>
	);
}
export default Table;
