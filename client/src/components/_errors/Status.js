import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';


class Status extends React.Component {
  static get propTypes() {
    return {
      code: PropTypes.number,
      children: PropTypes.element,
    };
  }

  constructor(props) {
    super(props);

    this.onRender = this.onRender.bind(this);
  }

  onRender({ staticContext }) {
    const {
      code,
      children,
    } = this.props;

    if (staticContext) {
      staticContext.status = code;
    }

    return children;
  }

  render() {
    return (
      <Route render={this.onRender} />
    );
  }
}


export default Status;
