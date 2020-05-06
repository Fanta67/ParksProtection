import React, {Component} from 'react';
import logo from '../Assets/logo/logo.png';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import GCMapWrapper from '../Components/Maps/GCMapWrapper';
import { Nav } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';


const CarouselImage = styled('img')`
	width: 100%;
	height: 350px;
	object-fit: cover;
	margin: auto;
`;
const ImageBoxLong = styled('img')`
	width: 600px;
	height: 400px;
`;

const CenterText = styled('div')`
	color: #444444;
	text-align: center;
`

const ItalicText = styled('div')`
	font-style: italic;
`

const Text = styled('div')`
	color: black;
`

const CenteredCol = styled('Col')`
 	margin: auto;
`;

class ParkInstance extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			address : "",
			desc : "",
			designation : "",
			directions : "",
			email : "",
			images : [],
			latitude : 39.8283,
			longitude : -98.5795,
			name : "",
			phone : "",
			states : "",
			url : "",
			weather : "",
			rl1_id: 0,
			rl1_img: "",
			rl1_title: "",
			rl2_id: 0,
			rl2_img: "",
			rl2_title: "",
			rl3_id: 0,
			rl3_img: "",
			rl3_title: "",
			rl4_id: 0,
			rl4_img: "",
			rl4_title: "",
		};
	}

	componentDidMount() {
		fetch(
          "https://api.parkprotection.me/api/parks/".concat(this.props.match.params.code)
      	)
		.then((response) => response.json())
		.then((data) => {
			if(typeof data.states == "undefined") {
		      window.location.href = "/error_instance_not_found"
		    } else {
			console.log("FETCHED PARK INSTANCE")
			if("code" in data) {
				this.setState({
					address : data.address,
					desc : data.desc,
					designation : data.designation,
					directions : data.directions,
					email : data.email,
					images : data.images.split(" ").map((image) => image.replace("http://", "https://")),
					latitude : data.latitude,
					longitude : data.longitude,
					name : data.name,
					phone : data.phone,
					states : data.states.map((state) => state.name).join(", "),
					url : data.url,
					weather : data.weather
				});
				fetch(
					'https://api.parkprotection.me/api/animals?q={"filters":[{"name":"states__name","op":"any","val":"'.concat(data.states[0].name).concat('"}]}')
					)
				.then((response) => response.json())
				.then((animalsData) => {
					console.log("FETCHED ANIMALS")
					if(animalsData.num_results >= 2) {
						this.setState({
							rl1_id: animalsData.objects[0].id,
							rl1_img: animalsData.objects[0].image.replace("http://", "https://"),
							rl1_title: animalsData.objects[0].com_name,
							rl2_id: animalsData.objects[1].id,
							rl2_img: animalsData.objects[1].image.replace("http://", "https://"),
							rl2_title: animalsData.objects[1].com_name,
						});
					}
				});
				fetch(
					'https://api.parkprotection.me/api/plants?q={"filters":[{"name":"states__name","op":"any","val":"'.concat(data.states[0].name).concat('"}]}')
					)
				.then((response) => response.json())
				.then((plantsData) => {
					console.log("FETCHED PLANTS")
					if(plantsData.num_results >= 2) {
						this.setState({
							rl3_id: plantsData.objects[0].id,
							rl3_img: plantsData.objects[0].image.replace("http://", "https://"),
							rl3_title: plantsData.objects[0].com_name,
							rl4_id: plantsData.objects[1].id,
							rl4_img: plantsData.objects[1].image.replace("http://", "https://"),
							rl4_title: plantsData.objects[1].com_name,
						});
					}
				});
			} else {

			}
		}});

	}

	makeCarousel() {
		let carousel = [];
		for(const i in this.state.images) {
			const image = this.state.images[i]
			carousel.push(
				<Carousel.Item key={image}>
				    <CarouselImage
				      src={image}
				      alt="Image"
				    />
				</Carousel.Item>)
		}
		return carousel;
	}

	render() {
		console.log('in render')
		console.log(this.state)
		return (
			<div>
				<Jumbotron>
					<Container>
						<CenterText><h1 className="PageHeader">{this.state.name}</h1></CenterText>
					</Container>
				</Jumbotron>

				<br/>
				<Container>
				<Alert variant="danger">
					COVID-19 may affect this park's hours of operation. Please contact the
					park for details and see <a href="https://www.cdc.gov/coronavirus/2019-nCoV/index.html" className="alert-link">this link</a> for more information on COVID-19.
				</Alert>

					<Carousel>
						{this.makeCarousel()}
					</Carousel>

					<br/><br/><br/>
					<Row>
						<Col>
						<h6>{this.state.desc}</h6>
						</Col>
						<Col>
						<h6>{this.state.weather}</h6>
						</Col>
						<Col>
						<h6>{this.state.directions}</h6>
						</Col>
					</Row>

					<br></br>
					<h3>Contact Them</h3>
					<h5><a href={this.state.url}>Website</a></h5>
					<h5>{this.state.email}</h5>
					<h5>{this.state.phone}</h5>
					<h5>{this.state.address}</h5>

					<br/>
					<GCMapWrapper latitude={this.state.latitude} longitude={this.state.longitude}/>

					<br/>
					<div>
						<Row>
							<Col className="text-center">
								<h4>Related Animals</h4>

								<br/>
								<CardDeck className="text-center">
									<Card><Nav.Link as={ Link } to={"/Animals/" + this.state.rl1_id}><Text>
									    <Card.Img variant="top" src={this.state.rl1_img} />
									    <Card.Body>
									      	<Card.Title>{this.state.rl1_title}</Card.Title>
									    </Card.Body>
									</Text></Nav.Link></Card>
						    		<Card><Nav.Link as={ Link } to={"/Animals/" + this.state.rl2_id}><Text>
										<Card.Img variant="top" src={this.state.rl2_img} />
									 	<Card.Body>
											<Card.Title>{this.state.rl2_title}</Card.Title>
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
					</div>

					<br/>
					&nbsp;

				</Container>

			</div>
	  	);
	}
}

export default ParkInstance;
