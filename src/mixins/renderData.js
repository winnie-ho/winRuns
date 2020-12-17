import moment from 'moment';

export default {
  data() {
    return {
      dayLookUp: {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday',
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
        11: 'December',
      },
    };
  },
  methods: {
    renderDistance(rawDistance, roundedWhole) {
      if (!rawDistance) return '-';
      return roundedWhole ? `${((rawDistance) / 1000).toFixed(0)}km` : `${((rawDistance) / 1000).toFixed(2)}km`;
    },
    renderElevation(rawElevation, short) {
      if (!rawElevation) return '-';
      return short ? `${(rawElevation).toFixed(0)}m` : `${(rawElevation).toFixed(2)}m`;
    },
    renderSwimDistance(rawDistance) {
      return rawDistance === 0 ? '-' : rawDistance && `${rawDistance.toFixed(0)}m`;
    },
    renderTime(rawTime, short) {
      if (!rawTime) return '-';

      const totalMinutes = (rawTime / 60).toFixed(2);
      const hours = Math.floor(totalMinutes / 60);
      const rawMinutes = (Math.floor(totalMinutes - (hours * 60))).toFixed(0);
      let minutes = rawMinutes;
      if (rawMinutes < 10) {
        minutes = `0${rawMinutes}`;
      }
      const rawSeconds = (((totalMinutes - (hours * 60)) - minutes) * 60).toFixed(0);
      let seconds = rawSeconds;
      if (rawSeconds < 10) {
        seconds = `0${rawSeconds}`;
      }
      if (hours === 0) {
        return short ? `${minutes}mins` : `${minutes}:${seconds}`;
      }
      return short ? `${hours}hrs` : `${hours}:${minutes}:${seconds}`;
    },
    renderPace(rawTime, rawDistance) {
      const totalMinutes = (rawTime / 60).toFixed(2);
      let paceMinutes = (Math.floor(totalMinutes / (rawDistance / 1000))).toFixed(0);
      const rawPaceSeconds = (((totalMinutes / (rawDistance / 1000)) - paceMinutes) * 60).toFixed(0);
      let paceSeconds = rawPaceSeconds;
      if (paceSeconds === '60') {
        paceSeconds = '00';
        paceMinutes = (parseInt(paceMinutes) + 1).toString();
      }
      if (rawPaceSeconds < 10) {
        paceSeconds = `0${rawPaceSeconds}`;
      }
      return `${paceMinutes}:${paceSeconds}/km`;
    },
    renderSwimPace(rawTime, rawDistance) {
      if (rawDistance === 0) return '-';
      const multiplier = 100 / rawDistance;
      const totalMinutes = (rawTime * multiplier / 60).toFixed(2);
      const paceMinutes = (Math.floor(totalMinutes)).toFixed(0);
      const rawPaceSeconds = (((totalMinutes) - paceMinutes) * 60).toFixed(0);
      let paceSeconds = rawPaceSeconds;
      if (rawPaceSeconds < 10) {
        paceSeconds = `0${rawPaceSeconds}`;
      }
      return `${paceMinutes}:${paceSeconds}/100m`;
    },
    renderSpeed(rawSpeed) {
      return `${(rawSpeed / 1000 * 60 * 60).toFixed(2)} km/h`;
    },
    renderDate(rawDate, format) {
      const convertedRawDate = new Date(rawDate);
      const today = new Date();
      const yesterday = new Date(today - 86400000);
      const lastWeek = new Date(today - (7 * 86400000));

      const todayDateOnly = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const yesterdayDateOnly = `${yesterday.getDate()}-${yesterday.getMonth() + 1}-${yesterday.getFullYear()}`;
      const rawDateOnly = `${convertedRawDate.getDate()}-${convertedRawDate.getMonth() + 1}-${convertedRawDate.getFullYear()}`;

      if (rawDateOnly === todayDateOnly) return 'Today';
      if (rawDateOnly === yesterdayDateOnly) return 'Yesterday';
      if (convertedRawDate > lastWeek && convertedRawDate < today) {
        return convertedRawDate.getDay() === 0 ? this.dayLookUp[6] : this.dayLookUp[convertedRawDate.getDay() - 1];
      }
      if (format === 'long') {
        return moment(rawDate).format('Do MMMM YYYY');
      }
      return moment(rawDate).format('DD MMM YY');
    },
    renderDateTime(rawDate) {
      return rawDate && rawDate.substr(11, 5);
    },
    renderHRZone(avgHR, HRZones) {
      switch (true) {
        case avgHR < HRZones.z0:
          return 'No Zone';
        case HRZones.z0 < avgHR && avgHR < HRZones.z1:
          return 'Zone 1';
        case HRZones.z1 < avgHR && avgHR < HRZones.z2:
          return 'Zone 2';
        case HRZones.z2 < avgHR && avgHR < HRZones.z3:
          return 'Zone 3';
        case HRZones.z3 < avgHR && avgHR < HRZones.z4:
          return 'Zone 4';
        case avgHR > HRZones.z4:
          return 'Zone 5';
        default:
          return '-';
      }
    },
    ordinalSuffixOf(num) {
      let digit = num;
      const j = num % 10;
      const k = num % 100;

      if (num < 10 && num.length === 2) {
        digit = num.toString().substr(1, 1);
      }
      if (j === 1 && k !== 11) {
        return `${digit}st`;
      }
      if (j === 2 && k !== 12) {
        return `${digit}nd`;
      }
      if (j === 3 && k !== 13) {
        return `${digit}rd`;
      }
      return `${digit}th`;
    },
    renderDegTemp(rawTemp) {
      return rawTemp ? `${(rawTemp - 273).toFixed(0)}°C` : null;
    },
    renderWindSpeed(rawWindSpeed) {
      return rawWindSpeed ? `${(2.2369362920544 * rawWindSpeed).toFixed(0)} mph` : null;
    },
    getMAFLimitData(dataPoints, z2) {
      if (!dataPoints) {
        return [];
      }
      const dataPointCount = dataPoints.length;
      const MAFLimitData = [];
      for (let i = 0; i < dataPointCount; i++) {
        MAFLimitData.push(z2);
      }
      return MAFLimitData;
    },
  },
};
