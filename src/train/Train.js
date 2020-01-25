import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TrainSubmissionForm from "../train/TrainSubmissionForm";

class Train extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col className="section" xs={4}><TrainSubmissionForm/></Col>
                        <Col className="section" xs={8}>
                            hello this is where the results go
                            {/* <ResultsTable
                                getData={this.getData}
                                data={this.state.data}
                                columns={this.state.columns}
                            /> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Train;