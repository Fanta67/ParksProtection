import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import * as d3 from "d3";
import {withFauxDOM} from 'react-faux-dom';

const Div = styled('div')`
`

class Bar extends React.Component {

    componentDidMount() {
        const faux = this.props.connectFauxDOM('Div', 'chart'); // args are HTML tags A and B

        var d3 = require("d3");

        var margin = ({top: 30, right: 0, bottom: 30, left: 40});

        var height = 300;
        var width = 500;

        var data = [{name: "A", value: 10}, {name: "B", value: 13}, {name: "C", value: 7}];

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

    // A and B are defined in connectFauxDOm render this.props.B in tag A
    render() {
        return (
        	<Container>
        	Bar
        	<Div className="bar-container" >{this.props.chart}</Div>
        </Container>
        );
    }
}

// wrap in withFauxDom
export default withFauxDOM(Bar);

