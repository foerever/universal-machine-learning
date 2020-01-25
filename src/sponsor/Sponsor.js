// require('@tensorflow/tfjs-node');
import React from 'react';
import * as tf from '@tensorflow/tfjs';
import { Form, Button, Card, Toast } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


require('@tensorflow/tfjs');

// const pitch_type = require('./pitch_type');

async function run() {

    // io.on('connection', (socket) => {
    //     socket.on('predictSample', async (sample) => {
    //         io.emit('predictResult', await pitch_type.predictSample(sample));
    //     });
    // });

    let numTrainingIterations = 10;
    for (var i = 0; i < numTrainingIterations; i++) {
        console.log(`Training iteration : ${i+1} / ${numTrainingIterations}`);
        await pitch_type.model.fitDataset(pitch_type.trainingData, {epochs: 1});
        console.log('accuracyPerClass', await pitch_type.evaluate(true));
        await sleep(TIMEOUT_BETWEEN_EPOCHS_MS);
    }

    // io.emit('trainingComplete', true);
}

// run();

class Sponsor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={{paddingTop:'1em'}}>
                    <Container>
                        <Row>
                            <Col className="section" xs={8}>
                                <div style={{paddingTop:'6em'}}>
                                    <p>If you want to sponsor a UML user and allow them limited usage of your computational resources for machine learning click the "sponsor" button to the right.</p>
                                </div>
                            </Col>
                            <Col className="section" xs={4} style={{textAlign: 'left'}}>
                                <Button variant="primary" style={{"marginTop": "25%", "marginLeft": "50%"}} onClick={click => this.onSubmit()}>
                                    Sponsor
                                </Button>                        
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default Sponsor;