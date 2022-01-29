import React, {Component} from "react";
import {Helmet} from "react-helmet";
import Axios from "axios";
import Bottom from "../sections/bottom";

class Yt extends Component {
    state = {
        links: [],
        isLoading: true,
        error: null,
        status: 1,
    };

    getYT() {
        Axios.get("/api/yt?status=" + this.state.status, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            }
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
        this.getYT();
    }

    render() {
        const {isLoading, links} = this.state;

        return (
            <>
                <div className="container">
                    <Helmet>
                        <title>YT</title>
                    </Helmet>
                    <h1>Channels</h1>
                    <br/>
                    <div className="tab-space">
                        <ol>
                            {!isLoading ? (
                                links.map((fields) => {
                                    const {_id, link, name} = fields; // Getting the fields in a const as it is neater and more informative.
                                    return (
                                        <div key={_id} className="tab-space">
                                            <li>
                                                <a
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="link"
                                                >
                                                    {name}
                                                </a>
                                            </li>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Loading...</p>
                            )}
                        </ol>
                    </div>
                </div>
                {/* Page footer. */}
                <Bottom/>
            </>
        )
    }
}

export default Yt;
