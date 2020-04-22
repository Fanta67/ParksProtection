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

  }

  render() {
    var data = [{name: "A", value: 10}, {name: "B", value: 13}, {name: "C", value: 7}];

      return (
      	<Container>
         <h1>Bar Chart</h1>
      	 <RomanBarChart bar_data={data}/>
         <h1>Scatterplot</h1>
         <RomanScatterPlot scatter_data={data} />
         <h1>Line Chart</h1>
         <RomanLineChart line_data={data} />
        </Container>
      );
    }
  }

  // wrap in withFauxDom
  export default withFauxDOM(roman_chart);
