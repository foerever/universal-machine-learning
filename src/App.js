import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './App.css';
import logo from './assets/logo.png';
import Learn from './learn/Learn';
import Home from './home/Home';
import Sponsor from './sponsor/Sponsor';
import Train from './train/Train'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      route: 'home'
    };
  }
  navigate(route) {
    this.setState({ route });
  }
  render() {
    return (
      <div className="App">
        <Navbar bg="light" >
          <img style={{ height: '100%', width: '2em', marginRight: '0.5em' }} alt="logo" src={logo} />

          <Navbar.Brand href="#home">Universal Machine Learning</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav.Link onClick={() => this.navigate('home')}>Home</Nav.Link>
          <Nav.Link onClick={() => this.navigate('learn')}>Learn</Nav.Link>
          <Nav.Link onClick={() => this.navigate('train')}>Train</Nav.Link>
          <Nav.Link onClick={() => this.navigate('sponsor')}>Sponsor</Nav.Link>

          
          </Navbar>
        {this.state.route === 'home'
			? <Home /> :
				(this.state.route === 'learn'
        		? <Learn /> :
                    (this.state.route === 'train'
                ? <Train/> : <Sponsor />))}
      </div>
    );
  }
}

export default App;
