export default {
  data() {
    return {
      parkRunDict: [
        {
          name: 'Edinburgh Cramond',
          startCoords: [55.98, -3.29],
          segmentId: '1531025',
          segDict: {
            1: 'Edinburgh park run first km',
            2: 'Edinburgh Parkrun 2nd Kilometre',
            3: 'Edinburgh Parkrun 3rd Kilometre',
            4: 'Edinburgh Parkrun 4th Kilometre',
            5: "Edinburgh Parkrun 5th 'Kilometre'"
          },
          default: true
        },
        {
          name: 'Edinburgh Portobello',
          startCoords: [55.95, -3.12],
          segmentId: '9342203',
          segDict: {
          },
          default: false
        },
        {
          name: 'Inverness',
          startCoords: [57.46, -4.24],
          segmentId: '11829562',
          segDict: {
          },
          default: false
        }
      ]
    }
  },
  methods: {
    createParkRunChart: function (dataArray) {
      const container = document.querySelector('#pr-chart')

      const distanceCheck = dataArray.slice().filter(run => run.distance > 5000)
      const sortedDataArray = distanceCheck.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
      const dataArrayTime = sortedDataArray.map(run => run.moving_time * 1000)
      const dateFormatted = sortedDataArray.map(run => this.renderDate(run.start_date))

      const chart = new Highcharts.Chart({
        chart: {
          type: 'line',
          renderTo: container,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          zoomType: 'xy'
        },
        title: {
          text: 'Park Run Results',
          style: {
            'fontSize': '12px',
            'color': '#2c3e50'
          }
        },
        tooltip: {
          pointFormatter: function () {
            var ser = this.series
            return '<span style="color:' + ser.color + '" >●</span> ' +
              ser.name + ': <b>' +
              Highcharts.dateFormat('%H:%M:%S', this.y) + '</b><br>'
          }
        },
        series: [
          {
            name: 'Time',
            data: dataArrayTime,
            color: '#2c3e50',
            style: {
              'fontSize': '12px',
              'color': '#2c3e50'
            }
          }
        ],
        xAxis: {
          title: {
            enabled: true,
            text: 'Date',
            style: {
              'fontSize': '12px',
              'color': '#2c3e50'
            }
          },
          categories: dateFormatted,
          labels: {
            style: {
              color: '#2c3e50'
            }
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
        },
        yAxis: {
          type: 'datetime',
          gridLineWidth: 0.1,
          title: {
            enabled: true,
            text: 'Time (s)',
            color: '#2c3e50',
            style: {
              'fontSize': '12px',
              'color': '#2c3e50'
            }
          },
          labels: {
            style: {
              color: '#2c3e50'
            }
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
        },
        legend: {
          itemStyle: { 'color': '#2c3e50' }
        }
      })
    }
  }
}
