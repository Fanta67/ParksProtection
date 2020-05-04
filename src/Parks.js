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
  { value: 1, val: 'asc', label: 'Names Ascending', sortby: 'name'},
  { value: 2, val: 'desc', label: 'Names Descending', sortby: 'name'},
  { value: 7, val: 'asc', label: 'Designation Ascending', sortby: 'designation'},
  { value: 8, val: 'desc', label: 'Designation Descending', sortby: 'designation'},
  { value: 3, val: 'asc', label: 'Emails Ascending', sortby: 'email'},
  { value: 4, val: 'desc', label: 'Emails Descending', sortby: 'email'},
  { value: 5, val: 'asc', label: 'Phone Numbers Ascending', sortby: 'phone'},
  { value: 6, val: 'desc', label: 'Phone Numbers Descending', sortby: 'phone'},
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
    {value : 'ME', label : 'ME'},
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
      fetched: false,
	    page: 1,
	    lastPageNum: 1
		};
        this.SortSelectHandler = this.SortSelectHandler.bind(this);
        this.FilterStateHandler = this.FilterStateHandler.bind(this);
        this.dir = 'asc';
        this.sort_by = 'name';
        this.states = [];
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
		this.fillParkList(pageNum)
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

    filterString(){
        if(this.states == null || this.states.length == 0){
            return "";
		}
		//let filter = ",%22filters%22:%5B%7B%%22or%22:%5B%7B%%22name%22:%22states__name%22,%22op%22:%22any%22,%22val%22:%22FL%22%7D,%7B%22name%22:%22states__name%22,%22op%22:%22any%22,%22val%22:%22AL%22%7D%5D%7D,%20%7B%22or%22:%20%5B%7B%22name%22:%22status%22,%22op%22:%22eq%22,%22val%22:%22Endangered%22%7D%5D";
		let filter = ",%22filters%22:%5B";

		if(this.states != null && this.states.length != 0){
            filter = filter.concat("%7B%22or%22:%5B");
            for(const s of this.states){
                filter = filter.concat("%7B%22name%22:%22states__name%22,%22op%22:%22any%22,%22val%22:%22".concat(s.value).concat("%22%7D,"));
            }
            filter = filter.substring(0,filter.length - 1);
            filter = filter.concat("%5D%7D");
        }
        filter = filter.concat("%5D");
        return filter;
	}

	fillParkList(pageNum) {
        let dir = this.dir;
        let sortby = this.sort_by;
        let filters = this.filterString();
        let url = 'https://api.parkprotection.me/api/parks?results_per_page=9&page='.concat(pageNum).concat('&q=%7B%22order_by%22:%5B%7B%22field%22:%22').concat(sortby).concat("%22,%22direction%22:%22").concat(dir).concat("%22%7D%5D");
        url = url.concat(filters).concat("%7D");
		fetch(url)
          .then((response) => response.json())
          .then((data) => {
              console.log('FETCHED PARKS');
              let p = data.total_pages;
              this.setState({lastPageNum : p == 0 ? 1 : p });
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
              this.setState({ fetched: true, parkList : parkList});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
              this.setState({ fetched: true, parkList : []});
          });
	}

    SortSelectHandler(Dir){
        this.dir = Dir.val;
        this.sort_by = Dir.sortby;
        this.setState({page : 1});
        this.fillParkList(1);
        this.forceUpdate();
	}
    FilterStateHandler(obj){
        this.states = obj;
        this.setState({page : 1});
        this.fillParkList(1);
        this.forceUpdate();
    }
    SortSelect() {
      return <Select options={sorts} placeholder="Sort By" onChange ={
          this.SortSelectHandler
      }/>
	}

    States(){
      return <Select options={states} isMulti className="basic-multi-select" placeholder="States" onChange ={
          this.FilterStateHandler
      }/>;
	}

    handleKeyPress(key) {
        if (key.charCode == 13) {
            key.preventDefault();
            window.location.href = ("Parks/search/" + String(this.state.inputNode))
        }
    }

	render() {
    if(this.state.fetched && this.state.parkList.length == 0) {
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
              {this.SortSelect()}
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
				<Col><h1 className="PageHeader">Parks</h1><br/></Col>
				<Col xs={{span: 3}}>
					<Form inline>
                        <Form.Group as={Row}>
                            <FormControl id="searchBox" type="text" placeholder={"Search Parks"} className="mr-sm-2"
                               onChange={node => this.setState({inputNode: node.target.value})}
                                onKeyPress={key => {this.handleKeyPress(key)}}
                            />
                            <Button id="searchButton"
                                href={("/Parks/search/" + String(this.state.inputNode))}
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

export default Parks;
