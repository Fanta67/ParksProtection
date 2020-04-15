import React from 'react';
import PropTypes from 'prop-types';
import map from '../Assets/Maps/CaliforniaNevada.png';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Constants from './Constants.js';
import InstanceHeader from './InstanceHeader.js'
import InformationTable from './InformationTable.js'
import RelatedEntities from './RelatedEntities.js'
import MapWrapper from '../Assets/Maps/MapWrapper';

// TODO: CONSTRUCTOR AND STUFF
class PlantInstance extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      plant: {},
      states: []
    }
  }
  async componentDidMount()
  {

    // let's do a fetch request for the id
    let plant_id = this.props.match.params.id;
    let url = "https://api.parkprotection.me/api/plants/".concat(this.props.match.params.id);
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    if(typeof data.states == "undefined") {
      window.location.href = "/error_instance_not_found"
    } else {
      let state_list = data.states.map(function(e) {
        return e.name
      });
      let plant = data;
      this.setState({ plant: plant, states: state_list });
      fetch(
         'https://api.parkprotection.me/api/parks?q={"filters":[{"name":"states__name","op":"any","val":"'.concat(data.states[0].name).concat('"}]}')
         )
       .then((response) => response.json())
       .then((parksData) => {
         this.setState({
             rl1_code : parksData.objects[0].code,
             rl1_name : parksData.objects[0].name,
             rl1_images : parksData.objects[0].images.split(" "),

             rl2_code : parksData.objects[1].code,
             rl2_name : parksData.objects[1].name,
             rl2_images : parksData.objects[1].images.split(" "),
         })
       });

       fetch(
         'https://api.parkprotection.me/api/animals?q={"filters":[{"name":"states__name","op":"any","val":"'.concat(data.states[0].name).concat('"}]}')
         )
       .then((response) => response.json())
       .then((animalsData) => {
         this.setState({
           rl3_id: animalsData.objects[0].id,
           rl3_img: animalsData.objects[0].image.replace("http://", "https://"),
           rl3_title: animalsData.objects[0].com_name,

           rl4_id: animalsData.objects[1].id,
           rl4_img: animalsData.objects[1].image.replace("http://", "https://"),
           rl4_title: animalsData.objects[1].com_name,
         })
       });
   }

  }

  render() {
    return (
  		<div>
        <InstanceHeader common_name={this.state.plant.com_name} scientific_name={this.state.plant.sci_name}/>

  			<br/><br/>
  			<Container>
  				<Row>
  					<Col>
  						<Constants.ImageBox className="float-right" src={this.state.plant.image}/>
  					</Col>
                    <Col>
                        <MapWrapper key={1} states={this.state.states} />
                    </Col>

  				</Row>

  				<br/><br/>
  				<Constants.EndangeredBox>
  					<Constants.EndangeredText>{this.state.plant.status}</Constants.EndangeredText>
  				</Constants.EndangeredBox>

  				<br/><br/>
          <Row>
            <Col>
              {this.state.plant.des}
            </Col>
            <Col>
  				    <InformationTable info = {this.state.plant}/>
            </Col>
          </Row>

					<br/><br/>
					<RelatedEntities info = {this.state}/>

  				<br/>

  				&nbsp;
  			</Container>

  		</div>
  	);
  }
}

PlantInstance.propTypes = {
  family: PropTypes.string,
  family_common_name: PropTypes.string,
  category: PropTypes.string,
  duration: PropTypes.string,
  growth_habit: PropTypes.string,
  toxicity: PropTypes.string
};

export default PlantInstance;
