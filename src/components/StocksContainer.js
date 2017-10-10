import React, {Component} from 'react';
import Stock from "./Stock";

const API_KEY_PARAM = 'apikey=6KBS34D8TNQDVJET';
const FUNCTION_PARAM = 'function=TIME_SERIES_INTRADAY';
const INTERVAL = '1';
const INTERVAL_PARAM = `interval=${INTERVAL}min`;
const ROOT_URL = 'https://www.alphavantage.co/query?';

const stockSymbols = {
  INX: 'S&P 500',
  DJI: 'Dow 30',
  NDAQ: 'Nasdaq',
  AMZN: 'Amazon.com',
  GOOGL: 'Alphabet Inc'
};

export default class StocksContainer extends Component {

  renderStocks() {
    return Object.keys(stockSymbols).map(key => {
      const url = `${ROOT_URL}${FUNCTION_PARAM}&${API_KEY_PARAM}&symbol=${key}&${INTERVAL_PARAM}`;
      return (
        <div key={key}>
          <Stock
            url={url}
            name={stockSymbols[key]}
            symbol={key}
            interval={INTERVAL}
          />
        </div>
      )
    })
  }

  render() {
    return (
      <div style={containerStyle}>
        {this.renderStocks()}
      </div>
    );
  }
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};