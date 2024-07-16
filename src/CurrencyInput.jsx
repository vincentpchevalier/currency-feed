import ErrorMessage from './ErrorMessage';

/* eslint-disable react/prop-types */
function CurrencyInput({
	amount,
	country,
	code,
	setCountry,
	setAmount,
	error,
}) {
	return (
		<section>
			<h2>Location and Base Amount</h2>
			<div className="info">
				<form className="form">
					<fieldset>
						<label htmlFor="country">Country</label>
						<input
							type="text"
							name="country"
							placeholder="What country are you in?"
							value={country}
							onChange={(ev) => setCountry(ev.target.value)}
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="amount">Amount</label>
						<input
							type="text"
							name="amount"
							placeholder="0.00"
							value={amount}
							onChange={(ev) => setAmount(+ev.target.value)}
						/>
					</fieldset>
				</form>
				<div className="currency">
					{!error && (
						<>
							<h3>Currency Info</h3>
							<p>Country: {country}</p>
							<p>Currency: {code}</p>
						</>
					)}
					{error && <ErrorMessage message={error} />}
				</div>
			</div>
		</section>
	);
}

export default CurrencyInput;
