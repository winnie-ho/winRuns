<template src='./swim.html'></template>
<style scoped src='./swim.css'></style>

<script>
import navBar from '../../components/navBar/navBar.vue'
import xml2js from 'xml2js'
import * as fs from 'fs-web'


export default {
  name: 'swim',
  components: {
    'nav-bar': navBar
  },
  data () {
    return {
      pageTitle: 'SWIM',
      status: '',
      file: '',
      lapDistance: 50
    }
  },
  mounted () {
  },

  created () {
  },

  methods: {
    readFile: async function(event) {
      const input = event.target;
      if (input.files.length === 0) {
        this.status = "Please select a file."
      } else {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.file = e.target.result;
        }
        reader.readAsText(input.files[0]);
        this.status = "Successfully imported file.";
      }
    },

    updateActivity: function(result) {
      const laps = this.selectLaps(result);
      this.renderLapDistanceTotal(laps);

      result.TrainingCenterDatabase.Activities[0].Activity[0]['$'] = {"Sport": "Swim"};
      this.renderFile(result);
    },

    parseFile: async function(file){
      console.log('startParse', file)
      let parser = new xml2js.Parser();

      let parsedFile = await parser.parseString(file, (err, result) => {
        if (err) {
          console.log('ERROR IN PARSING', err)
        } 

        console.log('RESULT', result)
        this.updateActivity(result);
      });

    },

    selectLaps: function(data) {
      console.log('data', data)
      return data.TrainingCenterDatabase.Activities[0].Activity[0].Lap;
    },

    renderLapDistanceTotal: function(laps) {
      let lapIndex = 0;
      return laps.map(lap => {
        let incrementalLapDistance = lapIndex * this.lapDistance;
        let trackpoints = lap.Track[0].Trackpoint;
        lapIndex ++;
        return Object.assign(lap, {
          DistanceMeters: 50,
          Track: {
              Trackpoint: this.renderTrack(trackpoints, incrementalLapDistance)
          }
        })
      })
    },

    renderTrack: function(trackpoints, incrementalLapDistance) {
      let increment = this.lapDistance/trackpoints.length;
      let updatedTrack = [];
      for (let i = 0; i < trackpoints.length; i ++) {
          let updatedTrackpoint = Object.assign(trackpoints[i], {
              DistanceMeters: [(incrementalLapDistance + (i * increment)).toFixed(2)]
          });
          updatedTrack.push(updatedTrackpoint);
          delete updatedTrackpoint.Extensions
      }
      return updatedTrack;
    },

    generateSwim: function() {
      this.parseFile(this.file)
    },

    renderFile: function(data) {
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(data);
      this.writeFile(xml);
    },

    writeFile: function (xml) {
      // fs.writeFile('./today.tcx', xml, (err) => {  
      // // throws an error, you could also catch it here
      // if (err) throw err;
  
      console.log('Saved!', xml);

      let newActivity = {
        file: "./sample.tcx",
        // "name": 'New Swim',
        // "description": '',
        // "private": true,
        // "trainer": false,
        // "commute": false,
        data_type: 'tcx',
        external_id: "winSwims Test"
      }
      let actionParameters = [ newActivity ]
      console.log('NEW ACTIVITY', newActivity.externalId)
      this.$store.dispatch('uploadStravaActivity', newActivity)

    // });
    }

  },
  computed: {

  }
}
</script>
