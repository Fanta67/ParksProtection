import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';
import { Nav } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';

const Text = styled('div')`
	color: black;
`

class PlantsSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			plantList: [],
			num_results: 0
		};
	}

	componentDidMount() {
        let url = String(window.location.href).split('/');
		this.fillplantList(url[url.length-1])
    }

	makeCardDeck() {
		let plantDeck = [];
		var deckSize = this.state.plantList.length;
		var i = 0;
		var j = 0;

		for(; i < Math.floor(this.state.num_results/3) + 1; ++i) {
			let plantInstances = [];
			for(j = 0; (j < 3); ++j) {
                if(!((i * 3 + j) < deckSize))
                    break;
				var index = i * 3 + j;
                var source = this.state.plantList[index];
				plantInstances.push (
					<Card className={"a" + source.id}>
						<Nav.Link as={ Link } to={{pathname: "/plants/" + source.id, state: {id: source.id}}}>
						    <Text>
							    <Card.Img variant="top" src={source.image}/>
							    <Card.Body>
							    	<Card.Title>{source.com_name}</Card.Title>
                                    <Card.Text dangerouslySetInnerHTML={{__html: source.match}} />
							    </Card.Body>
							</Text>
				    	</Nav.Link>
				    </Card>
				)
			}
            plantDeck.push(<br></br>)
			plantDeck.push(<CardDeck className="text-center">{plantInstances}</CardDeck>)
		}
		// var assert = require('assert');
		// assert(deckSize == 0);
		return plantDeck;
	}

	fillplantList(search_query) {
		fetch(
          'https://api.parkprotection.me/api/plants?results_per_page=1000&q={"search_query":"' + search_query + '"}')
          .then((response) => response.json())
          .then((data) => {
              console.log('FETCHED plantS');
              let plantList = [];
              for (const i in data.objects) {
              	const plantParsed = {
              		id : data.objects[i].id,
              		image : data.objects[i].image.replace("http://", "https://"),
              		com_name : data.objects[i].com_name,
              		match: data.objects[i].match
              	}
                plantList.push(plantParsed)
              }
              this.setState({ plantList : plantList, num_results: data.num_results});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
              this.setState({ plantList : [], num_results: 0});
          });
	}

    handleKeyPress(key) {
        if (key.charCode == 13) {
            key.preventDefault();
            window.location.href = (String(this.state.inputNode))
        }
    }

	render() {
		return (
			<Container>
				<br/>
				<Row>
				<Col><h1 className="PageHeader">Results</h1><br/></Col>
				<Col xs={{span: 3}}>
					<Form inline>
                        <Form.Group as={Row}>
                            <FormControl id="searchBox" type="text" placeholder={"Search plants"} className="mr-sm-2"
                               onChange={node => this.setState({inputNode: node.target.value})}
                                onKeyPress={key => {this.handleKeyPress(key)}}
                            />
                            <Button id="searchButton"
                                href={(String(this.state.inputNode))}
                            >Search</Button>
                        </Form.Group>
					</Form>
				</Col>
                </Row>

				{this.makeCardDeck()}
			</Container>
		);
	}
}

export default PlantsSearch;
