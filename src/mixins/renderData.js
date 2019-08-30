import moment from 'moment'

export default {
  data () {
    return {
      dayLookUp: {
        6: 'Sunday',
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday'
      },
      monthLookUp: {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      }
    }
  },
  methods: {
    renderDistance (rawDistance, short) {
      if (!rawDistance) return
      if (short === 'short') {
        return ((rawDistance) / 1000).toFixed(0) + 'km'
      }
      return ((rawDistance) / 1000).toFixed(2) + 'km'
    },
    renderElevation (rawElevation, short) {
      if (!rawElevation) return
      return short ? ((rawElevation) / 1000).toFixed(0) + 'm' : ((rawElevation) / 1000).toFixed(2) + 'm'
    },
    renderSwimDistance (rawDistance) {
      if (rawDistance === 0) return '0m'
      if (!rawDistance) return
      return rawDistance.toFixed(0) + 'm'
    },
    renderTime (rawTime, short) {
      if (!rawTime) return '-'

      const totalMinutes = (rawTime / 60).toFixed(2)
      const hours = Math.floor(totalMinutes / 60)
      const rawMinutes = (Math.floor(totalMinutes - (hours * 60))).toFixed(0)
      let minutes = rawMinutes
      if (rawMinutes < 10) {
        minutes = '0' + rawMinutes
      }
      const rawSeconds = (((totalMinutes - (hours * 60)) - minutes) * 60).toFixed(0)
      let seconds = rawSeconds
      if (rawSeconds < 10) {
        seconds = '0' + rawSeconds
      }
      if (hours === 0) {
        if (short === 'short') {
          return minutes + 'mins'
        }
        return minutes + ':' + seconds
      } else {
        if (short === 'short') {
          return hours + ' hrs'
        }
        return hours + ':' + minutes + ':' + seconds
      }
    },
    renderPace (rawTime, rawDistance) {
      if (!rawTime) return
      const totalMinutes = (rawTime / 60).toFixed(2)
      const paceMinutes = (Math.floor(totalMinutes / (rawDistance / 1000))).toFixed(0)
      let rawPaceSeconds = (((totalMinutes / (rawDistance / 1000)) - paceMinutes) * 60).toFixed(0)
      let paceSeconds = rawPaceSeconds
      if (rawPaceSeconds < 10) {
        paceSeconds = '0' + rawPaceSeconds
      }
      return paceMinutes + ':' + paceSeconds + '/km'
    },
    renderSwimPace (rawTime, rawDistance) {
      if (rawDistance === 0) return '-'
      let multiplier = 100 / rawDistance
      if (!rawTime) return
      const totalMinutes = (rawTime * multiplier / 60).toFixed(2)
      const paceMinutes = (Math.floor(totalMinutes)).toFixed(0)
      let rawPaceSeconds = (((totalMinutes) - paceMinutes) * 60).toFixed(0)
      let paceSeconds = rawPaceSeconds
      if (rawPaceSeconds < 10) {
        paceSeconds = '0' + rawPaceSeconds
      }
      return paceMinutes + ':' + paceSeconds + '/100m'
    },
    renderDate (rawDate, format) {
      if (!rawDate) return
      const convertedRawDate = new Date(rawDate)
      const today = new Date()
      const yesterday = new Date(today - 86400000)
      const lastWeek = new Date(today - (7 * 86400000))

      const todayDateOnly = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
      const yesterdayDateOnly = yesterday.getDate() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getFullYear()
      const rawDateOnly = convertedRawDate.getDate() + '-' + (convertedRawDate.getMonth() + 1) + '-' + convertedRawDate.getFullYear()

      if (rawDateOnly === todayDateOnly) return 'Today'
      if (rawDateOnly === yesterdayDateOnly) return 'Yesterday'
      if (convertedRawDate > lastWeek && convertedRawDate < today) {
        return convertedRawDate.getDay() === 0 ? this.dayLookUp[6] : this.dayLookUp[convertedRawDate.getDay() - 1]
      }
      if (format === 'long') {
        return moment(rawDate).format('Do MMMM YYYY')
      }
      return moment(rawDate).format('DD MMM YY')
    },
    renderDateTime (rawDate) {
      if (!rawDate) return
      return rawDate.substr(11, 5)
    },
    ordinalSuffixOf (num) {
      if (!num) return
      let digit = num
      let j = num % 10
      let k = num % 100

      if (num < 10 && num.length === 2) {
        digit = num.toString().substr(1, 1)
      }
      if (j === 1 && k !== 11) {
        return digit + 'st'
      }
      if (j === 2 && k !== 12) {
        return digit + 'nd'
      }
      if (j === 3 && k !== 13) {
        return digit + 'rd'
      }
      return digit + 'th'
    },
    renderDegTemp (rawTemp) {
      return rawTemp ? (rawTemp - 273).toFixed(0) + '°C' : null
    },
    renderWindSpeed (rawWindSpeed) {
      return rawWindSpeed ? `${(2.2369362920544 * rawWindSpeed).toFixed(0)}mph` : null
    }
  }
}
