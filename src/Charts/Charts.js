import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import {withFauxDOM} from 'react-faux-dom';
import ScatterPlot from './ScatterPlot';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import Bubble from './Bubble';


class Charts extends React.Component
{

  constructor(props)
  {
    super(props)
    this.state = {
    }

  }

  componentWillMount()
  {
    // fetch data here...
    var bar_data = [{name: "A", value: 10}, {name: "B", value: 13}, {name: "C", value: 7}];
    // TODO:
    // ROMAN DO LINE CHART
    // var line_data = [ {date: "30-Jan-12", close: 30.3}, {date: "15-Feb-12", close: 70}, {date: "30-Apr-12", close: 63}, {date: "27-Apr-12", close: 30}, {date: "1-May-12", close: 58.13}];
    var scatter_data = [{Calories: 10, "Protein (g)": 10, Manufacturer: "Kellogs", "Cereal Name": "Kellogs Cereal"},{Calories: 5, "Protein (g)": 5, Manufacturer: "Quaker", "Cereal Name": "Quaker Cereal"}];
    var pie_data = []
    var bubble_data = []
    var bar_data2 = []

    // roman do parks per state, animals per group
    // dict: {name: "group", number: val}

    // # of players vs age # - line chart - Roman - api/Players - RomanLineChart.js and roman_chart.js
    var line_data = this.getLineChartData();

    //var scatter_data = this.getScatteplotData();
    // # of plants vs # of animals (per state) - scatterplot - Roman - api/animals AND api/plants - Scatterplot.js OR RomanScatterPlot.js and roman_chart.js

    this.setState({
      bar_data: bar_data,
      line_data: line_data,
      scatter_data: scatter_data,
      pie_data: pie_data,
      bubble_data: bubble_data,
      bar_data2: bar_data2
    })
    //
  }

  get_plant_data()
  {
    var plants_per_state = {};

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
      });
      this.setState({
        plant_data: plants_per_state
      });
      return plants_per_state;
  }
  get_animal_data()
  {
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
      });
      this.setState({
        animal_data: animals_per_state
      });

      return animals_per_state;
  }
  get_plants_and_animal_data()
  {
    return Promise.all([this.get_animal_data(), this.get_plant_data()]);
  }
  getScatteplotData()
  {

    var per_state_data = {};
    this.get_plants_and_animal_data()
      .then(([animal_data, plant_data]) => {
        console.log('ANIMAL AND PLANT DATA')
        // now let's combine the two data into one dictionary

        var state_set = new Set();

        console.log(this.state.animal_data)
        console.log(animal_data)
        console.log('FARTASSFARTASSFARTASSFARTASSFARTASSFARTASSFARTASSFARTASS')
        console.log(animal_data['TX'])
        for (var animal_state in animal_data)
        {
          console.log('INSIDE AIMAL LOOOOOOP');
          state_set.add(animal_state);
        }

        for (var plant_state in plant_data)
        {
          state_set.add(plant_state)
        }


        state_set.add('FART ASS')

        console.log('THE STATE SET')
        console.log(state_set)


        console.log('FART ASS ANIMAL STATES')
        console.log(animal_data)
        console.log('FART ASS PLANT STATES')
        console.log(plant_data)

      });

      return per_state_data;
  }

  getLineChartData()
  {
    var players_data = null;
    var line_data = []
    var line_data_temp = {}
    fetch('https://api.90mininone.me/Players')
      .then((response) => response.json())
      .then((playersData) => {
        console.log(playersData)
        // iterate over the players data
        for (var player of playersData['players'])
        {
          var player_age = player['age']

          if(player_age in line_data_temp)
            line_data_temp[player_age] += 1
          else
            line_data_temp[player_age] = 1

        }
        console.log('line data temp')
        console.log(line_data_temp)

        // now let's take line data temp and convert it into a list of dicts instead
        for (var age in line_data_temp)
        {
          var num_players = line_data_temp[age]
          line_data.push({'age': parseInt(age), 'num_players': num_players})
        }

        console.log('LINE DATA')
        console.log(line_data)
        this.setState({
          line_data: line_data
        })

        console.log(playersData)
      });

    return line_data
  }

  render() {
    console.log(this.state.line_data)
      return (
      	<Container>
         <LineChart line_data={this.state.line_data} />
         <ScatterPlot scatter_data={this.state.line_data} />
        </Container>
      );
    }
  }

  // wrap in withFauxDom
  export default withFauxDOM(Charts);
