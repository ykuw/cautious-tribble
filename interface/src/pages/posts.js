import React from "react";
import {Container} from "react-bootstrap";
import {Helmet} from "react-helmet";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Bottom from "../sections/bottom";
import Clickable from "../sections/clickable";

const processString = require("react-process-string"); // Used for processing the string.

class Logs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], // API data. The posts.
            currentPage: 0, // Current page.
            totalLogs: 0, // Total posts.
            limit: 5, // Posts per page limit.
            alert: false // Alert to show if text is invalid.
        };
    }

    // Function for the API requests, headers and what needs to be included.
    dataRequest = (URL, methodType, params) => {
        return fetch(URL, {
            method: methodType, headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            }, body: JSON.stringify(params),
        }).then((data) => {
            return data.json();
        }).catch((err) => {
            return err;
        });
    };

    // Paginating the results. Getting posts.
    getPosts = (currentPage) => {
        this.dataRequest("/api/posts/?page=" + currentPage + "&limit=" + this.state.limit, "GET").then((data) => {
            this.setState({
                data: data.posts,
            });
        }).catch((err) => {
            console.log("Error fetching posts, mate. ", err);
        });
    };

    // Get posts on page load.
    componentDidMount() {
        this.getPosts();
    }

    // Render the posts.
    render() {
        return (<>
            <div className="container">
                <Helmet>
                    <title>Texts</title>
                </Helmet>
                <Container>
                    <form id="feed-form" onSubmit={this.handleSubmit.bind(this)} method="POST" elevation={0}>
                        <Form.Control
                            as="textarea"
                            rows="6"
                            name="logs"
                            elevation={0}
                            value={this.state.log}
                            onChange={this.onMessageChange.bind(this)}
                            className="textarea"
                            placeholder="What's on your mind?"
                        />
                        <br/>

                        <div align="right">
                            <Button type="submit" size="lg">Publish</Button>
                        </div>
                        <br/>
                    </form>

                    {/* Displaying alert if no text is entered. 'onClose' sets the 'alert' to 'false' so the button would close. */}
                    {this.state.alert && (
                        <Alert variant="danger" onClose={() => this.setState({alert: false})} dismissible>
                            <Alert.Heading>Oi, mate! You got a warning!</Alert.Heading>
                            <p>Type something.</p>
                        </Alert>)}

                    {this.state.data.map((fields) => {
                        const {_id, log, date} = fields;
                        return (<React.Fragment key={_id}>
                            <ListGroup>
                                <ListGroup.Item className="feed">
                                    {/* Clickable() contains the config for the processString() function */}
                                    {processString(Clickable())(log)}
                                    <br/>
                                    <small className="text-dark align-bottom">{formatDate(date)}</small>
                                </ListGroup.Item>
                            </ListGroup>
                            <br/>
                        </React.Fragment>);
                    })}

                </Container>
            </div>

            {/* Page footer. */}
            <Bottom/>
        </>);
    }

    // As you type, set the text to the 'log' element.
    onMessageChange(event) {
        this.setState({log: event.target.value});
    }

    // Post the text to the database.
    handleSubmit(e) {
        e.preventDefault();

        if (this.state.log) {
            // If there is text, send it over.
            this.dataRequest("/api/posts/", "POST", this.state) // Sending the log via POST.
                .then((response) => {
                    if (!response.error) {
                        this.setState({log: "", alert: false}); // Setting alert
                        this.componentDidMount(); // Refresh component after sending the log so you'd have the latest record displaying on the page.
                    } else if (response.error) {
                        alert("Message failed to send."); // Pop-up for when it fails to send the message.
                    }
                });
        } else {
            // If there's no text being sent, set the 'alert' to 'true'.
            this.setState({alert: true});
        }
    }
}

// Function to format the date.
function formatDate(string) {
    // Format date into DD Mon YYYY, HH:MM:SS.
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        weekday: "long",
    };
    return new Date(string).toLocaleDateString("en-GB", options);
}

export default Logs;
