<template src='./monthHR.html'></template>
<style scoped src='./monthHR.css'></style>

<script src>
import renderData from '../../mixins/renderData';
import appData from '../../mixins/appData';

export default {
  name: 'monthHR',
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
      const dataArrayMaxHR = this.sortedActivitiesInView.map((run) => (run.max_heartrate ? run.max_heartrate : 0));
      const dataArrayAvgHR = this.sortedActivitiesInView.map((run) => (run.average_heartrate ? run.average_heartrate : 0));
      const dateFormatted = this.sortedActivitiesInView.map((run) => this.renderDate(run.start_date_local));

      return new Highcharts.Chart({
        chart: {
          type: 'scatter',
          renderTo: container,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          zoomType: 'xy',
        },
        title: {
          text: 'Heartrate',
          style: {
            fontSize: '10px',
            color: 'var(--palette-white)',
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
        plotOptions: {
          scatter: {
            marker: {
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
            name: 'Max HR',
            data: dataArrayMaxHR,
            color: 'red',
            style: {
              fontSize: '10px',
              color: 'red',
            },
          },
          {
            name: 'Average HR',
            data: dataArrayAvgHR,
            color: 'orange',
            style: {
              fontSize: '10px',
              color: 'orange',
            },
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
        yAxis: {
          type: 'linear',
          gridLineWidth: 0.1,
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
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true,
        },
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
    highestAvgHR() {
      return Math.max(...this.activitiesInView.map(activity => activity.average_heartrate));
    },
    lowestAvgHR() {
      return Math.min(...this.activitiesInView.map(activity => activity.average_heartrate));
    },
    highestMaxHR() {
      return Math.max(...this.activitiesInView.map(activity => activity.max_heartrate));
    },
    lowestMaxHR() {
      return Math.min(...this.activitiesInView.map(activity => activity.max_heartrate));
    },
  },
};
</script>
