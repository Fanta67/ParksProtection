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

const common = [
  { value: 'asc', label: 'Ascending' },
  { value: 'des', label: 'Descending' }
]

const Common = () => (
  <Select options={common} placeholder="Common Names" />
)

const scientific = [
  { value: 'asc', label: 'Ascending' },
  { value: 'des', label: 'Descending' }
]

const Scientific = () => (
  <Select options={scientific} placeholder="Scientific Names" />
)

const groups = [
  { value: 'birds', label: 'Birds' },
  { value: 'reptiles', label: 'Reptiles' }
]

const Groups = () => (
  <Select options={groups} isMulti className="basic-multi-select" placeholder="Groups" />
)

const statuses = [
  { value: 'threatened', label: 'Threatened' },
  { value: 'endangered', label: 'Endangered' }
]

const Statuses = () => (
  <Select options={statuses} isMulti className="basic-multi-select" placeholder="Listing Statuses" />
)

const states = [
	{ value: 'AZ', label: 'AZ' },
	{ value: 'TX', label: 'TX' }
]

const States = () => (
  <Select options={states} isMulti className="basic-multi-select" placeholder="States" />
)

const ItalicText = styled('div')`
	font-style: italic;
`

const Text = styled('div')`
	color: black;
`

class Animals extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animalList: [],
	        page: 1,
	        lastPageNum: 58
		};
	}

	componentDidMount() {
		this.fillanimalList(1)
	}

	makeCardDeck(){

		let animalDeck = [];
		var deckSize = this.state.animalList.length;
		var i = 0;
		var j = 0;

		for(; i < 3; ++i) {
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
							    	<Card.Text><ItalicText>{source.sci_name}</ItalicText></Card.Text>
							    	<Card.Text>{source.tax_group}</Card.Text>
							    	<Card.Text>{source.status}</Card.Text>
							    	<Card.Text>{source.states}</Card.Text>
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

	generateNewPage(event, pageNum) {
		this.state.page = pageNum;
		this.fillanimalList(this.state.page)
		window.scrollTo(0, 0);
	}

	createPaginationBar = () => {
		let paginationBar = [];
		var pageNum = this.state.page;
		if(pageNum != 1) {
			paginationBar.push(
				<Pagination.First onClick={(e) => {this.generateNewPage(e, 1)}}/>
			)
			// paginationBar.push(
				// <Pagination.Prev onClick={(e) => {this.generateNewPage(e, pageNum - 1)}}/>
			// )
            if(pageNum != 2){
                paginationBar.push(
                    <Pagination.Item onClick={(e) => {this.generateNewPage(e, pageNum-2)}}>{pageNum-2}</Pagination.Item>
                )
            }
            paginationBar.push(
            <Pagination.Item onClick={(e) => {this.generateNewPage(e, pageNum-1)}}>{pageNum-1}</Pagination.Item>
            )
		}
		paginationBar.push(
			<Pagination.Item active onClick={(e) => {this.generateNewPage(e, pageNum)}}>{pageNum}</Pagination.Item>
		)
		if(pageNum != this.state.lastPageNum) {
            paginationBar.push(
                <Pagination.Item onClick={(e) => {this.generateNewPage(e, pageNum+1)}}>{pageNum+1}</Pagination.Item>
            )
			if(pageNum != this.state.lastPageNum - 1){
                paginationBar.push(
                    <Pagination.Item onClick={(e) => {this.generateNewPage(e, pageNum+2)}}>{pageNum+2}</Pagination.Item>
                )
            }
            // paginationBar.push(
				// <Pagination.Next onClick={(e) => {this.generateNewPage(e, pageNum + 1)}}/>
			// )
			paginationBar.push(
				<Pagination.Last onClick={(e) => {this.generateNewPage(e, this.state.lastPageNum)}}/>
			)
		}
		return paginationBar;
	}

	fillanimalList(pageNum) {
		fetch(
          "https://api.parkprotection.me/api/animals?results_per_page=9&page=".concat(this.state.page))
          .then((response) => response.json())
          .then((data) => {
              console.log('FETCHED PLANTS');
              let animalList = [];
              for (const i in data.objects) {
              	const animalParsed = {
              		id : data.objects[i].id,
              		image : data.objects[i].image.replace("http://", "https://"),
              		com_name : data.objects[i].com_name,
              		sci_name : data.objects[i].sci_name,
              		tax_group : data.objects[i].tax_group,
              		status : data.objects[i].status,
              		states : data.objects[i].states.map((state) => state.name).join(", "),
              	}
              	console.log(animalParsed.image)
                animalList.push(animalParsed)
              }
              this.setState({ animalList : animalList});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
              this.setState({ animalList : []});
          });
	}

    handleKeyPress(key) {
        if (key.charCode == 13) {
            key.preventDefault();
            window.location.href = ("Animals/search/" + String(this.state.inputNode))
        }
    }

	render() {
		return (
			<Container>
				<br/>
				<Row>
				<Col><h1 className="PageHeader">Animals</h1><br/></Col>
				<Col xs={{span: 3}}>
					<Form inline>
                        <Form.Group as={Row}>
                            <FormControl id="searchBox" type="text" placeholder={"Search Animals"} className="mr-sm-2"
                               onChange={node => this.setState({inputNode: node.target.value})}
                                onKeyPress={key => {this.handleKeyPress(key)}}
                            />
                            <Button id="searchButton"
                                href={("Animals/search/" + String(this.state.inputNode))}
                            >Search</Button>
                        </Form.Group>
					</Form>
				</Col>
				</Row>

				<Row>
					<Col>
						<Common />
					</Col>
					<Col>
						<Scientific />
					</Col>
					<Col>
						<Groups />
					</Col>
					<Col>
						<Statuses />
					</Col>
					<Col>
						<States />
					</Col>
				</Row>

				{this.makeCardDeck()}
                <br></br>
				<Pagination className = 'justify-content-center'>
					{this.createPaginationBar()}
				</Pagination>
			</Container>
		);
	}
}

export default Animals;
