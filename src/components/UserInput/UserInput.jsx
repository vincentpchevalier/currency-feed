import { useState } from 'react';
import './UserInput.css';
import ErrorMessage from '../Utilities/ErrorMessage';

/* eslint-disable react/prop-types */
function UserInput({ onHandleUserInput, currencyCode, errorMsg }) {
	// const {country, amount} = props;
	// const country = props.country;
	// const amount = props.amount;
	const [country, setCountry] = useState('Australia');
	const [amount, setAmount] = useState('');

	function handleSubmit(ev) {
		ev.preventDefault();
		console.log('submitted');
		if (!amount || !country) return;
		// console.log(amount);
		// console.log(country);
		const inputValues = {
			country,
			amount,
		};
		onHandleUserInput(inputValues);
	}

	return (
		<section>
			<h2>Location and Base Amount</h2>
			<div className="info">
				<form className="form" onSubmit={handleSubmit}>
					<fieldset>
						<label htmlFor="country">Country</label>
						<input
							type="text"
							name="country"
							placeholder="What country are you in?"
							onChange={(ev) => setCountry(ev.target.value)}
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="amount">Amount</label>
						<input
							type="text"
							name="amount"
							placeholder="0.00"
							onChange={(ev) => setAmount(ev.target.value)}
						/>
					</fieldset>
					<button>Check Rates</button>
				</form>
				<div className="currency">
					{!errorMsg && (
						<>
							<h3>Currency Info</h3>
							<p>Country: {country}</p>
							<p>Currency: {currencyCode}</p>
						</>
					)}
					{errorMsg && <ErrorMessage message={errorMsg} />}
				</div>
			</div>
		</section>
	);
}

export default UserInput;
