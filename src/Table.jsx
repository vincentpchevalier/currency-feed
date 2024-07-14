import Cell from './Cell';
import Row from './Row';

function Table() {
	return (
		<ul className="table">
			<Row>
				<Cell classModifier="header">Currency</Cell>
				<Cell classModifier="header">Value</Cell>
			</Row>
			<Row>
				<Cell classModifier="">CAD</Cell>
				<Cell classModifier="">$0.00</Cell>
			</Row>
		</ul>
	);
}
export default Table;
