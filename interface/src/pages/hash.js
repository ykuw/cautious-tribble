import React, {Component} from "react";
import {Container} from "react-bootstrap";
import {Helmet} from "react-helmet";
import md5 from "crypto-js/md5";
import sha1 from "crypto-js/sha1";
import Form from "react-bootstrap/Form";
import Bottom from "../sections/bottom";

class Hash extends Component {
    state = {
        userInput: "", // User input.
    };

    // Setting the userInput with the value after the user has typed in the input field.
    inputChangedHandler = (event) => {
        this.setState({userInput: event.target.value});
    };

    render() {
        return (<>
            <div className="container">
                <Helmet>
                    <title>Hash</title>
                </Helmet>
                <Container>
                    <Form.Control
                        as="textarea"
                        rows="5"
                        onChange={this.inputChangedHandler} // Setting the userInput with the value after the user has typed in the input field.
                        value={this.state.userInput} // Setting the value of the input field.
                        className="textarea"
                        placeholder="Enter the plain text here."
                    />

                    {this.state.userInput.length > 0 && ( // If the user has typed in the input field, return the following.
                        <div className="hash">
                            <br/>
                            {md5(this.state.userInput).toString()} <b>MD5</b>
                            <br/>
                            {sha1(this.state.userInput).toString()} <b>SHA1</b>
                            <br/>
                            {btoa(this.state.userInput).toString()} <b>Base64</b>
                            <br/>
                            {decodeURIComponent(this.state.userInput).toString()} <b>Decode URL</b>
                        </div>)}
                </Container>
            </div>

            {/* Page footer. */}
            <Bottom/>
        </>)
    }
}

export default Hash;
