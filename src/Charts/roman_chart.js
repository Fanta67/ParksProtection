import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import {withFauxDOM} from 'react-faux-dom';
import RomanBarChart from './RomanBarChart';
import RomanScatterPlot from './RomanScatterPlot';
import RomanLineChart from './RomanLineChart';

class roman_chart extends React.Component
{

  constructor(props)
  {
    //
    super(props)
  }

  componentDidMount()
  {
    // fetch data here...
    var bar_data = [{name: "A", value: 10}, {name: "B", value: 13}, {name: "C", value: 7}];
    // TODO:
    // ROMAN DO LINE CHART
    var line_data = [ {date: "30-Jan-12", close: 30.3}, {date: "15-Feb-12", close: 70}, {date: "30-Apr-12", close: 63}, {date: "27-Apr-12", close: 30}, {date: "1-May-12", close: 58.13}];
    var scatter_data = [{Calories: 10, "Protein (g)": 10, Manufacturer: "Kellogs", "Cereal Name": "Kellogs Cereal"},{Calories: 5, "Protein (g)": 5, Manufacturer: "Quaker", "Cereal Name": "Quaker Cereal"}];
    var pie_data = []
    var bubble_data = []
    var bar_data2 = []

    // roman do parks per state, animals per group
    // dict: {name: "group", number: val}

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

  render() {
    console.log(this.state.bar_data)
      return (
      	<Container>
         <h1>Bar Chart</h1>
      	 <RomanBarChart bar_data={this.state.bar_data}/>
         <h1>Scatterplot</h1>
         <RomanScatterPlot scatter_data={this.state.scatter_data} />
         <h1>Line Chart</h1>
         <RomanLineChart line_data={this.state.line_data} />
        </Container>
      );
    }
  }

  // wrap in withFauxDom
  export default withFauxDOM(roman_chart);
