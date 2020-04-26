import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import * as d3 from "d3";
import {withFauxDOM} from 'react-faux-dom';

const Div = styled('div')`
`

class ParksPerStateBubble extends React.Component {

    async componentDidMount() {
        const states = ['AL',
              'AR',
              'AZ',
              'CA',
              'CO',
              'CT',
              'DE',
              'FL',
              'GA',
              'IA',
              'ID',
              'IL',
              'IN',
              'KS',
              'KY',
              'LA',
              'MA',
              'MD',
              'ME',
              'MI',
              'MN',
              'MO',
              'MS',
              'MT',
              'NC',
              'ND',
              'NE',
              'NH',
              'NJ',
              'NM',
              'NV',
              'NY',
              'OH',
              'OK',
              'OR',
              'PA',
              'RI',
              'SC',
              'SD',
              'TN',
              'TX',
              'UT',
              'VA',
              'VI',
              'VT',
              'WA',
              'WI',
              'WV',
              'WY'
        ]

        let url = "https://api.parkprotection.me/api/parks?results_per_page=3&q={\"filters\":[{\"name\":\"states__name\",\"op\":\"any\",\"val\":\"";

        var data = new Map();
        for(const state of states) {
            const currurl = url + state + "\"}]}";
            const response = await fetch(currurl);
            const data_obj = await response.json();
            data.set(state, data_obj.num_results);
        }

        var datamap = [];
        for (const [key, value] of data.entries()) {
            const obj = { Name : key, Count: value};
            datamap.push(obj);
        }

        var dataset = {"children": datamap}

        // var dataset = {
        //     "children": [{"Name":"AL","Count":9},
        //         {"Name":"AR","Count":7},
        //         {"Name":"AZ","Count":23},
        //         {"Name":"CA","Count":27},
        //         {"Name":"CO","Count":12},
        //         {"Name":"CT","Count":4},
        //         {"Name":"DE","Count":1},
        //         {"Name":"FL","Count":11},
        //         {"Name":"GA","Count":13},
        //         {"Name":"IA","Count":3},
        //         {"Name":"ID","Count":7},
        //         {"Name":"IL","Count":3},
        //         {"Name":"IN","Count":4},
        //         {"Name":"KS","Count":6},
        //         {"Name":"KY","Count":6},
        //         {"Name":"LA","Count":7},
        //         {"Name":"MA","Count":18},
        //         {"Name":"MD","Count":19},
        //         {"Name":"ME","Count":4},
        //         {"Name":"MI","Count":6},
        //         {"Name":"MN","Count":5},
        //         {"Name":"MO","Count":7},
        //         {"Name":"MS","Count":10},
        //         {"Name":"MT","Count":9},
        //         {"Name":"NC","Count":13},
        //         {"Name":"ND","Count":4},
        //         {"Name":"NE","Count":6},
        //         {"Name":"NH","Count":2},
        //         {"Name":"NJ","Count":8},
        //         {"Name":"NM","Count":14},
        //         {"Name":"NV","Count":4},
        //         {"Name":"NY","Count":29},
        //         {"Name":"OH","Count":12},
        //         {"Name":"OK","Count":4},
        //         {"Name":"OR","Count":7},
        //         {"Name":"PA","Count":23},
        //         {"Name":"RI","Count":3},
        //         {"Name":"SC","Count":9},
        //         {"Name":"SD","Count":7},
        //         {"Name":"TN","Count":14},
        //         {"Name":"TX","Count":14},
        //         {"Name":"UT","Count":13},
        //         {"Name":"VA","Count":24},
        //         {"Name":"VI","Count":5},
        //         {"Name":"VT","Count":2},
        //         {"Name":"WA","Count":13},
        //         {"Name":"WI","Count":2},
        //         {"Name":"WV","Count":8},
        //         {"Name":"WY","Count":6}]
        // };

        var diameter = 1000;
        var colors = d3.scaleOrdinal(d3.schemeCategory10);

        var bubble = d3.pack(dataset)
            .size([diameter, diameter])
            .padding(1.5);

        const faux = this.props.connectFauxDOM('div', 'chart');
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
                return d.data.Name + ": " + d.data.Count;
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
            <h1>Number of Parks per State</h1>
            <div className="bubble-container" >{this.props.chart}</div>
            <br />
        </Container>
        );
    }
}

export default withFauxDOM(ParksPerStateBubble);