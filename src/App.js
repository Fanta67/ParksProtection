import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Parks from './Parks';
import ParkInstance from './ParkInstance'
import Animals from './Animals';
import AnimalsSearch from './AnimalsSearch';
import Plants from './Plants';
import PlantsSearch from './PlantsSearch';
import AnimalPage from './AnimalInstancePages/AnimalPage';
import Zion from './ParkInstancePages/Zion';
import PlantInstance from './PlantInstancePages/PlantInstance';
import NotFoundPage from './NotFoundPage'
import { Link } from 'react-router-dom';

require('dotenv').config({path: ':../.env' })

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar bg="light" variant="light">
            <Navbar.Brand as={ Link } to="/">Park Protection</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={ Link } to="/Parks">Parks</Nav.Link>
              <Nav.Link as={ Link } to="/Plants">Plants</Nav.Link>
              <Nav.Link as={ Link } to="/Animals">Animals</Nav.Link>
              <Nav.Link as={ Link } to="/About">About</Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Animals/search" component={AnimalsSearch} />
            <Route path="/Animals/search/:id" component={AnimalsSearch} />
            <Route path="/Animals/:id" component={AnimalPage} />
            <Route exact path="/Plants/search" component={PlantsSearch} />
            <Route path="/Plants/search/:id" component={PlantsSearch} />
            <Route path="/Plants/:id" component={PlantInstance} />
            <Route path="/About" component={About} />
            <Route exact path="/Parks" component={Parks} />
            <Route path="/Parks/:code" component={ParkInstance} />
            <Route exact path="/Animals" component={Animals} />
            <Route path="/Plants" component={Plants} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </React.Fragment>
      );
  }
}

export default App;
