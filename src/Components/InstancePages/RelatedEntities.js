import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import {TableBox, Text} from './Constants.js'
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

function RelatedEntities(props) {
  return (
    <Row>
      <Col className="text-center">
        <h4>Related Parks</h4>

        <br/>
        <CardDeck className="text-center">
          <Card><Nav.Link as={ Link } to= {"/Parks/" + props.info.rl1_code}><Text>
              <Card.Img variant="top" src= {props.info.rl1_images ? props.info.rl1_images[0].replace("http://", "https://") : null} />
              <Card.Body>
                <Card.Title>{props.info.rl1_name}</Card.Title>
              </Card.Body>
            </Text></Nav.Link></Card>
          <Card><Nav.Link as={ Link } to={"/Parks/" + props.info.rl2_code}><Text>
              <Card.Img variant="top" src={props.info.rl2_images ? props.info.rl2_images[0].replace("http://", "https://") : null}/>
              <Card.Body>
                  <Card.Title>{props.info.rl2_name}</Card.Title>
              </Card.Body>
            </Text></Nav.Link></Card>
          </CardDeck>
      </Col>
      <Col className="text-center">
        <h4>Related Animals</h4>

        <br/>
        <CardDeck className="text-center">
          <Card><Nav.Link as={ Link } to= {"/Animals/" + props.info.rl3_id}><Text>
              <Card.Img variant="top" src={props.info.rl3_img ? props.info.rl3_img.replace("http://", "https://"): null}/>
              <Card.Body>
                  <Card.Title>{props.info.rl3_title}</Card.Title>
              </Card.Body>
            </Text></Nav.Link></Card>
            <Card><Nav.Link as={ Link } to= {"/Animals/" + props.info.rl4_id}><Text>
                <Card.Img variant="top" src={props.info.rl4_img ? props.info.rl4_img.replace("http://", "https://"): null}/>
                <Card.Body>
                    <Card.Title>{props.info.rl4_title}</Card.Title>
                </Card.Body>
              </Text></Nav.Link></Card>
          </CardDeck>
      </Col>
    </Row>
  );
}

export default RelatedEntities;
