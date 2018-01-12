import React from 'react';
import Status from './Status';


export default class E500 extends React.Component {
  render() {
    return (
      <Status code={500}>
        <h1>{'500 Internal server error'}</h1>
      </Status>
    );
  }
}
