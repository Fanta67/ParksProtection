import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import roman from './Assets/img/headshots/roman.jpeg'
import dylan from './Assets/img/headshots/dylan.jpg'
import ameya from './Assets/img/headshots/ameya.jpeg'
import skylore from './Assets/img/headshots/skylore.jpeg'
import jordan from './Assets/img/headshots/jordan.jpg'
import pedro from './Assets/img/headshots/pedro.jpeg'



class GitlabTable extends React.Component{

  constructor(props) {
      super(props);
      this.testVarible= "this is a test";
      this.total_commits = 0;
      this.total_issues = 0;
      this.team = [{
        name: 'Roman Kuhn',
        commits: 0,
        title: 'Searching, About Page, Instance Pages, Technical Report, User Stories, UML Diagram',
        issues: 0,
        tests: 0,
        desc: 'Rumored to have never lost a match in Super Smash Brothers Melee.'
        },
        {
          name: 'Ameya Joshi',
          title: 'Model Pages, Instance Pages, Searching, Scraping, API, Postman, SQL, Python tests, AWS, Docker, Technical Report',
          commits: 0,
          issues: 0,
          tests: 62,
          desc: 'A hardcore FPS and Minecraft G A M E R who came to UT to be a game dev, realized how bad the hours were, and is now apparently doing web dev.'
        },
        {
          name: 'Dylan Kan',
          title: 'Docker, Wiki Parsing, Filtering/Sorting, Mocha',
          commits: 0,
          issues: 0,
          tests: 12,
          desc: 'I can\'t remember the last time I woke up early enough to eat breakfast.'
        },
        {
          name: 'Skylore Evans',
          title: 'Searching, Instance Pages Design, Models Pages, Selenium Tests, Card Generatino, Postman Parsing, Pagination, CI File',
          commits: 0,
          issues: 0,
          tests: 11,
          desc: 'Third year CS major. President of Anime Club. Weeb. Chronically tired. Code janitor.'
        },
        {
          name: 'Jordan Bogaards',
          title: 'Searching, Instance Pages Design, Models Pages, Selenium Tests, Card Generatino, Postman Parsing, Pagination',
          commits: 0,
          issues: 0,
          tests: 11,
          desc: 'Junior in the CS major and just on the edge of being a competitive smash player. Incineroar and Cloud main, unfortunately. Wanted to be a wrestling Heel.'
        },
        {
          name: 'Pedro Silva',
          title: 'Managing Data on Instance Pages, Filtering/Sorting for Model Pages',
          commits: 0,
          issues: 0,
          tests: 0,
          desc: 'Took Roman\'s title for Smash Ultimate.'
          },
      ];
      this.total_tests = this.team.map((dict) => dict.tests).reduce((total, num) => total + num);
  }


  componentDidMount() {
      let nameDict = {
        'Roman Kuhn': 0,
        'Ameya Joshi': 1,
        'Dylan Kan': 2,
        'Poisonthorns': 3,
        'Jordan Bogaards': 4,
        'bogaards.jordan': 4,
        'Pedro_Silva0111': 5,
        'Pedro Silva': 5
      }

      fetch(
          'https://gitlab.com/api/v4/projects/16967791/repository/contributors'
      )
          .then((response) => response.json())
          .then((data) => {
              console.log('TOTAL PEOPLE');
              console.log(data.length);
              this.total_commits = 0
              for (const i in data) {
                  const commit_data = data[i];
                  var name = commit_data.name;
                  // console.log("Commit Author name:" + nameDict[name]);
                  this.team[nameDict[name]].commits += commit_data.commits;
                  this.total_commits += commit_data.commits;
              }
              this.setState({ testVariable : 'changed'});
          })
          .catch((e) => {
              console.log('Error');
              console.log(e);
          });

      let usernames = {
        "thekuhninator": 0,
        "MCGenius25": 1,
        "Fanta67": 2,
        "poisonthorns": 3,
        "bogaards.jordan": 4,
        "Pedro_Silva0111": 5
        };

      for (const [username, id] of Object.entries(usernames)) {
        fetch(
          'https://gitlab.com/api/v4/projects/16967791/issues_statistics?author_username=' + username
        )   .then((response) => response.json())
            .then((data) => {
              console.log(username)
              this.total_issues += data.statistics.counts.all;
              this.team[id].issues += data.statistics.counts.all;
              this.setState({ testVariable : 'changed'});

            })
              .catch((e) => {
                  console.log('Error');
                  console.log(e);
              });
      }


  }



  render() {
      return (
        <Container>
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src={roman} />
                    <Card.Body>
                        <Card.Title> {this.team[0].name} </Card.Title>
                        <Card.Text>{this.team[0].title}</Card.Text>
                        <Card.Text>
                            {this.team[0].desc}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <div text-align="center">
                    <p horizontal-align="middle"> Commits: {this.team[0].commits} | Issues: {this.team[0].issues} | Unit Tests: {this.team[0].tests} </p>
                    </div>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src={ameya} />
                    <Card.Body>
                        <Card.Title> {this.team[1].name} </Card.Title>
                        <Card.Text>{this.team[1].title}</Card.Text>
                        <Card.Text>
                            {this.team[1].desc}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <p horizontal-align="middle"> Commits: {this.team[1].commits} | Issues: {this.team[1].issues} | Unit Tests: {this.team[1].tests} </p>
                    </Card.Footer>
                </Card>
                <Card>
                  <Card.Img variant="top" src={dylan} />
                  <Card.Body>
                    <Card.Title> {this.team[2].name} </Card.Title>
                    <Card.Text>{this.team[2].title}</Card.Text>
                    <Card.Text>
                      {this.team[2].desc}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                  <p horizontal-align="middle"> Commits: {this.team[2].commits} | Issues: {this.team[2].issues} | Unit Tests: {this.team[2].tests} </p>
                  </Card.Footer>
                </Card>
                </CardDeck>
                <br />

                <CardDeck>
                    <Card>
                        <Card.Img variant="top" src={skylore} />
                        <Card.Body>
                            <Card.Title> {this.team[3].name} </Card.Title>
                            <Card.Text>{this.team[3].title}</Card.Text>
                            <Card.Text>
                                {this.team[3].desc}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <p horizontal-align="middle"> Commits: {this.team[3].commits} | Issues: {this.team[3].issues} | Unit Tests: {this.team[3].tests} </p>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={jordan} />
                        <Card.Body>
                            <Card.Title> {this.team[4].name} </Card.Title>
                            <Card.Text>{this.team[4].title}</Card.Text>
                            <Card.Text>
                                {this.team[4].desc}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <p horizontal-align="middle"> Commits: {this.team[4].commits} | Issues: {this.team[4].issues} | Unit Tests: {this.team[4].tests} </p>
                        </Card.Footer>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={pedro} />
                        <Card.Body>
                            <Card.Title> {this.team[5].name} </Card.Title>
                            <Card.Text>{this.team[5].title}</Card.Text>
                            <Card.Text>
                                {this.team[5].desc}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <p horizontal-align="middle"> Commits: {this.team[5].commits} | Issues: {this.team[5].issues} | Unit Tests: {this.team[5].tests} </p>
                        </Card.Footer>
                    </Card>
            </CardDeck>

            <br/><br/>
            <h1>Repository Stats</h1>
                <Row>
                    <Col> <h2> {this.total_commits} Commits </h2> </Col>
                    <Col> <h2> {this.total_issues} Issues </h2> </Col>
                    <Col> <h2> {this.total_tests} Unit Tests </h2> </Col>
                </Row>
        </Container>

        );
    }


}

export default GitlabTable;
