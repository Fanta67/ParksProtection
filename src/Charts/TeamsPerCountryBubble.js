import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import * as d3 from "d3";
import {withFauxDOM} from 'react-faux-dom';

const Div = styled('div')`
`

class TeamsPerCountryBubble extends React.Component {

    componentDidMount() {
        const faux = this.props.connectFauxDOM('Div', 'chart');

        var dataset = {
            "children": [{"Name":"Austria","Count":25},
                {"Name":"Belgium","Count":23},
                {"Name":"Brazil","Count":40},
                {"Name":"Bulgaria","Count":23},
                {"Name":"Canada","Count":9},
                {"Name":"China","Count":8},
                {"Name":"Costa-Rica","Count":9},
                {"Name":"Croatia","Count":10},
                {"Name":"Denmark","Count":24},
                {"Name":"England","Count":113},
                {"Name":"France","Count":33},
                {"Name":"Germany","Count":71},
                {"Name":"Kenya","Count":13},
                {"Name":"Liechtenstein","Count":1},
                {"Name":"Luxembourg","Count":12},
                {"Name":"Mexico","Count":33},
                {"Name":"Netherlands","Count":33},
                {"Name":"Paraguay","Count":12},
                {"Name":"Portugal","Count":30},
                {"Name":"Russia","Count":15},
                {"Name":"Scotland","Count":22},
                {"Name":"South-Africa","Count":12},
                {"Name":"Spain","Count":41},
                {"Name":"Switzerland","Count":16},
                {"Name":"Ukraine","Count":10},
                {"Name":"Wales","Count":13}]
        };

        var diameter = 600;
        var colors = d3.scaleOrdinal(d3.schemeCategory10);

        var bubble = d3.pack(dataset)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select(faux)
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        var nodes = d3.hierarchy(dataset)
            .sum(function(d) { return d.Count; });

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        node.append("title")
            .text(function(d) {
                return d.Name + ": " + d.Count;
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                return colors(i);
            });

        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Name.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Count;
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

    }

    render() {
        return (
        	<Container>
        	<Div className="bubble-container" >{this.props.chart}</Div>
        </Container>
        );
    }
}

export default withFauxDOM(TeamsPerCountryBubble);