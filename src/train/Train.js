import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TrainSubmissionForm from "./TrainSubmissionForm";
import TrainResults from "./TrainResults"
import FormData from 'form-data';
import io from 'socket.io-client';
const axios = require('axios');

class Train extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ""
        };
    }

    submit = (dataset, modeljson, weights) => {
        console.log("here")
        const form = new FormData();

        form.append('dataset', dataset === null ? null : dataset);
        form.append('modeljson', modeljson === null ? null : modeljson);
        form.append('weights', weights === null ? null : weights);

        // form.append('model', model);
        // form.append('layerarray', JSON.stringify(layerarray))
        form.append('timestamp', new Date().toGMTString());
        axios.post("http://localhost:8000/submit", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            let result = res.data;
            console.log(result)
            this.setState({result});
        });
    }


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col className="section" xs={4}><TrainSubmissionForm submit={this.submit}/></Col>
                        <Col className="section" xs={8}>
                            <TrainResults
                                result={this.state.result}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Train;