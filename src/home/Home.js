import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import explore from '../Assets/explore.svg';
// import connected_world from '../Assets/explore.svg';
// import around_the_world from '../Assets/explore.svg';
import tfjs from "../../public/tfjs_logo.png"
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{paddingTop:'2em' }}>
                <h1>About Universal Machine Learning</h1>
                <Container>
                    <img src={tfjs} alt="website logo" />
                    <p>                    Without a doubt, machine learning can be an expensive undertaking, especially in the context of training neural networks. Complex models can take an immense amount of computing power to train. For those with __severely__ limited access to computing power, even the "simplest" models can be difficult or impossible to compute locally.
                    </p>
                    <p>                    While services like GCP and AWS exist to provide additional computing power, it's reasonable to assume that someone with especially low resources might not be able to afford these services in the long run. Additionally, the "free plans" for these platforms are still limited in features. For example, the _Always Free_ Tier on GCP, doesn't allow users to use GPU's or TPU's for free.
                    </p>

                    <p> The goal of this project is to provide a platform for "universal machine learning". Users of the platform can harness the power of computers provided by those fortunate enough to have access to powerful devices. Free of charge. Our service provides an easy-to-use web app integrated with Tensorflow.js that allows users to train and test models in a web interface. The target audience of this platform is twofold:
                    </p>
                    <p>
                    1. Those in the beginning stages of their machine learning education who may have limited or no coding skills.
                    </p>
                    <p>
                    2. Those with programming skills but severely limited access to compute power.
                    </p>
                    <p>
                    For the former, we provide an easy-to-use interface for testing and tuning models without using any code. For example, users can experiment with a simple feed-forward neural network by adjusting the number of hidden layers and their parameters (# of units, activation function).
                    </p>
                    <p>
                    For the latter, TensorFlow.js allows more experienced users to write models themselves using 2 methods:
                    </p>
                    <p>
                    1. Using Keras via the Python API. Users can write and compile `Sequential` models as they normally would and save them to the `.h5` format. Tensorflow.js then provides tools to convert `.h5` files into the Tensorflow.js "Layers format" which consists of:
                    </p>
                    * A `.json` file containing the topology/architecture of model

                    * A file in binary format containing the weights of the model (Tensorflow.js also allows you to load already-trained models)

                    2. Alternatively, users can save and upload their model by directly writing it locally in Tensorflow.js and uploading the `.json` and binary files without any conversion.

                    Users can then train/validate/test their models as they usually would through the interface.
                    <p>

                    </p>

                    {/*<Row>*/}
                    {/*    <Col className="section" xs={4} style={{textAlign: 'left'}}>*/}
                    {/*        /!* <img alt="explore world" style={{width:'20em', height:'20em'}} src={connected_world}/> *!/*/}
                    {/*    </Col>*/}
                    {/*    <Col className="section" xs={8}>*/}
                    {/*        <div style={{paddingTop:'6em'}}>*/}
                    {/*            <p>places.io is a platform to empower cultural and societal diffusion. We believe that people should have one centralized application to share and view content about places all around the world. We want to enable people to share images about their locations and display the intricacies of their individual worlds.</p>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                    {/*    <Col className="section" xs={8} style={{textAlign: 'left'}}>*/}
                    {/*        <div style={{paddingTop:'8em'}}>*/}
                    {/*            <p>At your fingertips, is the ability to explore new worlds and cultures. So go ahead, laugh at the silly posts of your friends, admire the beauty of incredible new places, enjoy everything that the world has to offer. See from the perspective of another. And let them see from yours.</p>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*    <Col className="section" xs={4}>*/}
                    {/*        /!* <img alt="explore world" style={{width:'20em', height:'20em'}} src={around_the_world}/> *!/*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                    {/*    <Col className="section" xs={4} style={{textAlign: 'left'}}>*/}
                    {/*        /!* <img alt="explore world" style={{width:'20em', height:'20em'}} src={explore}/> *!/*/}
                    {/*    </Col>*/}
                    {/*    <Col className="section" xs={8}>*/}
                    {/*        <div style={{paddingTop:'8em'}}>*/}
                    {/*            <p>We hope that this will encourage adventure and exploration. The world is not a small place. There is so much to see and do. Let's make the world and all its treasures, open source! </p>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Container>

            </div>
        );
    }
}

export default Home;