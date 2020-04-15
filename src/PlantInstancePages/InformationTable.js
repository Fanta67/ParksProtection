import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import {TableBox} from './Constants.js'

function InformationTable(props) {
  return (
     <TableBox>
      <Table striped bordered hover size="sm">
          <tbody>
          <tr><th>Family</th><td>{props.info.family}</td></tr>
          <tr><th>Family Common Name</th><td>{props.info.family_com}</td></tr>
          <tr><th>Category</th><td>{props.info.category}</td></tr>
          <tr><th>Duration</th><td>{props.info.duration}</td></tr>
          <tr><th>Growth Habit</th><td>{props.info.growth}</td></tr>
          <tr><th>Toxicity</th><td>{props.info.toxicity}</td></tr>
          </tbody>
      </Table>
    </TableBox>
  );
}

export default InformationTable;
