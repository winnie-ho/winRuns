<template>
  <div id='viewActivity'>
    <nav-bar></nav-bar>
    <div id="activity-info" class="run-box__detail">
      <div id="activity-info__header" class="row sb">
        <div class="heading">{{ activity.name }}</div>
        <div class="date data-metric">{{ renderDate(activity.start_date) }}</div>
      </div>

      <div class="row sa">
        <div class="data-metric">{{ renderDistance(activity.distance) }}</div>
        <div class="data-metric">{{ renderTime(activity.moving_time) }}</div>
        <div class="data-metric">{{ renderPace(activity.moving_time, activity.distance) }}</div>
      </div>
      
      <div class="row sa">
        <div class="row" v-on:click='openLaps =!openLaps'> 
          <img class="icon" src="../assets/icon_laps.png"/>
          <div id="laps" class="data-metric">{{ lapsCount }}</div>
        </div>
        <div class="data-metric">
          ♡ {{ activity.average_heartrate }}</div>
        <div class="data-metric">
          ↻ {{ activity.average_cadence }}</div>
      </div>
      
      
      <div class="row sa">
        <div class="row" v-on:click='openComments = !openComments'>
          <img class="icon" src="../assets/icon_comment.png"/>
          <div class="data-metric">{{ comments.length }}</div>
        </div>

        <div class="row" v-on:click='openKudos = !openKudos'>
          <img class="icon" src="../assets/icon_like.png"/>
          <div class="data-metric">{{ kudos.length }}</div>
        </div>
        
        <div class="row" v-on:click='openPhotos = !openPhotos'> 
          <img class="icon" src="../assets/icon_picture.png"/>
          <div class="data-metric">{{ photos.length }}</div>
        </div>
      </div>

      <div id="kudos-detail" v-show='openKudos'>
        <div class='col' v-for='kudo in kudos' v-bind:key='kudo.index'>
          <img v-bind:src='kudo.profile' class='avatar' />
          {{ kudo.firstname }}
        </div>
      </div>
      <div id="comments-detail" class="col sb" v-show='openComments'>
        <div class='row' v-for='comment in comments' v-bind:key='comment.index'>
          <img v-bind:src='comment.athlete.profile' class='avatar'/>
          {{ comment.text }}
        </div>
      </div>
      <div id="photos-detail" class="col sb" v-show='openPhotos'>
        <img class='photo' v-bind:src="photo.urls['1000']" v-for='photo in photos' v-bind:key='photo.index'/>
      </div>

      <div id="laps-detail" class="col sb">
        <div id="laps-calc-result" class="row sa"></div>

        <div id="laps-list" class="col sb" v-show='openLaps' v-for='lap in laps' v-bind:key='lap.index'>
          <div class='row sa lap'>
            <div>{{ lap.lap_index }}</div>
            <div>{{ renderTime(lap.moving_time) }}</div>
          </div>
        </div>
      </div>

    </div>

    <google-map name='view-activity'></google-map>
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import renderData from '../mixins/renderData.js'
import googleMap from '../components/googleMap.vue'

export default {
  name: 'viewActivity',
  components: {
    'nav-bar': navBar,
    'google-map': googleMap
  },
  mixins: [ renderData ],
  data () {
    return {
      openLaps: false,
      openComments: false,
      openKudos: false,
      openPhotos: false
    }
  },
  mounted () {
  },

  created() {

  },

  methods: {
  },
  computed: {
    activity: function() {
      return this.$store.state.activity
    },
    comments: function() {
      return this.$store.state.comments
    },
    kudos: function() {
      return this.$store.state.kudos
    },
    photos: function() {
      return this.$store.state.photos
    },
    lapsCount: function() {
      if (!this.$store.state.activity.laps) return
      return this.$store.state.activity.laps.length
    },
    laps: function() {
      return this.$store.state.activity.laps
    }
  },
}
</script>

<style scoped>
  #activity-info{
    position: absolute;
    display: block;
    flex-direction: column;
    z-index: 1;
    width: 100%;
    background-color: rgba(31, 97, 141, 0.9);
    box-shadow: 0 0 80px 50px rgba(31, 97, 141, 0.9);
    overflow-y: scroll;
    overflow-x: hidden; 
    max-height: 92%; 
    color: white;
  }

  #activity-info__header {
    padding: 10px;
  }

  .lap {
    width: 100vw;
  }

  #kudos-detail{
    margin-top: 20px;  
    display: grid;
    align-items: center;
    grid-template-rows: 38% 100px auto;
    justify-content: center;
    grid-template-columns: 100px 100px 100px 100px;
  }

  #comments-detail{
    align-items: unset;
    margin: 10px;
    padding: 20px;
  }

  #photos-detail{
    margin-top: 10px;
  }

  .photo{
    height: auto;
    width: 98%;
    margin: 2px;
  }
</style>
