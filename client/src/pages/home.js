import Axios from "axios";
import React from "react";
import {Helmet} from "react-helmet";

export default class Home extends React.Component {
    state = {
        quotes: [],
        links: [],
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

    getLinks() {
        Axios.get("/api/bookmarks", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((response) => {
                this.setState({
                    links: response.data,
                    isLoading: false,
                });
            })
            .catch((error) => this.setState({error, isLoading: false}));
    }

    componentDidMount() {
        this.getLinks();
        this.getQuotes();
    }

    render() {
        const day = 21, month = "Apr", year = 1996;

        let age = calculateAge(`${month} ${day} ${year}`);
        let left = timeLeft(`${month} ${day} ${year}`);

        const {isLoading, quotes, links} = this.state;

        return (
            <>
                <div className="container">
                    <Helmet>
                        <title>Home</title>
                    </Helmet>

                    <h1>Quotes</h1>
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
                    <h1>Stats</h1>
                    <br/>

                    <div className="tab-space">
                        <ul>
                            <li>{age} old.</li>
                            <li>{left} more to 100 years old.</li>
                        </ul>
                    </div>

                    <br/>

                    <h1>Bookmarks</h1>
                    <br/>

                    <div className="tab-space">
                        <ul>
                            {!isLoading ? (
                                links.map((fields) => {
                                    const {_id, name, link} = fields; // Getting the fields in a const as it is neater and more informative.
                                    return (
                                        <div key={_id}>
                                            <li>
                                                <a href={link} target="_blank" rel="noopener noreferrer" className="link">{name}</a>
                                            </li>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Loading...</p>
                            )}
                        </ul>
                    </div>
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

function calculateAge(birthday) {
    // Calculate age.

    let today = new Date(),
        dob = new Date(birthday), // Birthday already has a value.
        diff = today.getTime() - dob.getTime(), // Difference in milliseconds.
        years = Math.floor(diff / 31556736000), // Convert milliseconds into years. // Milliseconds in a year 1000*24*60*60*365.24 = 31556736000.
        days_diff = Math.floor((diff % 31556736000) / 86400000), // 1 day has 86400000 milliseconds.
        months = Math.floor(days_diff / 30.4167), // 1 month has 30.4167 days.
        days = Math.floor(days_diff % 30.4167);

    return `${years} years, ${months} months, ${days} days`;
}

function timeLeft() {
    // Calculate time left for age.

    let today = new Date("21 Apr 2096"),
        dob = new Date(), // Birthday already has a value.
        diff = today.getTime() - dob.getTime(), // Difference in milliseconds.
        years = Math.floor(diff / 31556736000), // Convert milliseconds into years. // Milliseconds in a year 1000*24*60*60*365.24 = 31556736000.
        days_diff = Math.floor((diff % 31556736000) / 86400000), // 1 day has 86400000 milliseconds.
        months = Math.floor(days_diff / 30.4167), // 1 month has 30.4167 days.
        days = Math.floor(days_diff % 30.4167);

    return `${years} years, ${months} months, ${days} days`;
}
