import React, {Component} from 'react';
import logo from '../logo.png';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        position: 'absolute', top: '15%', bottom: '10%', left: '0%', right: '0%'
      }}>
      <Container>
        <Row>
          <Col>
            <br/><h1>Preserving Nature Through Education</h1>
            <h4>Learn more about endangered species and the national parks protecting
            them</h4><br/><br/><br/><br/>
            &nbsp;&nbsp;&nbsp;<Button variant="danger" as={ Link } to ="/Parks">&nbsp;&nbsp;&nbsp;Get Started&nbsp;&nbsp;&nbsp;</Button>
          </Col>
          <Col xs={6}><Image src={ logo } fluid /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
