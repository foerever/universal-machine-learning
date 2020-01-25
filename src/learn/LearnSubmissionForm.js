import React from 'react';
import '../App.css';
import { Form, Button, Card, Toast } from 'react-bootstrap';
import axios from 'axios';
import toastLogo from '../assets/logo.png';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

// const predictContainer = document.getElementById('predictContainer');
// const predictButton = document.getElementById('predict-button');


class LearnSubmissionForm extends React.Component {
    constructor(props) {
        super(props);
        this.form = {
            name: '',
            email: '',
            foodType: '',
            notes: '',
        };
        this.state = {
            showToast: false,
            date: '',
            inputs: ['input-0']
        };
    }
    onSubmit() {
        console.log("something")
        this.props.predict();
        // predictButton.disabled = true;


        // axios.post(`/fnb_submission`, {
        //     name: this.form.name,
        //     email: this.form.email,
        //     foodType: this.form.foodType,
        //     notes: this.form.notes,
        //     date: this.state.date
        // }).then(res => {
        //     this.props.getData();
        // });
        // this.setShowToast(true);
    }

    handleChange = e => {
        this.form[e.target.name] = e.target.value;
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
                            <Form.Group controlId="Model">
                                <Form.Label>Model</Form.Label>
                                <Form.Control as="select">
                                    <option>CNN</option>
                                    <option>MLP</option>
                                    <option>GAN</option>
                                </Form.Control>
                            </Form.Group>

                            <div id="dynamicInput">
                                {this.state.inputs.map(input => <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Layer</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        onChange={this.handleChange}
                                        name='email'
                                        type="email"
                                        placeholder="Enter # Units for Layer" />
                                </Form.Group>)}
                            </div>

                            <Button variant="primary"
                                    onClick={this.appendInput}>
                                Add Layer
                            </Button>

                            <Form.Group controlId="ActFunction">
                                <Form.Label>Activation Function</Form.Label>
                                <Form.Control as="select">
                                    <option>Relu</option>
                                    <option>TanH</option>
                                </Form.Control>
                            </Form.Group>
                            
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

export default LearnSubmissionForm;