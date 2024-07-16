import './ErrorMessage.css';

/* eslint-disable react/prop-types */
function ErrorMessage({ message }) {
	return <p className="error-msg">{message}</p>;
}
export default ErrorMessage;
