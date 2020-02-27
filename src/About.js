import React, {Component} from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GitlabTable from './GitlabTable.js'

import roman from './Assets/img/headshots/roman.jpeg'
import dylan from './Assets/img/headshots/dylan.jpg'
import ameya from './Assets/img/headshots/ameya.jpeg'
import skylore from './Assets/img/headshots/skylore.jpeg'
import jordan from './Assets/img/headshots/jordan.jpg'
import pedro from './Assets/img/headshots/pedro.jpeg'

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

            <AboutTitle> About Us</AboutTitle>
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
			                <p> Data was collected from the <a href="https://www.nps.gov/subjects/digital/nps-data-api.htm">National Park Services</a>,
			                the <a href="https://ecos.fws.gov/ecp/report/ad-hoc-documentation?catalogId=species&reportId=species">Environmental 
			                Conservation Online System</a>, 
			                and the <a href="https://data.nal.usda.gov/dataset/usda-plants-database-api-r">United States Department of Agriculture</a>.
			                </p>
			            </Container>

						<br/>
						<Container>
							<h1> Tools </h1>

							<CardDeck>
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
