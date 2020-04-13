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

const Text = styled('div')`
	color: black;
`

class AnimalsSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animalList: [],
			num_results: 0
		};
	}

	componentDidMount() {
		this.fillanimalList(" ")
	}

	makeCardDeck() {
		let animalDeck = [];
		var deckSize = this.state.animalList.length;
		var i = 0;
		var j = 0;

		for(; i < Math.floor(this.state.num_results/3) + 1; ++i) {
			let animalInstances = [];
			for(j = 0; (j < 3); ++j) {
                if(!((i * 3 + j) < deckSize))
                    break;
				var index = i * 3 + j;
                var source = this.state.animalList[index];
				animalInstances.push (
					<Card className={"a" + source.id}>
						<Nav.Link as={ Link } to={{pathname: "/Animals/" + source.id, state: {id: source.id}}}>
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
            animalDeck.push(<br></br>)
			animalDeck.push(<CardDeck className="text-center">{animalInstances}</CardDeck>)
		}
		// var assert = require('assert');
		// assert(deckSize == 0);
		return animalDeck;
	}

	fillanimalList(search_query) {
		fetch(
          'https://api.parkprotection.me/api/animals?results_per_page=1000&q={"search_query":"' + search_query + '"}')
          .then((response) => response.json())
          .then((data) => {
              console.log('FETCHED ANIMALS');
              let animalList = [];
              for (const i in data.objects) {
              	const animalParsed = {
              		id : data.objects[i].id,
              		image : data.objects[i].image.replace("http://", "https://"),
              		com_name : data.objects[i].com_name,
              		match: data.objects[i].match
              	}
                animalList.push(animalParsed)
              }
              this.setState({ animalList : animalList, num_results: data.num_results});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
              this.setState({ animalList : [], num_results: 0});
          });
	}

	render() {
		return (
			<Container>
				<br/>
				<h1 className="PageHeader">Results</h1><br/>

				{this.makeCardDeck()}
			</Container>
		);
	}
}

export default AnimalsSearch;
