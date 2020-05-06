import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import {withFauxDOM} from 'react-faux-dom';

class BarChart extends React.Component
{


  constructor(props)
  {
    super(props)
    this.createBarChart  = this.createBarChart.bind(this)

  }
  async componentDidMount()
  {
      // faux DOM
      // data
      //var data = [{name: "A", value: 10}, {name: "B", value: 13}, {name: "C", value: 7}];
      const d3 = require("d3");

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
        console.log(pie_data.keys());
        for (const [key, value] of pie_data.entries()) {
            const obj = { name : key, value: value};
            data.push(obj);
        }

      var margin = ({top: 10, right: 0, bottom: 110, left: 40});

    var height = 300;
    var width = 500;

    var yAxis = g => g.attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(d3.max(data, d => d.value)).tickFormat(d3.format(".0f")))
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

    const faux = this.props.connectFauxDOM('div', 'bar_chart'); // args are HTML tags A and B

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
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

      svg.append("g")
          .call(yAxis);
  }
  createBarChart(faux, data){

    
  }

  render() {
      return (
        <Container>
          <h1>Number of Leagues per Country</h1>
          <br />
          <div className="bar-container" >{this.props.bar_chart}</div>
          <br />
        </Container>
      );
    }
  }

  // wrap in withFauxDom
  export default withFauxDOM(BarChart);
