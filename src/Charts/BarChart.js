import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import {withFauxDOM} from 'react-faux-dom';


//const Div = styled('div')`
const Chart = styled('div')``
const d3 = require("d3");


class BarChart extends React.Component
{


  constructor(props)
  {
    super(props)
    this.createBarChart  = this.createBarChart.bind(this)

  }
  componentDidMount()
  {
      // faux DOM
      const faux = this.props.connectFauxDOM('BarChart', 'bar_chart'); // args are HTML tags A and B
      // data
      //var data = [{name: "A", value: 10}, {name: "B", value: 13}, {name: "C", value: 7}];

      this.createBarChart(faux, this.props.bar_data);
  }
  createBarChart(faux, data){

    var margin = ({top: 30, right: 0, bottom: 30, left: 40});

    var height = 300;
    var width = 500;

    var yAxis = g => g.attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
            .text(data.y));

    var xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0));

    var y = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).nice().range([height - margin.bottom, margin.top]);
    var x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);


    // replace creation of svg with selection and appending to faux
    const svg = d3.select(faux)
          .append('svg')
        .attr("viewBox", [0, 0, width, height]);

      svg.append("g")
        .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth());

      svg.append("g")
          .call(xAxis);

      svg.append("g")
          .call(yAxis);
  }

  render() {
      return (
      	<Container>
      	 <Chart className="bar-container" >{this.props.bar_chart}</Chart>
        </Container>
      );
    }
  }

  // wrap in withFauxDom
  export default withFauxDOM(BarChart);