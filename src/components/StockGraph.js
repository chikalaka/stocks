import React, {Component} from 'react';
const Highcharts = require('highcharts/highstock');

export default class StockGraph extends Component {

  componentWillReceiveProps(nextProps) {
    const { data, symbol } = nextProps;

    if (data && Object.keys(data).length > 0) {
      const timeKey = `Time Series (${this.props.interval}min)`;
      const times = data[timeKey];
      const timeAndValue = this.getTimeAndValue(times);

      Highcharts.chart(this.refs.graph, {
        title: {
          text: symbol
        },
        xAxis: {
          type: 'datetime',
          labels: {
            enabled: false,
          }
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },

        series: [{
          type: 'area',
          name: 'Stock Value',
          data: timeAndValue.reverse()
        }]
      });
    }
  }

  getTimeAndValue(data) {
    return Object.keys(data).map(key => {
      const value = Number(data[key]['1. open']);
      return [key, value];
    })
  }

  render() {
    if (!this.props.data) {
      return null;
    }

    return (
      <div ref="graph" />
    );
  }
}