import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'
import { Link } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand><Link to="/">Park Protection</Link></Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link><Link to="/Parks">Parks</Link></Nav.Link>
              <Nav.Link><Link to="/Plants">Plants</Link></Nav.Link>
              <Nav.Link><Link to="/Animals">Animals</Link></Nav.Link>
              <Nav.Link><Link to="/About">About</Link></Nav.Link>
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </React.Fragment>
      );
  }
}

export default App;