import React, {Component} from 'react';
import './App.css';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from 'react-bootstrap/FormControl';

const sorts = [
  { value: 'asc', label: 'Common Name Ascending', sortby: 'com_name'},
  { value: 'desc', label: 'Common Name Descending', sortby: 'com_name'},
  { value: 'asc', label: 'Scientific Name Ascending', sortby: 'sci_name'},
  { value: 'des', label: 'Scientific Name Descending', sortby: 'sci_name'},
  { value: 'asc', label: 'Family Name Ascending', sortby: 'family'},
  { value: 'des', label: 'Family Name Descending', sortby: 'family'}
]

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

class Plants extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			plantList: [],
	        page: 1,
	        lastPageNum: 43
		};
        this.SortSelectHandler = this.SortSelectHandler.bind(this);
        this.dir = 'asc';
        this.sort_by = 'com_name';

	}
	componentDidMount() {
		this.fillplantList(1)
	}

	makeCardDeck(){

		let plantDeck = [];
		var deckSize = this.state.plantList.length;
		var i = 0;
		var j = 0;

		for(; i < 3; ++i) {
			let plantInstances = [];
			for(j = 0; (j < 3); ++j) {
                if(!((i * 3 + j) < deckSize))
                    break;
				var index = i * 3 + j;
                var source = this.state.plantList[index];
				plantInstances.push (
					<Card className={"p" + source.id}>
						<Nav.Link as={ Link } to={{pathname: "/Plants/" + source.id, state: {id: source.id}}}>
						    <Text>
							    <Card.Img variant="top" src={source.image}/>
							    <Card.Body>
							    	<Card.Title>{source.com_name}</Card.Title>
							    	<Card.Text><ItalicText>{source.sci_name}</ItalicText></Card.Text>
							    	<Card.Text>{source.family}</Card.Text>
							    	<Card.Text>{source.status}</Card.Text>
							    	<Card.Text>{source.states}</Card.Text>
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

	generateNewPage(event, pageNum) {
		this.state.page = pageNum;
		this.fillplantList(this.state.page)
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

	fillplantList(pageNum) {
        let dir = this.dir;
        let sortby = this.sort_by;

		fetch(
          'https://api.parkprotection.me/api/plants?results_per_page=9&q=%7B%22order_by%22:%5B%7B%22field%22:%22'.concat(sortby).concat("%22,%22direction%22:%22").concat(dir).concat("%22%7D%5D%7D&page=").concat(pageNum)
      )
          .then((response) => response.json())
          .then((data) => {
              console.log('FETCHED PLANTS');
              let plantList = [];
              for (const i in data.objects) {
              	const plantParsed = {
              		id : data.objects[i].id,
              		image : data.objects[i].image.replace("http://", "https://"),
              		com_name : data.objects[i].com_name,
              		sci_name : data.objects[i].sci_name,
              		family : data.objects[i].family_com,
              		status : data.objects[i].status,
              		states : data.objects[i].states.map((state) => state.name).join(", "),
              	}
              	console.log(plantParsed.image)
                plantList.push(plantParsed)
              }
              // var assert = require('assert');
                // assert(plantList == 9);
              this.setState({ plantList : plantList});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
              this.setState({ plantList : []});
          });
          this.render();
	}

    SortSelectHandler(Dir){
        this.dir = Dir.value;
        this.sort_by = Dir.sortby;
        this.fillplantList(this.state.page);
        this.forceUpdate();
    }
    SortSelect() {
      return <Select options={sorts} ref = "Dir" placeholder="Sort By" onChange ={
          this.SortSelectHandler
      }/>
    }

    handleKeyPress(key) {
        if (key.charCode == 13) {
            key.preventDefault();
            window.location.href = ("Plants/search/" + String(this.state.inputNode))
        }
    }

	render() {
		return (
			<Container>
				<br/>
				<Row>
				<Col><h1 className="PageHeader">Plants</h1><br/></Col>
				<Col xs={{span: 3}}>
					<Form inline>
                        <Form.Group as={Row}>
                            <FormControl id="searchBox" type="text" placeholder={"Search Plants"} className="mr-sm-2"
                               onChange={node => this.setState({inputNode: node.target.value})}
                                onKeyPress={key => {this.handleKeyPress(key)}}
                            />
                            <Button id="searchButton"
                                href={("Plants/search/" + String(this.state.inputNode))}
                            >Search</Button>
                        </Form.Group>
					</Form>
				</Col>
				</Row>

				<Row>
					<Col>
						{this.SortSelect()}
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

export default Plants;
