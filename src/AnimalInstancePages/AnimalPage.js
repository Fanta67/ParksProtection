
import React, {Component} from 'react';
import map from '../Assets/Maps/BlankMap.png';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import MapWrapper from '../Assets/Maps/MapWrapper';

const CommonName = styled('h1')`
  color: #444444;
  text-align: center;
`
const ScientificName = styled('h4')`
  text-align: center;
  font-style: italic;
  color: #444444;
`;

const EndangeredBox = styled('div')`
	text-align: center;
	height: 50px;
	width: 250px;
	margin: auto;
`;

const EndangeredText = styled('h1')`
	color: #ab0f0f;
`;

const CenteredRow = styled('Row')`
  padding: 5px;
  margin: auto;
`;

const CenteredCol = styled('Col')`
  padding: 5px;
  margin: auto;
`;

const TableBox = styled('div')`
	text-align: center;
	display: flex;
`;

const ImageBox = styled('img')`
	width: 100%;
	height: 400px;
	object-fit: cover;
`;

const ImageBoxLong = styled('img')`
	width: 600px;
	height: 400px;
`;

const ItalicText = styled('div')`
	font-style: italic;
`

const Text = styled('div')`
	color: black;
`

export default class AnimalPage extends Component {
  state = {
    animal : null,
    loading : true,
    states : null,

  }

  async componentDidMount(){
    let url = "https://api.parkprotection.me/api/animals/".concat(this.props.match.params.id);
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    this.setState({animal : data,
                   loading: false,
                   states: data.states.map(function(e) {
                     return e.name
                   })
                 });
     fetch(
  			'https://api.parkprotection.me/api/parks?q={"filters":[{"name":"states__name","op":"any","val":"'.concat(data.states[0].name).concat('"}]}')
  			)
  		.then((response) => response.json())
  		.then((parksData) => {
  			this.setState({
            rl1_code : parksData.objects[0].code,
            rl1_name : parksData.objects[0].name,
            rl1_images : parksData.objects[0].images.split(" "),

            rl2_code : parksData.objects[1].code,
            rl2_name : parksData.objects[1].name,
            rl2_images : parksData.objects[1].images.split(" "),
  			})
  		});

      fetch(
   			'https://api.parkprotection.me/api/plants?q={"filters":[{"name":"states__name","op":"any","val":"'.concat(data.states[0].name).concat('"}]}')
   			)
   		.then((response) => response.json())
   		.then((plantsData) => {
   			this.setState({
          rl3_id: plantsData.objects[0].id,
          rl3_img: plantsData.objects[0].image.replace("http://", "https://"),
          rl3_title: plantsData.objects[0].com_name,

          rl4_id: plantsData.objects[1].id,
          rl4_img: plantsData.objects[1].image.replace("http://", "https://"),
          rl4_title: plantsData.objects[1].com_name,
   			})
   		});

  }

  render(){
    return (
      this.state.loading ? (<div> unavailable </div>) :
      (<div>
        <Jumbotron>
            <Container>
              <CommonName className="PageHeader">{this.state.animal.com_name}</CommonName>
              <ScientificName>{this.state.animal.sci_name}</ScientificName>
            </Container>
        </Jumbotron>
        <br/><br/>
        <Container>
          <Row>
            <Col>
              <ImageBox className="float-right" src= {this.state.animal.image.replace("http://", "https://")} fluid />
            </Col>

            <Col>
              <MapWrapper key={1} states={this.state.states} />
            </Col>
          </Row>

          <br/><br/>
          <EndangeredBox>
            <EndangeredText>{this.state.animal.status}</EndangeredText>
          </EndangeredBox>

          <br/><br/>
          <Row>
            <Col>
              {this.state.animal.des}
            </Col>

            <Col>
             <TableBox>
              <Table striped bordered hover size="sm">
                  <tbody>
                  <tr><th>Group</th><td>{this.state.animal.tax_group}</td></tr>
                  <tr><th>Date Listed</th><td>{this.state.animal.list_date}</td></tr>
                  <tr><th><a href="https://www.fws.gov/pacific/news/grizzly/esafacts.htm">Distinct Population Segment?</a></th><td>{this.state.animal.dps ? "Yes" : "No"}</td></tr>
                  <tr><th>Aquatic?</th><td>{this.state.animal.aquatic ? "Yes" : "No"}</td></tr>
                  <tr><th><a href="https://www.fws.gov/birds/management/managed-species/birds-of-conservation-concern.php">BCC?</a></th><td>{this.state.animal.bcc ? "Yes" : "No"}</td></tr>
                  <tr><th>Conservation Plan Title</th><td>{this.state.animal.plan}</td></tr>
                  </tbody>
              </Table>
            </TableBox></Col>
          </Row>

          <br/><br/>
            <Row>
              <Col className="text-center">
                <h4>Related Parks</h4>

                <br/>
                <CardDeck className="text-center">
                  <Card><Nav.Link as={ Link } to= {"/Parks/" + this.state.rl1_code}><Text>
                      <Card.Img variant="top" src= {this.state.rl1_images ? this.state.rl1_images[0].replace("http://", "https://") : null} />
                      <Card.Body>
                        <Card.Title>{this.state.rl1_name}</Card.Title>
                      </Card.Body>
                    </Text></Nav.Link></Card>
                  <Card><Nav.Link as={ Link } to={"/Parks/" + this.state.rl2_code}><Text>
                      <Card.Img variant="top" src={this.state.rl2_images ? this.state.rl2_images[0].replace("http://", "https://") : null}/>
                      <Card.Body>
                          <Card.Title>{this.state.rl2_name}</Card.Title>
                      </Card.Body>
                    </Text></Nav.Link></Card>
                  </CardDeck>
              </Col>
              <Col className="text-center">
                <h4>Related Plants</h4>

                <br/>
                <CardDeck className="text-center">
                  <Card><Nav.Link as={ Link } to={"/Plants/" + this.state.rl3_id}><Text>
                      <Card.Img variant="top" src={this.state.rl3_img} />
                      <Card.Body>
                          <Card.Title>{this.state.rl3_title}</Card.Title>
                      </Card.Body>
                  </Text></Nav.Link></Card>
                    <Card><Nav.Link as={ Link } to={"/Plants/" + this.state.rl4_id}><Text>
                    <Card.Img variant="top" src={this.state.rl4_img} />
                    <Card.Body>
                      <Card.Title>{this.state.rl4_title}</Card.Title>
                    </Card.Body>
                  </Text></Nav.Link></Card>
                  </CardDeck>
              </Col>
            </Row>
          <br/>
          &nbsp;
        </Container>
      </div>)
    );
  }
};
