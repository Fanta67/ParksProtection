import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import {withFauxDOM} from 'react-faux-dom';
import ScatterPlot from './ScatterPlot';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import ParksPerStateBubble from './ParksPerStateBubble';
import TeamsPerCountryBubble from './TeamsPerCountryBubble';
import APTGPie from './AnimalsPTaxgroup'


class Charts extends React.Component
{
  constructor(props)
  {
    super(props)
  }

  componentWillMount()
  {
  }

  render() {
      return (
        <Container>
          <br />
          <ParksPerStateBubble />
          <ScatterPlot />
          <APTGPie />
          <BarChart />
          <TeamsPerCountryBubble />
          <LineChart />
        </Container>
      );
    }
  }

  // wrap in withFauxDom
  export default withFauxDOM(Charts);
