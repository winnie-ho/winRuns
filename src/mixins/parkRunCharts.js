/* eslint-disable no-undef */
export default {
  data() {
    return {};
  },
  methods: {
    createParkRunFinishTimesChart(dataArray) {
      const container = document.querySelector('#pr-finish-time-chart');
      const distanceCheck = dataArray.slice().filter((run) => run.distance > 5000);
      const sortedDataArray = distanceCheck.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
      const dataArrayTime = sortedDataArray.map((run) => run.moving_time * 1000);
      const dateFormatted = sortedDataArray.map((run) => this.renderDate(run.start_date));

      return new Highcharts.Chart({
        chart: {
          type: 'line',
          renderTo: container,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          zoomType: 'xy',
        },
        title: {
          text: 'Park Run Results',
          style: {
            fontSize: '10px',
            color: 'white',
          },
        },
        tooltip: {
          pointFormatter() {
            const ser = this.series;
            return `<span style="color:${ser.color}" >●</span> ${
              ser.name}: <b>${
              Highcharts.dateFormat('%H:%M:%S', this.y)}</b><br>`;
          },
        },
        series: [
          {
            name: 'Time',
            data: dataArrayTime,
            color: '#AEECEF',
            style: {
              fontSize: '10px',
              color: '#AEECEF',
            },
          },
        ],
        xAxis: {
          title: {
            enabled: true,
            text: 'Date',
            style: {
              fontSize: '10px',
              color: 'white',
            },
          },
          categories: dateFormatted,
          labels: {
            style: {
              color: 'white',
            },
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true,
        },
        yAxis: {
          type: 'datetime',
          gridLineWidth: 0.1,
          title: {
            enabled: true,
            text: 'Time (s)',
            color: 'white',
            style: {
              fontSize: '10px',
              color: 'white',
            },
          },
          labels: {
            style: {
              color: 'white',
            },
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true,
        },
        legend: {
          itemStyle: { color: 'white' },
        },
      });
    },
    createParkRunChart(dataArray) {
      const container = document.querySelector('#pr-chart');
      const distanceCheck = dataArray.slice().filter((run) => run.distance > 5000);
      const sortedDataArray = distanceCheck.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
      const dataArrayTime = sortedDataArray.map((run) => run.moving_time * 1000);
      const dateFormatted = sortedDataArray.map((run) => this.renderDate(run.start_date));

      return new Highcharts.Chart({
        chart: {
          type: 'line',
          renderTo: container,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          zoomType: 'xy',
        },
        title: {
          text: 'Park Run Results',
          style: {
            fontSize: '10px',
            color: 'white',
          },
        },
        tooltip: {
          pointFormatter() {
            const ser = this.series;
            return `<span style="color:${ser.color}" >●</span> ${
              ser.name}: <b>${
              Highcharts.dateFormat('%H:%M:%S', this.y)}</b><br>`;
          },
        },
        series: [
          {
            name: 'Time',
            data: dataArrayTime,
            color: '#AEECEF',
            style: {
              fontSize: '10px',
              color: '#AEECEF',
            },
          },
        ],
        xAxis: {
          title: {
            enabled: true,
            text: 'Date',
            style: {
              fontSize: '10px',
              color: 'white',
            },
          },
          categories: dateFormatted,
          labels: {
            style: {
              color: 'white',
            },
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true,
        },
        yAxis: {
          type: 'datetime',
          gridLineWidth: 0.1,
          title: {
            enabled: true,
            text: 'Time (s)',
            color: 'white',
            style: {
              fontSize: '10px',
              color: 'white',
            },
          },
          labels: {
            style: {
              color: 'white',
            },
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true,
        },
        legend: {
          itemStyle: { color: 'white' },
        },
      });
    },
  },
};
