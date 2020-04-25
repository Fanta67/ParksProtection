import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import {withFauxDOM} from 'react-faux-dom';
import * as d3 from "d3";
import './chart_styles.css';


//const Div = styled('div')`
const LineChart = styled('div')``
const line = styled('div')`
  fill: none;
  stroke: steelblue;
  stroke-width: 1.5px;
`


class RomanLineChart extends React.Component
{


  constructor(props)
  {
    super(props)
    //this.createBarChart  = this.createBarChart.bind(this)

  }
  componentDidMount()
  {
      // faux DOM
      const faux = this.props.connectFauxDOM('LineChart', 'line_chart'); // args are HTML tags A and B
      // data
      console.log('this.props.line_data INSIDE DID MOUNT')
      console.log(this.props.line_data)
      this.createChart(faux, this.props.line_data);
  }
  createChart(faux, data){

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
    var svg = d3.select("body").append("svg")
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

      console.log(data)
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


  }

  render() {

      return (
      	<Container>
      	 <LineChart className="line-container" >{this.props.line_chart} > </LineChart>
        </Container>
      );
    }
  }

  // wrap in withFauxDom
  export default withFauxDOM(RomanLineChart);
