/* eslint-disable react/prop-types */
import Cell from './Cell';
import Row from './Row';
import Spinner from '../Utilities/Spinner';
import './Table.css';

function Table({ data, isLoading }) {
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
						<Cell classModifier="">
							{isLoading ? <Spinner /> : item.exchange}
						</Cell>
					</Row>
				);
			})}
		</ul>
	);
}
export default Table;
