import React, {Component} from 'react';
import { Map, Marker, GoogleApiWrapper, Polygon } from 'google-maps-react';

const containerStyle = {
	position: 'relative',
	width: '100%',
 	height: '400px'
}

const state = [
	{ lat:70.0187, lng:-141.0205},
  { lat:70.1292, lng:-141.7291},
  { lat:70.4515, lng:-144.8163},
  { lat:70.7471, lng:-148.4583},
  { lat:70.7923, lng:-151.1609},
  { lat:71.1470, lng:-152.6221},
  { lat:71.1185, lng:-153.9954},
  { lat:71.4307, lng:-154.8853},
  { lat:71.5232, lng:-156.7529},
  { lat:71.2796, lng:-157.9449},
  { lat:71.2249, lng:-159.6313},
  { lat:70.6363, lng:-161.8671},
  { lat:70.0843, lng:-163.5809},
  { lat:69.3028, lng:-165.2399},
  { lat:69.1782, lng:-166.8768},
  { lat:68.3344, lng:-168.0414},
  { lat:67.6844, lng:-165.9155},
  { lat:67.2933, lng:-164.6082},
  { lat:66.7789, lng:-164.0149},
  { lat:66.5810, lng:-165.7507},
  { lat:66.2867, lng:-167.5745},
  { lat:66.0269, lng:-168.9862},
  { lat:65.4970, lng:-168.9478},
  { lat:65.0420, lng:-167.4756},
  { lat:64.3922, lng:-167.0142},
  { lat:64.0554, lng:-165.7343},
  { lat:64.0193, lng:-163.2294},
  { lat:63.9615, lng:-162.1143},
  { lat:63.6877, lng:-163.6029},
  { lat:63.4530, lng:-165.3717},
  { lat:62.4133, lng:-166.3715},
  { lat:61.6534, lng:-166.9867},
  { lat:60.8556, lng:-166.4429},
  { lat:60.5357, lng:-167.8381},
  { lat:59.5482, lng:-167.7118},
  { lat:59.4115, lng:-165.8002},
  { lat:59.3696, lng:-164.5972},
  { lat:59.1168, lng:-162.8558},
  { lat:58.1185, lng:-162.5427},
  { lat:58.1359, lng:-160.6421},
  { lat:58.0285, lng:-159.5050},
  { lat:57.6336, lng:-158.8953},
  { lat:56.9090, lng:-159.9060},
  { lat:56.3926, lng:-160.6531},
  { lat:56.2342, lng:-161.8835},
  { lat:55.7240, lng:-162.9822},
  { lat:55.2478, lng:-164.3994},
  { lat:54.7753, lng:-165.3168},
  { lat:54.1463, lng:-167.1075},
  { lat:53.5632, lng:-168.5852},
  { lat:53.1402, lng:-169.9146},
  { lat:52.5964, lng:-169.5959},
  { lat:52.9089, lng:-168.2227},
  { lat:54.2139, lng:-162.7734},
  { lat:54.6786, lng:-159.1452},
  { lat:55.6567, lng:-155.4634},
  { lat:57.3510, lng:-152.1400},
  { lat:59.2209, lng:-150.8203},
  { lat:59.7695, lng:-147.4461},
  { lat:60.3521, lng:-145.9850},
  { lat:59.8917, lng:-144.1544},
  { lat:59.8172, lng:-141.6811},
  { lat:59.5225, lng:-140.5124},
  { lat:59.0292, lng:-138.8548},
  { lat:57.9032, lng:-136.8526},
  { lat:56.9157, lng:-136.0725},
  { lat:56.1555, lng:-134.9794},
  { lat:55.3237, lng:-134.0057},
  { lat:54.6341, lng:-133.6418},
  { lat:54.7135, lng:-130.6261},
  { lat:55.2869, lng:-129.9930},
  { lat:55.9869, lng:-130.0108},
  { lat:56.1057, lng:-130.1083},
  { lat:56.6086, lng:-131.5887},
  { lat:57.8404, lng:-132.8755},
  { lat:58.7276, lng:-133.8423},
  { lat:59.3108, lng:-134.9121},
  { lat:59.8020, lng:-135.4724},
  { lat:59.6039, lng:-136.3445},
  { lat:59.1619, lng:-136.8251},
  { lat:59.2441, lng:-137.6079},
  { lat:60.0902, lng:-139.2119},
  { lat:60.3575, lng:-139.0938},
  { lat:60.1866, lng:-140.0056},
  { lat:60.3059, lng:-140.9999},
  { lat:70.0187, lng:-141.0205}
]

class ALMapWrapper extends Component {
	render() {
		return (
			<div>
				<Map google={this.props.google}
					containerStyle={containerStyle}
					zoom={4}
					initialCenter={{lat: 64.2008, lng: -149.4937}} >
					<Polygon
			          paths={state}
			          strokeColor="#0000FF"
			          strokeOpacity={0.8}
			          strokeWeight={2}
			          fillColor="#0000FF"
			          fillOpacity={0.35} />
							</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: ('AIzaSyAKUoq68SyMNAVtaOSLAgQRmPl8OlW54Ig')
})(ALMapWrapper);