import React, {Component} from 'react';
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

const sorts = [
	{ value : 1, val: 'asc', label: 'Common Name Ascending', sortby: 'com_name'},
	{ value : 2, val: 'desc', label: 'Common Name Descending', sortby: 'com_name'},
	{ value : 3, val: 'asc', label: 'Scientific Name Ascending', sortby: 'sci_name'},
	{ value : 4, val: 'desc', label: 'Scientific Name Descending', sortby: 'sci_name'}
  ]

const groups = [
  { value: 'Birds', label: 'Birds' },
  { value: 'Reptiles', label: 'Reptiles' },
  { value: 'Mammals', label: 'Mammals' },
  { value: 'Fishes', label: 'Fishes' },
  { value: 'Crustaceans', label: 'Crustaceans' },
  { value: 'Clams', label: 'Clams' },
  { value: 'Insects', label: 'Insects' },
  { value: 'Snails', label: 'Snails' },
  { value: 'Amphibians', label: 'Amphibians' },
  { value: 'Arachnids', label: 'Arachnids' }
]

const statuses = [
	{ value: 'Threatened', label: 'Threatened', status: true },
	{ value: 'Endangered', label: 'Endangered', status: true },
	{ value: 'Recovery', label: 'Recovery', status: true}
  ]

  const states = [
	  {value : 'AL', label : 'AL'},
	  {value : 'AR', label : 'AR'},
	  {value : 'AZ', label : 'AZ'},
	  {value : 'CA', label : 'CA'},
	  {value : 'CO', label : 'CO'},
	  {value : 'CT', label : 'CT'},
	  {value : 'DE', label : 'DE'},
	  {value : 'FL', label : 'FL'},
	  {value : 'GA', label : 'GA'},
	  {value : 'IA', label : 'IA'},
	  {value : 'ID', label : 'ID'},
	  {value : 'IL', label : 'IL'},
	  {value : 'IN', label : 'IN'},
	  {value : 'KS', label : 'KS'},
	  {value : 'KY', label : 'KY'},
	  {value : 'LA', label : 'LA'},
	  {value : 'MA', label : 'MA'},
	  {value : 'MD', label : 'MD'},
	  {value : 'ME', label : 'MD'},
	  {value : 'MI', label : 'MI'},
	  {value : 'MN', label : 'MN'},
	  {value : 'MO', label : 'MO'},
	  {value : 'MS', label : 'MS'},
	  {value : 'MT', label : 'MT'},
	  {value : 'NC', label : 'NC'},
	  {value : 'ND', label : 'ND'},
	  {value : 'NE', label : 'NE'},
	  {value : 'NH', label : 'NH'},
	  {value : 'NJ', label : 'NJ'},
	  {value : 'NM', label : 'NM'},
	  {value : 'NV', label : 'NV'},
	  {value : 'NY', label : 'NY'},
	  {value : 'OH', label : 'OH'},
	  {value : 'OK', label : 'OK'},
	  {value : 'OR', label : 'OR'},
	  {value : 'PA', label : 'PA'},
	  {value : 'RI', label : 'RI'},
	  {value : 'SC', label : 'SC'},
	  {value : 'SD', label : 'SD'},
	  {value : 'TN', label : 'TN'},
	  {value : 'TX', label : 'TX'},
	  {value : 'UT', label : 'UT'},
	  {value : 'VA', label : 'VA'},
	  {value : 'VI', label : 'VI'},
	  {value : 'VT', label : 'VT'},
	  {value : 'WA', label : 'WA'},
	  {value : 'WI', label : 'WI'},
	  {value : 'WV', label : 'WV'},
	  {value : 'WY', label : 'WY'},
  ]

const ItalicText = styled('div')`
	font-style: italic;
`

const BoldText = styled('div')`
	font-size: 21px;
	font-weight: bold;
`

const Text = styled('span')`
	color: black;
	font-size: 16px;
`

class Animals extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animalList: [],
			fetched: false,
	        page: 1,
	        lastPageNum: 1
		};
		this.SortSelectHandler = this.SortSelectHandler.bind(this);
        this.FilterStateHandler = this.FilterStateHandler.bind(this);
		this.FilterStatusHandler = this.FilterStatusHandler.bind(this);
		this.FilterGroupHandler = this.FilterGroupHandler.bind(this);
        this.dir = 'asc';
        this.sort_by = 'com_name';
        this.states = [];
		this.statuses = [];
		this.groups = [];
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
							    <Card.Img variant="top" src={source.image}/><br/>
					    		<BoldText>{source.com_name}</BoldText>
					    		<ItalicText>{source.sci_name}</ItalicText>
					    		{source.tax_group}<br/>
						    	{source.status}<br/>
						    	{source.states}
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
		this.fillanimalList(pageNum)
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

    filterString(){
        if((this.states == null || this.states.length == 0) && (this.statuses == null || this.statuses.length == 0) && (this.groups == null || this.groups.length == null)){
            return "";
		}

		let filter = ",%22filters%22:%5B";

		if(this.states != null && this.states.length != 0){
            filter = filter.concat("%7B%22or%22:%5B");
            for(const s of this.states){
                filter = filter.concat("%7B%22name%22:%22states__name%22,%22op%22:%22any%22,%22val%22:%22".concat(s.value).concat("%22%7D,"));
            }
            filter = filter.substring(0,filter.length - 1);
            filter = filter.concat("%5D%7D");
        }
        if(this.statuses != null && this.statuses.length != 0){
            if(this.states != null && this.states.length != 0){
                filter = filter.concat(",%7B%22or%22:%5B");
            }
            else{
                filter = filter.concat("%7B%22or%22:%5B");
            }
            for(const s of this.statuses){
                filter = filter.concat("%7B%22name%22:%22status%22,%22op%22:%22eq%22,%22val%22:%22".concat(s.value).concat("%22%7D,"));
            }
            filter = filter.substring(0,filter.length - 1);
            filter = filter.concat("%5D%7D");
		}
		if(this.groups != null && this.groups.length != 0){
			if((this.statuses != null && this.statuses.length != 0) || (this.states != null && this.states.length != 0)){
				filter = filter.concat(",%7B%22or%22:%5B");
			}
			else{
				filter = filter.concat("%7B%22or%22:%5B");
			}
			for(const s of this.groups){
				filter = filter.concat("%7B%22name%22:%22tax_group%22,%22op%22:%22eq%22,%22val%22:%22".concat(s.value).concat("%22%7D,"));
			}
			filter = filter.substring(0,filter.length - 1);
			filter = filter.concat("%5D%7D");
        }
        filter = filter.concat("%5D");
        return filter;
	}

	fillanimalList(pageNum) {
        let dir = this.dir;
        let sortby = this.sort_by;
		let filters = this.filterString();
        let url = 'https://api.parkprotection.me/api/animals?results_per_page=9&page='.concat(pageNum).concat('&q=%7B%22order_by%22:%5B%7B%22field%22:%22').concat(sortby).concat("%22,%22direction%22:%22").concat(dir).concat("%22%7D%5D");
		url = url.concat(filters).concat("%7D");
		console.log(url)
		fetch(url)
          .then((response) => response.json())
          .then((data) => {
              console.log('FETCHED ANIMALS');
			  let p = data.total_pages;
              this.setState({lastPageNum : p == 0 ? 1 : p });
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
              this.setState({ fetched: true, animalList : animalList});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
              this.setState({ fetched: true, animalList : []});
          });
	}

	SortSelectHandler(Dir){
        this.dir = Dir.val;
        this.sort_by = Dir.sortby;
		this.setState({page : 1});
        this.fillanimalList(1);
        this.forceUpdate();
	}

	FilterGroupHandler(obj){
		this.groups = obj;
		this.setState({page : 1});
        this.fillanimalList(1);
        this.forceUpdate();
	}

	FilterStateHandler(obj){
        this.states = obj;
		this.setState({page : 1});
        this.fillanimalList(1);
        this.forceUpdate();
    }
    FilterStatusHandler(obj){
        this.statuses = obj;
		this.setState({page : 1});
        this.fillanimalList(1);
        this.forceUpdate();
	}

	SortSelect() {
      return <Select options={sorts} placeholder="Sort By" onChange ={
          this.SortSelectHandler
      }/>
	}

	Groups(){
	  return <Select options={groups} isMulti className="basic-multi-select" placeholder="Groups" onChange ={
		  this.FilterGroupHandler
	  }/>;
	}

	States(){
      return <Select options={states} isMulti className="basic-multi-select" placeholder="States" onChange ={
          this.FilterStateHandler
      }/>;
	}

	Statuses(){
      return <Select options={statuses} isMulti className="basic-multi-select" placeholder="Listing Statuses" onChange = {
          this.FilterStatusHandler
      }/>;
	}

    handleKeyPress(key) {
        if (key.charCode == 13) {
            key.preventDefault();
            window.location.href = ("/Animals/search/" + String(this.state.inputNode))
        }
    }

	render() {
		if(this.state.fetched && this.state.animalList.length == 0) {
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
							{this.SortSelect()}
						</Col>
						<Col>
							{this.Groups()}
						</Col>
						<Col>
							{this.Statuses()}
						</Col>
						<Col>
							{this.States()}
						</Col>
					</Row>

					<br /><br />
					<h4>No Results</h4>

				</Container>
			);
		}

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
						{this.SortSelect()}
					</Col>
					<Col>
						{this.Groups()}
					</Col>
					<Col>
						{this.Statuses()}
					</Col>
					<Col>
						{this.States()}
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
