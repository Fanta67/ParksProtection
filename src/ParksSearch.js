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

const BoldText = styled('div')`
	font-size: 21px;
	font-weight: bold;
`

const Text = styled('span')`
	color: black;
	font-size: 16px;
`

class ParksSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			parkList: [],
			fetched: false,
			num_results: 0,
			page: 1,
			lastPageNum: 1
		};
	}

	componentDidMount() {
        let url = String(window.location.href).split('/');
		this.fillparkList(url[url.length-1])
    }

	makeCardDeck() {
		let parkDeck = [];
		var deckSize = this.state.parkList.length;
		var i = 0;
		var j = 0;
		var offset = (this.state.page - 1) * 9;

		for(; i < 3; ++i) {
			let parkInstances = [];
			for(j = 0; (j < 3); ++j) {
                if(!((offset + i * 3 + j) < deckSize))
                    break;
				var index = i * 3 + j;
                var source = this.state.parkList[offset + index];
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

	generateNewPage(event, pageNum) {
		this.setState({page: pageNum})
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
              this.setState({ fetched: true, parkList : parkList, num_results: data.num_results, lastPageNum: data.num_results == 0 ? 1 : Math.floor(data.num_results/9) + (data.num_results % 9 == 0 ? 0 : 1)});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
              this.setState({ fetched: true, parkList : [], num_results: 0});
          });
	}

    handleKeyPress(key) {
        if (key.charCode == 13) {
            key.preventDefault();
            window.location.href = ("/Parks/search/" + String(this.state.inputNode))
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
                            <FormControl className="searchBox" id="searchBox" type="text" placeholder={"Search Parks"} className="mr-sm-2"
                               onChange={node => this.setState({inputNode: node.target.value})}
                                onKeyPress={key => {this.handleKeyPress(key)}}
                            />
                            <Button className="searchButton" id="searchButton"
                                href={(String(this.state.inputNode))}
                            >Search</Button>
                        </Form.Group>
					</Form>
				</Col>
                </Row>

                {(this.state.fetched && this.state.num_results == 0) &&
					<h4>No Results</h4>
				}
				{this.makeCardDeck()}

				<br></br>
				{(this.state.fetched && this.state.num_results != 0) &&
				<Pagination className = 'justify-content-center'>
					{this.createPaginationBar()}
				</Pagination>
				}
			</Container>
		);
	}
}

export default ParksSearch;
