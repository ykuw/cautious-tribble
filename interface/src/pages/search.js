import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Form from "react-bootstrap/Form";
import Bottom from "../sections/bottom";
import Axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import processString from "react-process-string";
import Clickable from "../sections/clickable";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

class Search extends Component {
    state = {
        userInput: "", // The value you're entering when searching something.
        posts: [], // The posts you're searching for.
        error: null, // In case there's any error returned.
        alert: false, // Alert if you don't type anything to search for.
    };

    // As you type, the userInput value will change, remembering what you're typing.
    inputChangedHandler = (event) => {
        this.setState({userInput: event.target.value});
    };

    // Getting the posts you're looking for.
    getPosts() {
        Axios.get("/api/posts/search?log=" + this.state.userInput, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            }
        }).then((response) => {
            this.setState({
                posts: response.data
            });
        }).catch((error) => this.setState({error}));
    }

    render() {
        const {posts} = this.state; // The posts you're searching for.

        return (<>
                <div className="container">
                    <Helmet>
                        <title>Search</title>
                    </Helmet>
                    <Container>
                        <form id="feed-form" onSubmit={this.handleSubmit}>
                            <Form.Control
                                type="text"
                                onChange={this.inputChangedHandler} // Remember what you type as you type it.
                                value={this.state.userInput} // The value that it's going to be sent over to search.
                                className="textarea"
                                placeholder="What are you looking for?"
                            />
                            <br/>
                            <div align="right">
                                <Button type="submit" size="lg">Search</Button>
                            </div>
                            <br/>
                        </form>

                        {posts.map((fields) => {
                            const {_id, log, date} = fields; // Getting the fields in a const as it is neater and more informative.
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

                        {this.state.alert && (
                            <Alert variant="danger" onClose={() => this.setState({alert: false})} dismissible>
                                <Alert.Heading>Oi, mate! You got a warning!</Alert.Heading>
                                <p>Type something.</p>
                            </Alert>)}

                    </Container>
                </div>

                {/* Page footer. */}
                <Bottom/>
            </>)
    }

    handleSubmit = (event) => {
        event.preventDefault(); // So the page won't refresh.

        if (this.state.userInput) {
            event.preventDefault(); // So that the word you're searching for won't disappear after submitting it.
            this.getPosts(); // To get the posts you're looking for.
        } else {
            this.setState({alert: true}) // Alert if you're not entering anything to search for.
        }
    }
}

// Converting the MongoDB timestamp to a readable date and time.
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

export default Search;
