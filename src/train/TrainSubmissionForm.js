import React from 'react';
import '../App.css';
import { Form, Button, Card, Toast } from 'react-bootstrap';
import toastLogo from '../assets/logo.png';
import 'react-day-picker/lib/style.css';
import FormData from 'form-data';
import io from 'socket.io-client';
const axios = require('axios');

class TrainSubmissionForm extends React.Component {
    constructor(props) {
        super(props);
        // this.form = {
        //     model: 'Fully Connected Network',
        //     layers:[],
        //     activations: [],
        // };
        this.state = {
            dataset: null,
            modeljson: null,
            weights: null,
            showToast: false,
            date: '',
            inputs: ['input-0'],
        };
    }

    // handleChange = e => {
    //     console.log("Name: " + e.target.name);
    //     if (e.target.name === "layers" || e.target.name === "activations") {
    //         this.form[e.target.name] =  this.form[e.target.name].concat([e.target.value])
    //         console.log("LAYERS: " + this.form[e.target.name]);
    //     } else {
    //         this.form[e.target.name] = e.target.value;
    //         console.log("model: " + this.form[e.target.name]);
    //     }

    //     console.log(this.form)
    //     console.log(this.state)
    // }

    handleFileSelectionDataset(e) {
        this.setState({
            dataset: e.target.files[0]
        });
    }

    handleFileSelectionModelJson(e) {
        this.setState({
            modeljson: e.target.files[0]
        });
    }

    handleFileSelectionWeights(e) {
        this.setState({
            weights: e.target.files[0]
        });
    }

    onSubmit() { 
        this.setShowToast(true);
        this.submit(this.state.dataset, this.state.modeljson, this.state.weights);
    }

    submit (dataset, modeljson, weights) {
        console.log("here")
        const form = new FormData();

        form.append('dataset', dataset === null ? null : dataset);
        form.append('modeljson', modeljson === null ? null : modeljson);
        form.append('weights', weights === null ? null : weights);

        // form.append('model', model);
        // form.append('layerarray', JSON.stringify(layerarray))
        form.append('timestamp', new Date().toGMTString());
        return axios.post("http://localhost:8000/submit", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
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
                    <Toast.Body>Thank you. We will now allocate computational resources for your specifications and train your model.</Toast.Body>
                </Toast>
                <Card>
                    <Card.Header>
                        <div>
                            <img src={toastLogo} alt="logo"
                                style={{ width: '1em', height: '1em', marginRight: '0.5em' }} /> Submit the built model
                            </div>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <div style={{paddingTop:'1em'}}>
                            <b> Upload Dataset (.csv)</b>
                            <input
                                type="file"
                                name="Upload Dataset (.csv)"
                                id="Upload Dataset (.csv)"
                                onChange={this.handleFileSelectionDataset.bind(this)}
                                ref={(ref) => this.fileUpload = ref}
                            />
                            </div>
                            <div style={{paddingTop:'1em'}}>


                            <b>Upload Model (.json)</b>
                            <input
                                type="file"
                                name="Upload Model (.json)"
                                id="Upload Model (.json)"
                                onChange={this.handleFileSelectionModelJson.bind(this)}
                                ref={(ref) => this.fileUpload = ref}
                            />
                            </div>

                            <div style={{paddingTop:'1em'}}>

                                <b> Upload Weights (.bin)</b>
                                <input
                                    type="file"
                                    name="Upload Weights (.bin)"
                                    id="Upload Weights (.bin)"
                                    onChange={this.handleFileSelectionWeights.bind(this)}
                                    ref={(ref) => this.fileUpload = ref}
                                />
                            </div>

                            {/* <Form.Group controlId="Model">
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

                            <Button variant="outline-secondary"
                                    onClick={this.appendInput}>
                                Add Layer
                            </Button> */}

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