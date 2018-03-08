export default {
  data () {
    return {
      dayLookUp: {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        0: 'Sunday'
      },
      monthLookUpLong: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
      },
      monthLookUpShort: {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
      }
    }
  },
  methods: {
    renderDistance: function (rawDistance) {
      return ((rawDistance) / 1000).toFixed(2) + 'km'
    },
    renderTime: function (rawTime) {
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
        return minutes + ':' + seconds
      } else {
        return hours + ':' + minutes + ':' + seconds
      }
    },
    renderPace: function (rawTime, rawDistance) {
      const totalMinutes = (rawTime / 60).toFixed(2)
      const paceMinutes = (Math.floor(totalMinutes / (rawDistance / 1000))).toFixed(0)
      let rawPaceSeconds = (((totalMinutes / (rawDistance / 1000)) - paceMinutes) * 60).toFixed(0)
      let paceSeconds = rawPaceSeconds
      if (rawPaceSeconds < 10) {
        paceSeconds = '0' + rawPaceSeconds
      }
      return paceMinutes + ':' + paceSeconds + '/km'
    },
    renderDate: function (rawDate, format) {
      const convertedRawDate = new Date(rawDate)
      const today = new Date()
      const yesterday = new Date(today - 86400000)
      const lastWeek = new Date(today - (7 * 86400000))

      const todayDateOnly = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
      const yesterdayDateOnly = yesterday.getDate() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getFullYear()
      const rawDateOnly = convertedRawDate.getDate() + '-' + (convertedRawDate.getMonth() + 1) + '-' + convertedRawDate.getFullYear()

      if (rawDateOnly === todayDateOnly) return 'Today'
      if (rawDateOnly === yesterdayDateOnly) return 'Yesterday'
      if (convertedRawDate > lastWeek) return this.dayLookUp[convertedRawDate.getDay()]
      if (format === 'long') {
        return this.ordinalSuffixOf(rawDate.substr(8, 2)) + ' ' + this.monthLookUpLong[parseInt(rawDate.substr(5, 2))] + ' ' + rawDate.substr(0, 4)
      }
      return rawDate.substr(8, 2) + ' ' + this.monthLookUpShort[parseInt(rawDate.substr(5, 2))] + ' ' + rawDate.substr(2, 2)
    },
    ordinalSuffixOf: function (num) {
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
    }
  }
}
