import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import {withFauxDOM} from 'react-faux-dom';
import ScatterPlot from './ScatterPlot';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import ParksPerStateBubble from './ParksPerStateBubble';
import TeamsPerCountryBubble from './TeamsPerCountryBubble';


class Charts extends React.Component
{

  constructor(props)
  {
    super(props)
    this.state = {
    }

  }

  componentWillMount()
  {
    // fetch data here...
    var bar_data = [{name: "A", value: 10}, {name: "B", value: 13}, {name: "C", value: 7}];
    // TODO:
    // ROMAN DO LINE CHART
    // var line_data = [ {date: "30-Jan-12", close: 30.3}, {date: "15-Feb-12", close: 70}, {date: "30-Apr-12", close: 63}, {date: "27-Apr-12", close: 30}, {date: "1-May-12", close: 58.13}];
    var scatter_data = [{Calories: 10, "Protein (g)": 10, Manufacturer: "Kellogs", "Cereal Name": "Kellogs Cereal"},{Calories: 5, "Protein (g)": 5, Manufacturer: "Quaker", "Cereal Name": "Quaker Cereal"}];
    var pie_data = []
    var bubble_data = []
    var bar_data2 = []

    // roman do parks per state, animals per group
    // dict: {name: "group", number: val}

    // # of players vs age # - line chart - Roman - api/Players - RomanLineChart.js and roman_chart.js
    var line_data = [];
    // # of plants vs # of animals (per state) - scatterplot - Roman - api/animals AND api/plants - Scatterplot.js OR RomanScatterPlot.js and roman_chart.js




    this.setState({
      bar_data: bar_data,
      line_data: line_data,
      scatter_data: scatter_data,
      pie_data: pie_data,
      bubble_data: bubble_data,
      bar_data2: bar_data2
    })
    //
  }


  // getLineChartData()
  // {
  //   var players_data = null;
  //   var line_data = []
  //   var line_data_temp = {}
  //   fetch('https://api.90mininone.me/Players')
  //     .then((response) => response.json())
  //     .then((playersData) => {
  //       console.log(playersData)
  //       // iterate over the players data
  //       for (var player of playersData['players'])
  //       {
  //         var player_age = player['age']

  //         if(player_age in line_data_temp)
  //           line_data_temp[player_age] += 1
  //         else
  //           line_data_temp[player_age] = 1

  //       }
  //       console.log('line data temp')
  //       console.log(line_data_temp)

  //       // now let's take line data temp and convert it into a list of dicts instead
  //       for (var age in line_data_temp)
  //       {
  //         var num_players = line_data_temp[age]
  //         line_data.push({'age': parseInt(age), 'num_players': num_players})
  //       }

  //       console.log('LINE DATA')
  //       console.log(line_data)
  //       this.setState({
  //         line_data: line_data
  //       })

  //       console.log(playersData)
  //     });

  //   return line_data
  // }

  render() {
      return (
      	<Container>
        <h1>Number of Players vs Age</h1>
        <br />
         <LineChart />
         <br />
         <h1>Number of Parks Per State</h1>
        <br />
         <ParksPerStateBubble />
         <h1>Number of Teams Per Country</h1>
        <br />
         <TeamsPerCountryBubble />
        </Container>
      );
    }
  }

  // wrap in withFauxDom
  export default withFauxDOM(Charts);
