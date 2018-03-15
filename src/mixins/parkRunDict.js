export default {
  data () {
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
  }
}
