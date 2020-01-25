import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';

import ResultsTable from './ResultsTable'
import LearnSubmissionForm from './LearnSubmissionForm';


const socketProtocol = (window.location.protocol === 'https') ? 'wss' : 'ws';
// const socket = io(`https://${window.location.host}`, { reconnection: false });
import io from 'socket.io-client';

const socket = io(`http://localhost:8000/`)
const testSample = [2.668,-114.333,-1.908,4.786,25.707,-45.21,78,0]; // Curveball

// predictButton.onclick = () => {
//     predictButton.disabled = true;
//     socket.emit('predictSample', testSample);
// };

class Learn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prediction: ""
        };
    }

    initialize() {
        // functions to handle socket events
        socket.on('connect', () => {
            console.log("connected!!!")
            // document.getElementById('waiting-msg').style.display = 'none';
            // document.getElementById('trainingStatus').innerHTML = 'Training in Progress';
        });

        socket.on('trainingComplete', () => {
            console.log("training complete")
            // document.getElementById('trainingStatus').innerHTML = 'Training Complete';
            // document.getElementById('predictSample').innerHTML = '[' + testSample.join(', ') + ']';
            // predictContainer.style.display = 'block';
        });

        socket.on('predictResult', (result) => {
            console.log("hello world")
            var prediction = result;
            console.log(prediction)
            this.setState({prediction})
            // plotPredictResult(result);
        });

        socket.on('disconnect', () => {
            console.log("disconnected")
        });
    }

    predict() {
        socket.emit('predictSample', testSample);
    }

    componentDidMount() {
        this.initialize();
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col className="section" xs={4}><LearnSubmissionForm predict={this.predict}/></Col>
                        <Col className="section" xs={8}>
                            <ResultsTable prediction={this.state.prediction}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Learn;

