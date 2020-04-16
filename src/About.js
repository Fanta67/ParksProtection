import React, {Component} from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import GitlabTable from './GitlabTable.js'
import Row from 'react-bootstrap/Row';


const AboutTitle = styled('h1')`
color: black; font-family: 'Raleway',sans-serif; font-size: 62px; font-weight: 800; line-height: 72px; margin: 0 0 24px; text-align: center; text-transform: uppercase;
`

const Paragraph = styled('p')`
	color: black; font-family: 'Raleway',sans-serif; font-size: 18px; font-weight: 500; line-height: 32px; margin: 0 0 24px;
`

const AboutBox = styled('div')`
	text-align: left;
	width: 35%;
  margin: auto;
  margin-top: 10%;
  background-color: white;
  border-radius: 0%;
  font-size: 150%;
`;

const MembersBox = styled('div')`
  text-align: left;
  width: 75%;
  margin: auto;
  margin-top: 10%;
  background-color: white;
  border-radius: 0%;
  font-size: 150%;
`;

class About extends React.Component{
  render() {
      return (
        <Container>
            <Container>
            <br></br>

            <AboutTitle className='PageHeader'> About Us</AboutTitle>
            <br></br>
            <Paragraph > Many species are dying out in recent years, whether
            it be due to global warming or other environmental factors. This website
            helps those who want to witness or take action in preservation efforts
            locate the appropriate help centers. Our website grabs data on endangered
            animal and plant species and groups them with national park centers based
            on location in hopes to spread awareness of what states may have efforts
            already in place for preservation and to identify places to observe these
            species in their natural habitat. </ Paragraph>

            <br/><br/>
            </Container>
						<GitlabTable />

			            <br/><br/>
			            <Container>
			                <h1> Data Sources </h1>
			                <p> Data was collected for parks from the <a href="https://www.nps.gov/subjects/digital/nps-data-api.htm">National Park Services</a>,
			                for animals from the <a href="https://ecos.fws.gov/ecp/report/ad-hoc-documentation?catalogId=species&reportId=species">Environmental
			                Conservation Online System</a>,
			                and for plants from the <a href="https://data.nal.usda.gov/dataset/usda-plants-database-api-r">United States Department of Agriculture</a>. Images
			                and descriptions for plants and animals were collected using the <a href="https://azure.microsoft.com/en-us/services/cognitive-services/bing-image-search-api/">
			                Bing Image Search API</a> and the <a href="https://www.mediawiki.org/wiki/API:Main_page">Wikipedia API</a>.
			                </p>
			            </Container>

						<br/>
						<Container>
							<h1> Tools </h1>

							<CardDeck>
								<Row>
									<Card>
											<Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/AWS_Simple_Icons_AWS_Cloud.svg/1280px-AWS_Simple_Icons_AWS_Cloud.svg.png" />
											<Card.Body>
													<Card.Title> AWS </Card.Title>
													<Card.Text>
															Amazon Web Services (AWS) is a platform that allows us to host our website.
													</Card.Text>
											</Card.Body>
									</Card>
									<Card>
											<Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" />
											<Card.Body>
													<Card.Title> React Bootstrap</Card.Title>
													<Card.Text>
															React Bootstrap is a front-end tool that allows us to create nice web pages.
													</Card.Text>
											</Card.Body>
									</Card>

									<Card>
											<Card.Img variant="top" src="https://img.stackshare.io/service/1336/xWMRvm_5_400x400.png" />
											<Card.Body>
													<Card.Title> Postman </Card.Title>
													<Card.Text>
															Postman is a tool that generates useful API for our functions.
													</Card.Text>
											</Card.Body>
									</Card>
									</Row>
									<Row>
									<Card>
											<Card.Img variant="top" src="https://miro.medium.com/max/800/1*Q5EUk28Xc3iCDoMSkrd1_w.png" />
											<Card.Body>
													<Card.Title> Flask </Card.Title>
													<Card.Text>
															Flask is a microframework used for the backend of a web application.
													</Card.Text>
											</Card.Body>
									</Card>
									<Card>
											<Card.Img variant="top" src="https://avatars2.githubusercontent.com/u/8770005?s=400&v=4" />
											<Card.Body>
													<Card.Title> Mocha </Card.Title>
													<Card.Text>
															Mocha is a Javascript test framework used for making asynchronous testing simple and fun.
													</Card.Text>
											</Card.Body>
									</Card>
									<Card>
											<Card.Img variant="top" src="https://www.selenium.dev/images/selenium_logo_square_green.png" />
											<Card.Body>
													<Card.Title> Selenium </Card.Title>
													<Card.Text>
															Selenium is a tool used for automating tests for web applications.
													</Card.Text>
											</Card.Body>
									</Card>
									</Row>
					</CardDeck>

					<br/><br/>
					<h1>Optional Tools</h1>
					<p><a href="https://react-select.com/home">React Select</a> - Used for filter/sort dropdowns on models pages because React Bootstrap doesn't
					natively support multi-select in dropdowns.</p>
					<p><a href="https://github.com/fullstackreact/google-maps-react">Google Maps React</a> - Used for Google maps for park locations.</p>
					<p><a href="https://styled-components.com/">Styled Components</a> - Used for simple styling in components, like centering text inside a column.</p>

					<br/>
					<h1>Documentation</h1>
		            <p><a href="https://gitlab.com/thekuhninator/parks_protection"> Gitlab Repository </a></p>
		            <p><a href="https://documenter.getpostman.com/view/10458674/SzKYQcpT?version=latest">Postman API</a></p>
		            &nbsp;
		            </Container>
        </Container>

        );
    }

}

export default About;
