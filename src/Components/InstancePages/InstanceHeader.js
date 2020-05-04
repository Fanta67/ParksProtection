import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CommonName, ScientificName} from './Constants.js'
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron'

class InstanceHeader extends React.Component {
  render()
  {
    return(
      <Jumbotron>
          <Container>
            <CommonName className="PageHeader">{this.props.common_name}</CommonName>
            <ScientificName>{this.props.scientific_name}</ScientificName>
          </Container>
      </Jumbotron>
    );
  }

}

InstanceHeader.propTypes = {
  common_name: PropTypes.string,
  scientific_name: PropTypes.string
};

export default InstanceHeader;
