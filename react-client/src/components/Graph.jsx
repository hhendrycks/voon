import React from 'react';
import { Line } from 'react-chartjs-2';

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
  }
  render() {
    const data = {
      labels: this.props.labels,
      datasets: [
        {
          label: this.props.label,
          lineTension: 0.1,
          // backgroundColor: '#811e28',
          borderColor: '#811e28',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#811e28',
          pointBackgroundColor: '#811e28',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#811e28',
          pointHoverBorderColor: '#811e28',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.data
        }
      ]
    };
    // };
    return (
      <div>
        <Line data={data} ref="chart" />
      </div>
    );
  }
}

export default Graph;