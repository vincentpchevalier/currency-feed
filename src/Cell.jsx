/* eslint-disable react/prop-types */
function Cell({ children, classModifier }) {
	return <span className={`cell ${classModifier}`}>{children}</span>;
}
export default Cell;
