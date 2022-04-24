import Axios from "axios";
import React from "react";
import {Helmet} from "react-helmet";

export default class Home extends React.Component {
	state = {
		quotes: [], // Array of quote objects.
		isLoading: true, // Loading state.
		errors: null, // Error state.
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
					quotes: response.data, // Data is an array of quotes.
					isLoading: false, // Set loading to false.
				});
			})
			.catch((error) => this.setState({error, isLoading: false}));
	}

	componentDidMount() { // When the component mounts, get the quotes.
		this.getQuotes(); // Get quotes.
		this.interval = setInterval(() => this.setState({ time: Date.now() }), 1); // Set interval for time to refresh every millisecond.
	}

	componentWillUnmount() {
		clearInterval(this.interval); // Clear interval when component is unmounted. So that it doesn't keep running.
	}

	render() {

		const {isLoading, quotes} = this.state; // Destructure state.

		return ( // Render.
			<>
				<div className="container"> {/* Container for the page. */}
					<Helmet> {/* Helmet for the page. */}
						<title>Home</title> {/* Title for the page. */}
					</Helmet>

					<h1>Quote</h1>
					<br/> {/* Break. */}

					<div className="tab-space"> {/* Container for the tabs. */}
						{!isLoading ? ( // If not loading, render.
							quotes.map((fields) => { // Map through quotes.
								const {_id, quote, author, source} = fields; // Getting the fields in a const as it is neater and more informative.
								return ( // Render.
									<div key={_id}> {/* Container for the quote. */}
										<blockquote> {/* Quote. */}
											<p>"{quote}"</p>
											<footer> {/* Footer for the quote. */}
												{author} in <cite title="Source">{source}</cite>
											</footer>
										</blockquote>
									</div>
								); // End render.
							}) // End map.
						) : ( // Else, render.
							<p>Loading...</p> // Loading.
						)} {/* End render. */}
					</div> {/* End container for the tabs. */}

					<br/> {/* Break. */}
					<h1>Age</h1>
					<br/>

					<div className="tab-space">
						<p>{displayAge()}</p> {/* Display age. */}
					</div>

					<br/>

					<div align="left" className="fixed-bottom"> {/* Container for the footer. */}
						<p/>
						<p className="tab-space">&nbsp;&nbsp;'sup</p> {/* Footer for the page. */}
						<p/>
					</div>
				</div>
			</>
		);
	}
}

// Function to calculate the age of a person, down to year, month, day, hour, minute, second and millisecond.
function displayAge() {
	const currentDate = new Date(); // Get current date.
	const birthDate = new Date("1996-04-21T00:00:00"); // Get birthdate.
	const y = currentDate.getFullYear() - birthDate.getFullYear(); // Get the year.
	const m = currentDate.getMonth() - birthDate.getMonth(); // Get the month.
	const h = currentDate.getHours() - birthDate.getHours(); // Get the hour.
	const d = currentDate.getDate() - birthDate.getDate(); // Get the day.
	const min = currentDate.getMinutes() - birthDate.getMinutes(); // Get the minute.
	const s = currentDate.getSeconds() - birthDate.getSeconds(); // Get the seconds.
	const ms = currentDate.getMilliseconds() - birthDate.getMilliseconds(); // Get the milliseconds.
	return y + " years, " + m + " months, " + d + " days, " + h + " hours, " + min + " minutes, " + s + " seconds and "+ ms + " milliseconds old.";
}
