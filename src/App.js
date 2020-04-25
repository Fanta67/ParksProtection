import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Parks from './Parks';
import ParkInstance from './ParkInstance';
import ParksSearch from './ParksSearch';
import Animals from './Animals';
import AnimalPage from './AnimalInstancePages/AnimalPage';
import AnimalsSearch from './AnimalsSearch';
import Plants from './Plants';
import PlantInstance from './PlantInstancePages/PlantInstance';
import PlantsSearch from './PlantsSearch';
import Search from './Search';
import NotFoundPage from './NotFoundPage'
import { Link } from 'react-router-dom';
import Charts from './Charts/Charts';
import {withFauxDOM} from 'react-faux-dom';

require('dotenv').config({path: ':../.env' })

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNode: ""
    };
  }

  handleKeyPress(key) {
        if (key.charCode == 13) {
            key.preventDefault();
            window.location.href = ("/search/" + String(this.state.inputNode))
        }
    }

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
            <Form inline>
                <FormControl id="searchBox" type="text" placeholder={"Search"} className="mr-sm-2"
                   onChange={node => this.setState({inputNode: node.target.value})}
                    onKeyPress={key => {this.handleKeyPress(key)}}
                />
                <Button id="searchButton"
                    href={("/search/" + String(this.state.inputNode))}
                >Search</Button>
          </Form>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route path="/search/:query" component={Search} />
            <Route exact path="/Animals/search" component={AnimalsSearch} />
            <Route path="/Animals/search/:id" component={AnimalsSearch} />
            <Route path="/Animals/:id" component={AnimalPage} />
            <Route exact path="/Plants/search" component={PlantsSearch} />
            <Route path="/Plants/search/:id" component={PlantsSearch} />
            <Route path="/Plants/:id" component={PlantInstance} />
            <Route path="/About" component={About} />
            <Route exact path="/Parks" component={Parks} />
            <Route exact path="/Parks/search" component={ParksSearch} />
            <Route path="/Parks/search/:id" component={ParksSearch} />
            <Route path="/Parks/:code" component={ParkInstance} />
            <Route exact path="/Animals" component={Animals} />
            <Route path="/Plants" component={Plants} />
            <Route path="/Charts" component={Charts} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </React.Fragment>
      );
  }
}

export default App;
