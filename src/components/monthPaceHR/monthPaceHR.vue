<template src='./monthPaceHR.html'></template>
<style scoped src='./monthPaceHR.css'></style>

<script src>
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';

export default {
  name: 'monthPaceHR',
  mixins: [renderData, appData],
  components: {
  },
  props: ['activitiesInView'],
  watch: {
    sortedActivitiesInView() {
      this.createMaxAvgHRChart(this.sortedActivitiesInView);
    },
  },
  data() {
    return {
      displayMaxAvgHRChart: false,
    };
  },
  methods: {
    createMaxAvgHRChart() {
      const container = document.querySelector('#max-avg-heartrate-chart');
      const dateFormatted = this.sortedActivitiesInView.map((run) => this.renderDate(run.start_date_local));

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
          },
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
          },
          {
            type: 'linear',
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
            },
            min: 5,
            tickInterval: 1,
          },
        ],
        legend: {
          itemStyle: { color: 'var(--palette-white)' },
        },
      });
    },
  },
  computed: {
    sortedActivitiesInView() {
      return this.activitiesInView.sort((a, b) => new Date(a.start_date_local) - new Date(b.start_date_local));
    },
    maxHRData() {
      return this.sortedActivitiesInView.map((activity) => (activity.max_heartrate ? activity.max_heartrate : 0));
    },
    avgHRData() {
      return this.sortedActivitiesInView.map((activity) => (activity.average_heartrate ? activity.average_heartrate : 0));
    },
    avgPace() {
      return this.sortedActivitiesInView.map((activity) => {
        const paceFraction = parseFloat((1000 / (activity.average_speed * 60)).toFixed(2));
        return activity.average_speed ? paceFraction : 0;
      });
    },
    highestMaxHR() {
      return Math.max(...this.maxHRData);
    },
    lowestMaxHR() {
      return Math.min(...this.maxHRData) === 0 ? Math.min(...this.maxHRData.filter(maxHR => maxHR > 0)) : Math.min(...this.maxHRData);
    },
    highestAvgHR() {
      return Math.max(...this.avgHRData);
    },
    lowestAvgHR() {
      return Math.min(...this.avgHRData) === 0 ? Math.min(...this.avgHRData.filter(avgHR => avgHR > 0)) : Math.min(...this.avgHRData);
    },
  },
};
</script>
