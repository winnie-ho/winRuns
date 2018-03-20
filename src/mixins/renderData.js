export default {
  data () {
    return {
      dayLookUp: {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
      },
      monthLookUp: {
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
      }
    }
  },
  methods: {
    renderDistance: function (rawDistance) {
      if (!rawDistance) return
      return ((rawDistance) / 1000).toFixed(2) + 'km'
    },
    renderTime: function (rawTime) {
      if (!rawTime) return
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
    renderDate: function (rawDate, format) {
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
      if (convertedRawDate > lastWeek) return this.dayLookUp[convertedRawDate.getDay()]
      if (format === 'long') {
        return this.ordinalSuffixOf(rawDate.substr(8, 2)) + ' ' + this.monthLookUp[parseInt(rawDate.substr(5, 2))] + ' ' + rawDate.substr(0, 4)
      }
      return rawDate.substr(8, 2) + ' ' + (this.monthLookUp[parseInt(rawDate.substr(5, 2))]).substr(0, 3) + ' ' + rawDate.substr(2, 2)
    },
    ordinalSuffixOf: function (num) {
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
    }
  }
}
