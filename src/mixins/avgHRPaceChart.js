/* eslint-disable no-undef */
export default {
  data() {
    return {};
  },
  methods: {
    createAvgHRPaceChart(sortedActivitiesInView) {
      const container = document.querySelector('#max-avg-heartrate-chart');
      const dateFormatted = sortedActivitiesInView.map((run) => this.renderDate(run.start_date_local));

      return new Highcharts.Chart({
        chart: {
          type: 'scatter',
          renderTo: container,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          zoomType: 'xy',
        },
        title: {
          text: 'Average Pace and HR',
          style: {
            fontSize: '10px',
            color: 'var(--palette-white)',
          },
        },
        tooltip: {
          shared: true,
          formatter() {
            const date = new Date(this.points[0].y);
            const mins = date.getMinutes();
            let secs = date.getSeconds();
            secs = (secs < 10 ? '0' : '') + secs;
            const hrm = `${this.points[1].y}bpm`;
            return `${mins}:${secs}min/km, ${hrm}`;
          },
        },
        plotOptions: {
          scatter: {
            marker: {
              symbol: 'circle',
              radius: 5,
              states: {
                hover: {
                  enabled: true,
                  lineColor: 'rgb(100,100,100)',
                },
              },
            },
          },
        },
        series: [
          {
            name: 'Average Pace',
            type: 'spline',
            data: this.avgPace,
            color: 'var(--palette-warning)',
            style: {
              fontSize: '10px',
              color: 'var(--palette-warning)',
            },
            tooltip: {
              valueSuffix: ' min/km',
            },
            yAxis: 1,
          },
          {
            name: 'Average HR',
            type: 'spline',
            data: this.avgHRData,
            color: 'var(--palette-smalt)',
            style: {
              fontSize: '10px',
              color: 'var(--palette-smalt)',
            },
            tooltip: {
              valueSuffix: ' bpm',
            },
            yAxis: 0,
          },
        ],
        xAxis: {
          title: {
            enabled: true,
            text: 'Date',
            style: {
              fontSize: '10px',
              color: 'var(--palette-white)',
            },
          },
          categories: dateFormatted,
          labels: {
            style: {
              color: 'var(--palette-white)',
            },
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true,
        },
        yAxis: [
          {
            type: 'linear',
            title: {
              enabled: true,
              text: 'HR (bpm)',
              color: 'var(--palette-white)',
              style: {
                fontSize: '10px',
                color: 'var(--palette-white)',
              },
            },
            labels: {
              style: {
                color: 'var(--palette-white)',
              },
            },
            opposite: true,
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
          },
          {
            type: 'datetime',
            title: {
              enabled: true,
              text: 'Pace (min/km)',
              color: 'var(--palette-white)',
              style: {
                fontSize: '10px',
                color: 'var(--palette-white)',
              },
            },
            labels: {
              style: {
                color: 'var(--palette-white)',
              },
              format: '{value:%M:%S}',
            },
            min: 5 * 60 * 1000,
            floor: 5 * 60 * 1000,
            tickInterval: 30 * 1000,
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
          },
        ],
        legend: {
          itemStyle: { color: 'var(--palette-white)' },
        },
      });
    },
  },
};
