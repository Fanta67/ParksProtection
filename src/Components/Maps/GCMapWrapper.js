import React, {Component} from 'react';
import { Map, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react';
import PropTypes from 'prop-types';

const containerStyle = {
	position: 'relative',
	width: '100%',
 	height: '400px'
}

class GCMapWrapper extends Component {
	render() {

		return (
			<div>
				<Map google={this.props.google}
					containerStyle={containerStyle}
					zoom={6}
					initialCenter={{lat: this.props.latitude, lng: this.props.longitude}}
					center={{lat: this.props.latitude, lng: this.props.longitude}}>
					<Marker
						position={{lat: this.props.latitude, lng: this.props.longitude}}
					/>
				</Map>
			</div>
		);
	}
}

// proptypes
GCMapWrapper.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number
};

export default GoogleApiWrapper({
	apiKey: (process.env.REACT_APP_MAPS_KEY)
})(GCMapWrapper);
