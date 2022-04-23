import Axios from "axios";
import React from "react";
import {Helmet} from "react-helmet";

export default class Home extends React.Component {
	state = {
		quotes: [],
		isLoading: true,
		errors: null,
	};

	getQuotes() {
		Axios.get("/api/quotes", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
		})
			.then((response) => {
				this.setState({
					quotes: response.data,
					isLoading: false,
				});
			})
			.catch((error) => this.setState({error, isLoading: false}));
	}

	componentDidMount() {
		this.getQuotes();
	}

	render() {
		const day = 21, month = "Apr", year = 1996;

		let age = calculateAge(`${month} ${day} ${year}`);

		const {isLoading, quotes} = this.state;

		return (
			<>
				<div className="container">
					<Helmet>
						<title>Home</title>
					</Helmet>

					<h1>Quote of the day</h1>
					<br/>

					<div className="tab-space">
						{!isLoading ? (
							quotes.map((fields) => {
								const {_id, quote, author, source} = fields; // Getting the fields in a const as it is neater and more informative.
								return (
									<div key={_id}>
										<blockquote>
											<p>"{quote}"</p>
											<footer>
												{author} in <cite title="Source">{source}</cite>
											</footer>
										</blockquote>
									</div>
								);
							})
						) : (
							<p>Loading...</p>
						)}
					</div>

					<br/>
					<h1>Age</h1>
					<br/>

					<div className="tab-space">
						<p>{age} old.</p>
					</div>

					<br/>

					<div align="left" className="fixed-bottom">
						<p/>
						<p className="tab-space">&nbsp;&nbsp;'sup</p>
						<p/>
					</div>
				</div>
			</>
		);
	}
}

// Function to calculate the age of a person.
function calculateAge(birthday) {
	const ageDifMs = Date.now() - new Date(birthday).getTime();
	const ageDate = new Date(ageDifMs); // Milliseconds from epoch.
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}
