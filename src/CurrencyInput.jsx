function CurrencyInput({ country, code }) {
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
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="amount">Amount</label>
						<input type="text" name="amount" placeholder="0.00" />
					</fieldset>
					<button>Get Exchange</button>
				</form>
				<div className="currency">
					<h3>Currency Info</h3>
					<p>Country: {country}</p>
					<p>Currency: {code}</p>
				</div>
			</div>
		</section>
	);
}

export default CurrencyInput;
