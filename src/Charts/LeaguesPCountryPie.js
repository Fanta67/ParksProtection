import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import * as d3 from "d3";
import {withFauxDOM} from 'react-faux-dom';

const Div = styled('div')`
`

class LeaguePie extends React.Component {

    async componentDidMount() {
        var d3 = require("d3");

        let url = "https://api.90mininone.me/Leagues";
        const response = await fetch(url);
        const data_obj = await response.json();
        const data_array = data_obj.leagues;

        //var pie_data = [{name: "Reptiles", value: 5}, {name: "Birds", value: 10}];
        var pie_data = new Map();

        for(var whatever in data_array){
            const thing  = data_array[whatever];
            if(!pie_data.has(thing.country)){
                pie_data.set(thing.country, 1);
            }
            else{
                pie_data.set(thing.country, pie_data.get(thing.country) + 1);
            }
        }

        var data = [];
        for (const [key, value] of pie_data.entries()) {
            const obj = { name : key, value: value};
            data.push(obj);
        }

        var color = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    var width = 500;
    var height = Math.min(width, 500)

    var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);

    const radius = Math.min(width, height) / 2 * 0.8;
    var arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);

	var pie = d3.pie()
    .sort(null)
    .value(d => d.value);

    const arcs = pie(data);

  const faux = this.props.connectFauxDOM('Div', 'chart'); // args are HTML tags A and B
  const svg = d3.select(faux).append('svg')
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

  svg.append("g")
      .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
    .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .call(text => text.append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.value.toLocaleString()));



    }

    // A and B are defined in connectFauxDOm render this.props.B in tag A
    render() {
        return (
        	<Container>
        	Pie
        	<Div className="pie-container" >{this.props.chart}</Div>
        </Container>
        );
    }
}

// wrap in withFauxDom
export default withFauxDOM(LeaguePie);
