import React, {Component} from 'react';

export default class StockTrend extends Component {

  render() {
    const { openValue, closeValue } = this.props;
    if (!openValue || !closeValue) {
      return null;
    }

    const difference = (closeValue - openValue);

    const color = difference > 0 ? trendStyle.green : trendStyle.red;

    return (
      <div style={trendStyle.font}>
        <div style={color}>
          {difference.toFixed(2)} ({(difference/openValue).toFixed(4)}%)
        </div>
      </div>
    );
  }
}

const trendStyle = {
  font: {
    fontSize: 13
  },
  red: {
    color: 'red',
  },
  green: {
    color: 'green',
  }
};
