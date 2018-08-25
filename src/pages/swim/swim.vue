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
      lapDistance: 0,
      swimName:'New Swim',
      swimDescription: '',
      swimPrivacy: 0,
    }
  },
  mounted () {
  },

  created () {
  },

  methods: {
    readFile: async function(event) {
      this.file = '';
      const input = event.target;
      if (input.files.length === 0) {
        this.status = "Please select a file."
      } else {
        this.status = ""
        const reader = new FileReader();

        reader.onload = (e) => {
          this.file = e.target.result;
        }
        reader.readAsText(input.files[0]);
      }
    },

    updateActivity: function(result) {
      if (!result) {
        this.status = "Please select a file"
        return
      }
      const laps = this.selectLaps(result);
      this.renderLapDistanceTotal(laps);

      result.TrainingCenterDatabase.Activities[0].Activity[0]['$'] = {"Sport": "Swim"};
      this.renderFile(result);
    },

    parseFile: async function(file){
      let parser = new xml2js.Parser();

      let parsedFile = await parser.parseString(file, (err, result) => {
        if (err) {
          console.log('ERROR IN PARSING', err)
        } 

        this.updateActivity(result);
      });

    },

    selectLaps: function(data) {
      if (!data) return
      return data.TrainingCenterDatabase.Activities[0].Activity[0].Lap;
    },

    renderLapDistanceTotal: function(laps) {
      if (!laps) return
      let lapIndex = 0;
      return laps.map(lap => {
        let incrementalLapDistance = lapIndex * this.lapDistance;
        let trackpoints = lap.Track[0].Trackpoint;
        lapIndex ++;
        return Object.assign(lap, {
          DistanceMeters: this.lapDistance,
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

    renderFile: async function(data) {
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(data);
      const file = await this.writeFile(xml);
      await this.uploadToStrava(file);
      // await this.getUploadStatus();
    },

    writeFile: function (xml) {
      let swimFile = new File([xml], 'outputSwim.tcx', {type:'text/plain'});

      let downloadLink = document.createElement("a");
      downloadLink.download = "outputSwim.tcx";
      downloadLink.innerHTML = "Download Swim";
      if (window.webkitURL != null)
      {
        downloadLink.href = window.webkitURL.createObjectURL(swimFile);
      }
      else
      {
        downloadLink.href = window.URL.createObjectURL(swimFile);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
      }
      downloadLink.click();
      return swimFile;
    },

    uploadToStrava: function (file) {
      let formData = new FormData();
      formData.append('name', this.swimName);
      formData.append('description', this.swimDescription);
      formData.append('file', file, 'outputSwim.tcx');
      formData.append('private', this.swimPrivacy);
      formData.append('data_type', 'tcx');
      formData.append('external_id', 'winSwimsTest');
      formData.append('activity_type', 'swim');

      this.$store.dispatch('uploadStravaActivity', formData)
    },

    getUploadStatus: function () {
      if (!this.$store.state.uploadStravaActivityResponse) return;
      console.log('ID', this.$store.state.uploadStravaActivityResponse)
      this.$store.dispatch('getStravaUpload', this.$store.state.uploadStravaActivityResponse.id)
    },

    setSwimName: function () {
      this.swimName = document.getElementById('swimName').value
    },

    setSwimDescription: function () {
      this.swimDescription = document.getElementById('swimDescription').value
    },

    setPoolLength: function () {
      this.lapDistance = document.getElementById('poolLength').value
    },

    setSwimPrivacy: function () {
      if (document.getElementById('swimPrivacy').checked) {
        this.swimPrivacy = 1
      } else {
        this.swimPrivacy = 0
      }
    }
  },
  computed: {
    stravaStatus: function () {
      if (!this.$store.state.uploadStravaActivityResponse) return;
      if (this.$store.state.uploadStravaActivityResponse.status === 'Your activity is still being processed.') {
        return "Your swim is uploading. Check your Strava in a few moments.";
      } else {
        return this.$store.state.uploadStravaActivityResponse.status;
      }
    },

    disableButton: function () {
      return !(this.lapDistance && this.file);
    }
  }
}
</script>
