import React from 'react';
import Status from './Status';


export default class E404 extends React.Component {
  render() {
    return (
      <Status code={404}>
        <h1>{'404 Not found'}</h1>
      </Status>
    );
  }
}
