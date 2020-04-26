import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import {withFauxDOM} from 'react-faux-dom';


//const Div = styled('div')`
const Div = styled('div')``
const d3 = require("d3");


class RomanScatterPlot extends React.Component
{


  constructor(props)
  {
    super(props)
    this.createScatterplot  = this.createScatterplot.bind(this)
  }
  componentDidMount()
  {
      // faux DOM
      
      // data
      //var data = [{name: "A", value: 10}, {name: "B", value: 13}, {name: "C", value: 7}];

      this.createScatterplot({});
  }
  get_plant_data()
  {

  }
  get_animal_data()
  {

  }
  get_plants_and_animal_data()
  {
    return Promise.all([this.get_animal_data(), this.get_plant_data()]);
  }
  getScatteplotData()
  {

  }
  createScatterplot(data) {

    var plants_per_state = {};
    console.log('HELLOOOOOOOOOOOO')
    // GET THE ANIAMLS ASSOCIATED WITH EACH STATE
    fetch('https://api.parkprotection.me/api/plants?results_per_page=10000')
      .then((response) => response.json())
      .then((plants_data) => {
        console.log('PLANTS DATA YO');
        console.log(plants_data);
        for (var plant of plants_data['objects'])
        {
          var states_list = plant['states'];
          for (var state of states_list)
          {
            var state_name = state['name'];
            if(state_name in plants_per_state)
              plants_per_state[state_name] += 1
            else
              plants_per_state[state_name] = 1
          }

          //animal[]
        }
      console.log('PLATNS PER STATE')
      console.log(plants_per_state)

      var animals_per_state = {};

      // GET THE ANIAMLS ASSOCIATED WITH EACH STATE
      fetch('https://api.parkprotection.me/api/animals?results_per_page=10000')
        .then((response) => response.json())
        .then((animals_data) => {
          console.log('animals DATA YO');
          console.log(animals_data);
          for (var animal of animals_data['objects'])
          {
            var states_list = animal['states'];
            for (var state of states_list)
            {
              var state_name = state['name'];
              if(state_name in animals_per_state)
                animals_per_state[state_name] += 1
              else
                animals_per_state[state_name] = 1
            }

            //animal[]
          }
        console.log('ANIMALS PER STATE')
        console.log(animals_per_state)

    var per_state_data = {};

    var state_set = new Set();
    var animal_data = animals_per_state;
    var plant_data = plants_per_state;

    console.log(animal_data)
    console.log('FARTASSFARTASSFARTASSFARTASSFARTASSFARTASSFARTASSFARTASS')
    console.log(animal_data['TX'])
    for (var animal_state in animal_data)
    {
      console.log('INSIDE AIMAL LOOOOOOP');
      state_set.add(animal_state);
    }

    var scatter_data = []

    for (var plant_state in plant_data)
    {
      state_set.add(plant_state)
    }
    for (var state of state_set)
    {
      console.log(state)
      var num_plants = 0
      var num_animals = 0
      if(state in plant_data)
        num_plants = plant_data[state]
      if(state in animal_data)
        num_animals = animal_data[state]


      scatter_data.push({'x': num_animals, 'y': num_plants, 'red': 'red', 'state': state })


    }
    console.log('FARTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
    console.log(scatter_data)


    state_set.add('FART ASS')

    console.log('THE STATE SET')
    console.log(state_set)


    console.log('FART ASS ANIMAL STATES')
    console.log(animal_data)
    console.log('FART ASS PLANT STATES')
    console.log(plant_data)

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


    var data = scatter_data;



    /*
     * value accessor - returns the value to encode for a given data object.
     * scale - maps value to a visual display encoding, such as a pixel position.
     * map function - maps from data value to display value
     * axis - sets up axis
     */

    // setup x
    var xValue = function(d) { return d['x'];}, // data -> value
        xScale = d3.scaleLinear().range([0, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.axisBottom(xScale);

    // setup y
    var yValue = function(d) { return d["y"];}, // data -> value
        yScale = d3.scaleLinear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.axisLeft(yScale);

    // setup fill color
    var cValue = function(d) { return d['red'];},
        color = d3.scaleOrdinal(d3.schemeCategory10);

    // add the graph canvas to the body of the webpage
    const faux = this.props.connectFauxDOM('div', 'chart'); // args are HTML tags A and B

    var svg = d3.select(faux).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the tooltip area to the webpage
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      console.log('CEREAL ehreasd fase;kjfA')
      console.log(data)
      // change string (from CSV) into number format


      // don't want dots overlapping axis, so add in buffer to data domain
      xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
      yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

      // x-axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Fart");

      // y-axis
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Protein (g)");

      // draw dots
      svg.selectAll(".dot")
          .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", xMap)
          .attr("cy", yMap)
          .style("fill", function(d) { return color(cValue(d));})
          .on("mouseover", function(d) {
              tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
              tooltip.html(d["state"] + "<br/> (" + xValue(d)
    	        + ", " + yValue(d) + ")")
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
          });
    });
  });

  }

  render() {
      return (
        <Container>
          <h1>Plants vs Animals by State</h1>
          <br />
          <div className="scatter-container" >{this.props.chart} </div>
          <br />
        </Container>
      );
    }
  }

  // wrap in withFauxDom
  export default withFauxDOM(RomanScatterPlot);
