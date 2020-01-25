import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';

import ResultsTable from './ResultsTable'
import LearnSubmissionForm from './LearnSubmissionForm';

class Learn extends React.Component {
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
                        <Col className="section" xs={4}><LearnSubmissionForm/></Col>
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

export default Learn;

