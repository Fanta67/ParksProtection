import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import {withFauxDOM} from 'react-faux-dom';
import RomanBarChart from './RomanBarChart';
import RomanScatterPlot from './RomanScatterPlot';

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
      	 <RomanBarChart bar_data={data}/>
         <RomanScatterPlot scatter_data={data}/>
        </Container>
      );
    }
  }

  // wrap in withFauxDom
  export default withFauxDOM(roman_chart);
