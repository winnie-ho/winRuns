/* eslint-disable no-undef */
export default {
  data() {
    return {};
  },
  methods: {
    createAvgHRPaceByRunChart(chartId, MAFLimitData, avgHRDataByRun, avgPaceDataByRun) {
      const container = document.querySelector(`#${chartId}`);

      return new Highcharts.Chart({
        chart: {
          type: 'scatter',
          renderTo: container,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          zoomType: 'xy',
        },
        title: {
          text: 'Average Pace and HR per km',
          style: {
            fontSize: '10px',
            color: 'var(--palette-white)',
          },
        },
        tooltip: {
          shared: true,
          formatter() {
            const date = new Date(this.points[1].y);
            const mins = date.getMinutes();
            let secs = date.getSeconds();
            secs = (secs < 10 ? '0' : '') + secs;
            const hrm = `${this.points[2].y}bpm`;
            return `${mins}:${secs}min/km, ${hrm}`;
          },
        },
        plotOptions: {
          line: {
            marker: {
              enabled: false,
            },
          },
          spline: {
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
            name: 'MAF Limit',
            type: 'line',
            data: MAFLimitData,
            color: 'var(--palette-error)',
            style: {
              fontSize: '10px',
              color: 'var(--palette-error)',
            },
            tooltip: {
              valueSuffix: ' bpm',
            },
            yAxis: 0,
            plotOptions: {
              marker: {
                enabled: false,
              },
            },
          },
          {
            name: 'Average Pace',
            type: 'spline',
            data: avgPaceDataByRun,
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
            data: avgHRDataByRun,
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
            text: 'Distance (km)',
            style: {
              fontSize: '10px',
              color: 'var(--palette-white)',
            },
          },
          categories: '',
          labels: {
            style: {
              color: 'var(--palette-white)',
            },
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true,
          min: 0,
          tickInterval: 1,
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
            tickInterval: 60 * 1000,
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
