import React from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Big404Text = styled('h1')`
  color: #444444;
  text-align: center;
  font-size: 1000%;
`
const CenterContainer = styled('div')`
alignItems: 'center';
text-align: center;
vertical-align: middle;
`

function NotFoundPage(props) {
  return (
    <CenterContainer >
      <br />
      <br />
      <h2> Oops! Page not found </h2>
      <Big404Text> 404 </Big404Text>
      <h2> Click <a href="./"> here </a> to go back to the home page. </h2>
    </CenterContainer>

  );
}

export default NotFoundPage;
