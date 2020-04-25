import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import * as d3 from "d3";

class Bar2 extends React.Component {

	constructor(props) {
		super(props)
		this.createBarChart = this.createBarChart.bind(this) // bind to this
	}

	// call in both
	componentDidMount() {
      this.createBarChart()
   }

   componentDidUpdate() {
      this.createBarChart()
   }

    createBarChart() {
        // D3 Code to create the chart
        // using this._rootNode as container

        var data = [{name: "A", value: 10}, {name: "B", value: 13}, {name: "C", value: 7}];

        var d3 = require("d3");

        var width = 750;

        var height = 750;

        var margin = ({top: 30, right: 0, bottom: 30, left: 40});

        var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y))

		var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0))

    	var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])

    	var x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)

    // replace creation of svg with selection of this.node
    const node = this.node

    d3.select(node)
      .attr("viewBox", [0, 0, width, height]);

    d3.select(node).append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

  d3.select(node).append("g")
      .call(xAxis);

  d3.select(node).append("g")
      .call(yAxis);

    }

    // set ref node and container width and height
    render() {
        return(
        	<Container>
        	Bar 2
        	<svg className="bar2-container " ref={node => this.node = node} width={750} height={750} />
        	</Container>
        	);
    }
}

export default Bar2;