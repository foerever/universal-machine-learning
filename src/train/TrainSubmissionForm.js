import React from 'react';
import '../App.css';
import { Form, Button, Card, Toast } from 'react-bootstrap';
import toastLogo from '../assets/logo.png';
import 'react-day-picker/lib/style.css';
const axios = require('axios');
import io from 'socket.io-client';

// const predictContainer = document.getElementById('predictContainer');
// const predictButton = document.getElementById('predict-button');

const socketProtocol = (window.location.protocol === 'https') ? 'wss' : 'ws';
const socket = io(`https://${window.location.host}`, { reconnection: false });

const testSample = [2.668,-114.333,-1.908,4.786,25.707,-45.21,78,0]; // Curveball

// predictButton.onclick = () => {
//     predictButton.disabled = true;
//     socket.emit('predictSample', testSample);
// };

// functions to handle socket events
socket.on('connect', () => {
    console.log("connected!!!")
    // document.getElementById('waiting-msg').style.display = 'none';
    // document.getElementById('trainingStatus').innerHTML = 'Training in Progress';
});

// socket.on('trainingComplete', () => {
//     document.getElementById('trainingStatus').innerHTML = 'Training Complete';
//     document.getElementById('predictSample').innerHTML = '[' + testSample.join(', ') + ']';
//     // predictContainer.style.display = 'block';
// });

socket.on('predictResult', (result) => {
    console.log("hello world")
    console.log(result);
    // plotPredictResult(result);
});

socket.on('disconnect', () => {
    console.log("disconnected")
});

class TrainSubmissionForm extends React.Component {
    constructor(props) {
        super(props);
        this.form = {
            model: '',
            layers:[],
            activations: [],
        };
        this.state = {
            showToast: false,
            inputs: ['input-0']
        };
    }
    onSubmit() {
        // predictButton.disabled = true;
        socket.emit('predictSample', testSample);
        console.log(this.form.model);
        axios.post(`/training`, {
            model: this.form.model,
            layers: this.form.layers,
            activations: this.form.activations,
        }).then(res => {
            this.props.getData();
        });
        this.setShowToast(true);
    }

    handleChange = e => {
        console.log("Name: " + e.target.name);
        if (e.target.name === "layers" || e.target.name === "activations") {
            this.form[e.target.name] =  this.form[e.target.name].concat([e.target.value])
            console.log("LAYERS: " + this.form[e.target.name]);
        } else {
            this.form[e.target.name] = e.target.value;
            console.log("model: " + this.form[e.target.name]);
        }


    }

    appendLayer = e => {
        this.form[e.target.name]
    }

    appendInput = () => {
        var newInput = `input-${this.state.inputs.length}`;
        this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
    }

    setShowToast = showToast => {
        this.setState({ showToast })
    }

    handleDateChange = date => {
        this.setState({date});
        console.log(this.state.date);
    }

    render() {
        return (
            <div>
                <Toast  style={{ position: 'absolute', top: '0px', left: '0px', zIndex: 999 }} onClose={() => this.setShowToast(false)} show={this.state.showToast} delay={4000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">
                            <img style={{ height: '1em', width: '1em' }} src={toastLogo} alt="logo"></img> Thank you for your submission. </strong>
                        <small>0s ago</small>
                    </Toast.Header>
                    <Toast.Body>Our system will add your food submission to the database.</Toast.Body>
                </Toast>
                <Card>
                    <Card.Header>
                        <div>
                            <img src={toastLogo} alt="logo"
                                style={{ width: '1em', height: '1em', marginRight: '0.5em' }} /> Submit the data and parameters
                            </div>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <div style={{paddingTop:'1em'}}>
                            <Button variant="primary"> Upload Dataset (.csv)
                            </Button>
                            </div>
                            <div style={{paddingTop:'1em'}}>

                            <Button variant="primary"> Upload Model (.json)
                            </Button>
                            </div>
                            <div style={{paddingTop:'1em'}}>

                            <Button variant="primary"> Upload Weights (.bin)
                            </Button>
                            </div>

                            <Form.Group controlId="Model">
                                <Form.Label>Model</Form.Label>
                                <Form.Control as="select"
                                              name = "model"
                                              onChange={this.handleChange}>
                                    <option>Fully Connected Network</option>
                                    <option>Convolutional Neural Network</option>
                                </Form.Control>
                            </Form.Group>

                            <div id="dynamicInput">
                                {this.state.inputs.map(input =>
                                    <Form.Group>
                                    <div style={{paddingTop:'2em'}}>
                                    <Form.Label>Layer</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        name = "layers"
                                        onChange={this.handleChange}
                                        placeholder="Enter # Units for Layer" />
                                    <Form.Label>Activation</Form.Label>
                                    <Form.Control as="select"
                                                  name = "activations"
                                                  onChange={this.handleChange}>
                                        <option>Sigmoid</option>
                                        <option>Tanh</option>
                                        <option>ReLU</option>
                                        <option>None</option>
                                    </Form.Control>
                                    </div>
                                </Form.Group>)}
                            </div>

                            <Button variant="primary"
                                    onClick={this.appendInput}>
                                Add Layer
                            </Button>


                            <div style={{paddingTop:'1em'}}>
                                <Button variant="primary" onClick={click => this.onSubmit()}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default TrainSubmissionForm;