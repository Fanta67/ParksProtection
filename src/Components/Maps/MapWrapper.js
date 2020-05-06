import React, {Component} from 'react';
import { Map, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react';
import PropTypes from 'prop-types';
import state_polygons from './state_polygons'

const containerStyle = {
	position: 'relative',
	width: '100%',
 	height: '400px'
}

class MapWrapper extends Component {

  makePolygons() {
    let polygons = [];
    console.log('PRINTING OUT PROPS')
    console.log(this.props)
    var num_states = this.props.states.length;

    for (var i = 0; i < num_states; ++i)
    {
      let state = this.props.states[i]

      if(state in state_polygons)
      {
        polygons.push(
          <Polygon
                paths={state_polygons[state]}
                strokeColor="#0000FF"
                strokeOpacity={0.8}
                strokeWeight={2}
                fillColor="#0000FF"
                fillOpacity={0.35} />
        );
      }
    }
    console.log(this.props.states)
    console.log(polygons)
    return polygons;
  }

	render() {
    //console.log('displaying the polygon here')
    //console.log('correct state')
    //console.log(this.props.states[0])
    //console.log(state_polygons[this.props.states[0]])


		return (
			<div>
				<Map google={this.props.google}
					containerStyle={containerStyle}
					zoom={3.5}
					initialCenter={{lat: 39.8283, lng: -98.5795}} >
		      {this.makePolygons()}
				</Map>
			</div>
		);
	}
}

MapWrapper.propTypes = {
  key: PropTypes.number,
  states: PropTypes.array
}

export default GoogleApiWrapper({
	apiKey: (process.env.REACT_APP_MAPS_KEY)
})(MapWrapper);
