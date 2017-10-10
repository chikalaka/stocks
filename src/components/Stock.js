import React, {Component} from 'react';
import {StockHeader} from "./StockHeader";
import StockTrend from "./StockTrend";
import StockGraph from "./StockGraph";

export default class Stock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stockData: {},
      currentValue: null,
      openValue: null,
      closeValue: null
    }
  }

  componentWillMount() {
    fetch(this.props.url)
      .then(res => {
        res.json()
          .then(stockData => {
            console.log('stock data: ', stockData);
            if (Object.keys(stockData).length > 1) {
              const values = this.getValues(stockData);
              this.setState({
                stockData,
                currentValue: values[0],
                openValue: values[1],
                closeValue: values[0]
              })
            }

          })
      })
  }

  getValues(data) {
    if (Object.keys(data).length > 0) {
      const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
      const timeKey = `Time Series (${this.props.interval}min)`;
      const currentValue = data[timeKey][lastRefreshed]['4. close'];

      let openDate = lastRefreshed;
      Object.keys(data[timeKey]).forEach(key => {
        if ((new Date(key).getTime()) < (new Date(openDate).getTime())) {
          openDate = key
        }
      });
      const openValue = data[timeKey][openDate]['1. open'];

      return [Number(currentValue), Number(openValue)];
    }
    return null;
  }

  render() {
    const { name, interval, symbol } = this.props;
    const { currentValue, openValue, closeValue } = this.state;

    return (
      <div style={containerStyle}>
        <div style={flexStyle}>
          <div>
            <StockHeader name={name} />
            {Number(currentValue).toFixed(2)}
            <StockTrend openValue={openValue} closeValue={closeValue} />
          </div>
          <StockGraph
            data={this.state.stockData}
            symbol={symbol}
            interval={interval}
          />
        </div>
        <hr />
      </div>
    );
  }
}

const flexStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

const containerStyle = {
  marginBottom: 50
};