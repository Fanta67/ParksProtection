import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import {withFauxDOM} from 'react-faux-dom';
import * as d3 from "d3";
import '../../Assets/css/chart_styles.css';


const line = styled('div')`
  fill: none;
  stroke: yellow;
  stroke-width: 1.5px;
`


class LineChart extends React.Component
{


  constructor(props)
  {
    super(props)
    //this.createBarChart  = this.createBarChart.bind(this)

  }
  componentDidMount()
  {
      // faux DOM
       // args are HTML tags A and B
      // data

      var players_data = null;
    var data = []
    var line_data_temp = {}
    fetch('https://api.90mininone.me/Players')
      .then((response) => response.json())
      .then((playersData) => {
        const faux = this.props.connectFauxDOM('div', 'line_chart');
        // iterate over the players data
        for (var player of playersData['players'])
        {
          var player_age = player['age']

          if(player_age in line_data_temp)
            line_data_temp[player_age] += 1
          else
            line_data_temp[player_age] = 1

        }

        // now let's take line data temp and convert it into a list of dicts instead
        for (var age in line_data_temp)
        {
          var num_players = line_data_temp[age]
          data.push({'age': parseInt(age), 'num_players': num_players})
        }

         // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // parse the date / time
    //var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.age); })
        .y(function(d) { return y(d.num_players); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(faux).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


      // format the data
      /*
      data.forEach(function(d) {
          d.date = parseTime(d.date);
          d.close = +d.close;
      });
      */

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.age; }));
      y.domain([0, d3.max(data, function(d) { return d.num_players; })]);

      // Add the valueline path.
      svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", valueline);

      // Add the X Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
          .call(d3.axisLeft(y));
      });
  }

  render() {
      return (
      	<Container>
          <h1>Number of Players vs Player Age</h1>
          <br />
          <div className="line-container"> {this.props.line_chart} </div>
          <br />
        </Container>
      );
    }
  }

  // wrap in withFauxDom
  export default withFauxDOM(LineChart);
