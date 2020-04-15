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

const name = [
  { value: 'asc', label: 'Ascending' },
  { value: 'des', label: 'Descending' }
]

const Name = () => (
  <Select options={name} placeholder="Names" />
)

const email = [
  { value: 'asc', label: 'Ascending' },
  { value: 'des', label: 'Descending' }
]

const Email = () => (
  <Select options={email} placeholder="Emails" />
)

const phone = [
  { value: 'asc', label: 'Ascending' },
  { value: 'des', label: 'Descending' }
]

const Phone = () => (
  <Select options={phone} placeholder="Phone Numbers" />
)

const designations = [
  { value: 'national park', label: 'National Park' },
  { value: 'national preserve', label: 'National Preserve' }
]

const Designations = () => (
  <Select options={designations} isMulti className="basic-multi-select" placeholder="Designation" />
)

const states = [
	{ value: 'AZ', label: 'AZ' },
	{ value: 'TX', label: 'TX' }
]

const States = () => (
  <Select options={states} isMulti className="basic-multi-select" placeholder="States" />
)

const BoldText = styled('div')`
	font-size: 21px;
	font-weight: bold;
`

const Text = styled('span')`
	color: black;
	font-size: 16px;
`

class Parks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			parkList: [],
	        page: 1,
	        lastPageNum: 44
		};
	}

	componentDidMount() {
		this.fillParkList(1)
	}

	makeCardDeck(){

		let parkDeck = [];
		var deckSize = this.state.parkList.length;
		var i = 0;
		var j = 0;

		for(; i < 3; ++i) {
			let parkInstances = [];
			for(j = 0; (j < 3); ++j) {
                if(!((i * 3 + j) < deckSize))
                    break;
				var index = i * 3 + j;
                var source = this.state.parkList[index];
				parkInstances.push (
					<Card className={source.code} key={source.code}>
						<Nav.Link as={ Link } to={{pathname: "/Parks/" + source.code, state: {code: source.code}}}>
						    <Text>
							    <Card.Img variant="top" src={source.image}/><br/>
					    		<BoldText>{source.name}</BoldText>
					    		{source.designation}<br/>
					    		{source.email}<br/>
						    	{source.phone}<br/>
						    	{source.states}
							</Text>
				    	</Nav.Link>
				    </Card>
				)
			}
            parkDeck.push(<br key={"br"+i} />)
			parkDeck.push(<CardDeck key={"deck"+i} className="text-center">{parkInstances}</CardDeck>)
		}
		//var assert = require('assert');
		//assert(deckSize == 9);
		return parkDeck;
	}

	generateNewPage(event, pageNum) {
		this.state.page = pageNum;
		this.fillParkList(this.state.page)
		window.scrollTo(0, 0);
	}

	createPaginationBar = () => {
		let paginationBar = [];
		var pageNum = this.state.page;
		if(pageNum != 1) {
			paginationBar.push(
				<Pagination.First key="First" onClick={(e) => {this.generateNewPage(e, 1)}}/>
			)
			// paginationBar.push(
				// <Pagination.Prev onClick={(e) => {this.generateNewPage(e, pageNum - 1)}}/>
			// )
            if(pageNum != 2){
                paginationBar.push(
                    <Pagination.Item key={pageNum-2} onClick={(e) => {this.generateNewPage(e, pageNum-2)}}>{pageNum-2}</Pagination.Item>
                )
            }
            paginationBar.push(
            <Pagination.Item key={pageNum-1} onClick={(e) => {this.generateNewPage(e, pageNum-1)}}>{pageNum-1}</Pagination.Item>
            )
		}
		paginationBar.push(
			<Pagination.Item key={pageNum} active onClick={(e) => {this.generateNewPage(e, pageNum)}}>{pageNum}</Pagination.Item>
		)
		if(pageNum != this.state.lastPageNum) {
            paginationBar.push(
                <Pagination.Item key={pageNum+1} onClick={(e) => {this.generateNewPage(e, pageNum+1)}}>{pageNum+1}</Pagination.Item>
            )
			if(pageNum != this.state.lastPageNum - 1){
                paginationBar.push(
                    <Pagination.Item key={pageNum+2} onClick={(e) => {this.generateNewPage(e, pageNum+2)}}>{pageNum+2}</Pagination.Item>
                )
            }
            // paginationBar.push(
				// <Pagination.Next onClick={(e) => {this.generateNewPage(e, pageNum + 1)}}/>
			// )
			paginationBar.push(
				<Pagination.Last key="Last" onClick={(e) => {this.generateNewPage(e, this.state.lastPageNum)}}/>
			)
		}
        
		return paginationBar;
	}

	fillParkList(pageNum) {
		fetch(
          "https://api.parkprotection.me/api/parks?results_per_page=9&page=".concat(this.state.page)
      )
          .then((response) => response.json())
          .then((data) => {
              console.log('FETCHED PARKS');
              let parkList = [];
              for (const i in data.objects) {
              	const parkParsed = {
              		code : data.objects[i].code,
              		image : data.objects[i].images.split(" ")[0].replace("http://", "https://"),
              		name : data.objects[i].name,
              		designation : data.objects[i].designation,
              		email : data.objects[i].email,
              		phone : data.objects[i].phone,
              		states : data.objects[i].states.map((state) => state.name).join(", "),
              	}
                parkList.push(parkParsed)
              }
              this.setState({ parkList : parkList});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
              this.setState({ parkList : []});
          });
	}

    handleKeyPress(key) {
        if (key.charCode == 13) {
            key.preventDefault();
            window.location.href = ("Parks/search/" + String(this.state.inputNode))
        }
    }

	render() {
		return (
			<Container>
				<br/>
				<Row>
				<Col><h1 className="PageHeader">Parks</h1><br/></Col>
				<Col xs={{span: 3}}>
					<Form inline>
                        <Form.Group as={Row}>
                            <FormControl id="searchBox" type="text" placeholder={"Search Parks"} className="mr-sm-2"
                               onChange={node => this.setState({inputNode: node.target.value})}
                                onKeyPress={key => {this.handleKeyPress(key)}}
                            />
                            <Button id="searchButton"
                                href={("Parks/search/" + String(this.state.inputNode))}
                            >Search</Button>
                        </Form.Group>
					</Form>
				</Col>
				</Row>

				<Row>
					<Col>
						<Name />
					</Col>
					<Col>
						<Email />
					</Col>
					<Col>
						<Phone />
					</Col>
					<Col>
						<Designations />
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

export default Parks;
