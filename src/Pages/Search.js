import React, {Component} from 'react';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import ParksSearch from '../Components/Search/ParksSearch'
import PlantsSearch from '../Components/Search/PlantsSearch'
import AnimalsSearch from '../Components/Search/AnimalsSearch'

const BoldText = styled('div')`
	font-size: 21px;
	font-weight: bold;
`

const Text = styled('span')`
	color: black;
	font-size: 16px;
`

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animalList: [],
			animals_num_results: 0,
			animalsFetched: false,
			parkList: [],
			parks_num_results: 0,
			parksFetched: false,
			plantList: [],
			plants_num_results: 0,
			plantsFetched: false
		};
	}

	componentDidMount() {
        let url = String(window.location.href).split('/');
        this.fillparkList(url[url.length-1])
        this.fillplantList(url[url.length-1])
		this.fillanimalList(url[url.length-1])
    }

    makeParkCardDeck() {
		let parkDeck = [];
		var deckSize = this.state.parkList.length;
		var i = 0;
		var j = 0;

		for(; i < Math.floor(this.state.parks_num_results/3) + 1; ++i) {
			let parkInstances = [];
			for(j = 0; (j < 3); ++j) {
                if(!((i * 3 + j) < deckSize))
                    break;
				var index = i * 3 + j;
                var source = this.state.parkList[index];
				parkInstances.push (
					<Card className={"a" + source.code}>
						<Nav.Link as={ Link } to={{pathname: "/parks/" + source.code, state: {code: source.code}}}>
						    <Text>
							    <Card.Img variant="top" src={source.image}/>
						    	<BoldText>{source.name}</BoldText>
                                <span dangerouslySetInnerHTML={{__html: source.match}} />
							</Text>
				    	</Nav.Link>
				    </Card>
				)
			}
            parkDeck.push(<br></br>)
			parkDeck.push(<CardDeck className="text-center">{parkInstances}</CardDeck>)
		}
		// var assert = require('assert');
		// assert(deckSize == 0);
		return parkDeck;
	}

	fillparkList(search_query) {
		fetch(
          'https://api.parkprotection.me/api/parks?results_per_page=1000&q={"search_query":"' + search_query + '"}')
          .then((response) => response.json())
          .then((data) => {
              console.log('FETCHED parkS');
              let parkList = [];
              for (const i in data.objects) {
              	const parkParsed = {
              		code : data.objects[i].code,
              		image : data.objects[i].image.replace("http://", "https://"),
              		name : data.objects[i].name,
              		match: "..." + data.objects[i].match.replace("<hlt>", "<span style='background-color:yellow;'>").replace("</hlt>", "</span>") + "..."
              	}
                parkList.push(parkParsed)
              }
              this.setState({ parksFetched: true, parkList : parkList, parks_num_results: data.num_results});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
              this.setState({ parksFetched: true, parkList : [], parks_num_results: 0});
          });
	}

    makePlantCardDeck() {
		let plantDeck = [];
		var deckSize = this.state.plantList.length;
		var i = 0;
		var j = 0;

		for(; i < Math.floor(this.state.plants_num_results/3) + 1; ++i) {
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
						    	<BoldText>{source.com_name}</BoldText>
                                <span dangerouslySetInnerHTML={{__html: source.match}} />
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
              		match: "..." + data.objects[i].match.replace("<hlt>", "<span style='background-color:yellow;'>").replace("</hlt>", "</span>") + "..."
              	}
                plantList.push(plantParsed)
              }
              this.setState({ plantsFetched: true, plantList : plantList, plants_num_results: data.num_results});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
              this.setState({ plantsFetched: true, plantList : [], plants_num_results: 0});
          });
	}

	makeAnimalCardDeck() {
		let animalDeck = [];
		var deckSize = this.state.animalList.length;
		var i = 0;
		var j = 0;

		for(; i < Math.floor(this.state.animals_num_results/3) + 1; ++i) {
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
						    	<BoldText>{source.com_name}</BoldText>
                                <span dangerouslySetInnerHTML={{__html: source.match}} />
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
              		match: "..." + data.objects[i].match.replace("<hlt>", "<span style='background-color:yellow;'>").replace("</hlt>", "</span>") + "..."
              	}
                animalList.push(animalParsed)
              }
              this.setState({ animalsFetched: true, animalList : animalList, animals_num_results: data.num_results});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
              this.setState({ animalsFetched: true, animalList : [], animals_num_results: 0});
          });
	}

	render() {
		return (
			<Container>

				<br/>
				<ParksSearch />

				<PlantsSearch />

				<AnimalsSearch />
			</Container>
		);
	}
}

export default Search;
