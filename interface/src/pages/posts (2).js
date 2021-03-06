import React from "react";
import {Container} from "react-bootstrap";
import {Helmet} from "react-helmet";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {Pagination} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Bottom from "../sections/bottom";
import Clickable from "../sections/clickable";

const processString = require("react-process-string"); // Used for processing the string.

// Building the pagination.
const BasicPagination = (props) => {
    const pages = [];

    let start = props.currentPage - (props.currentPage % 10);
    for (let number = start; number <= start + 11 && number <= props.pages; number++) {
        pages.push(<Pagination.Item key={number} onClick={() => props.nextPage(number)}>
            {number + 1}
        </Pagination.Item>);
    }

    return (<Pagination size="sm" className="customPagination">
        {props.currentPage > 10 && (
            <Pagination.Prev onClick={() => props.tenChange(props.currentPage, -1)}>Less pages</Pagination.Prev>)}
        {pages}
        {props.currentPage + 10 < props.pages && (
            <Pagination.Next onClick={() => props.tenChange(props.currentPage, 1)}>More pages</Pagination.Next>)}
    </Pagination>);
};

class Logs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], // API data. The posts.
            currentPage: 0, // Current page.
            totalLogs: 0, // Total posts.
            limit: 20, // Posts per page limit.
            alert: false // Alert to show if text is invalid.
        };
    }

    // Next pages to be shown within pagination menu.
    nextPage = (pageNumber) => {
        this.setState({
            currentPage: pageNumber, data: [],
        });
        this.getPosts(pageNumber);
    };

    // If more than 10 pages, show the 10 buttons in the pagination menu.
    tenChange = (pageNumber, isPosOrNeg) => {
        let finalPage;
        if (isPosOrNeg > 0) finalPage = pageNumber + 10; else finalPage = pageNumber - 10;
        this.setState({
            currentPage: finalPage, data: [],
        });
        this.getPosts(finalPage);
    };

    // If more than 100 pages, show the 100 buttons in the pagination menu.
    hundredChange = (pageNumber, isPosOrNeg) => {
        let finalPage;
        if (isPosOrNeg > 0) finalPage = pageNumber + 100; else finalPage = pageNumber - 100;
        this.setState({
            currentPage: finalPage, data: [],
        });
        this.getPosts(finalPage);
    };

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

    // Get total number of posts.
    componentDidMount() {
        this.dataRequest("/api/posts/?page=1", "GET").then((data) => {
            this.setState({
                totalLogs: data.total,
            }, () => this.getPosts(this.state.currentPage));
        });
    }

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

                    {/* Pagination. */}
                    {this.state.totalLogs > this.state.limit && (<BasicPagination
                        pages={this.state.totalLogs / this.state.limit}
                        nextPage={this.nextPage}
                        currentPage={this.state.currentPage}
                        tenChange={this.tenChange}
                        hundreadChange={this.hundredChange}
                    />)}

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
