<template>
  <div id='viewActivity'>
    <nav-bar></nav-bar>
    <div id="activity-info" class="run-box__detail" >
      <div class="row sb header">
        <div class="title">{{ activity.name }}</div>
        <div class="date data-metric">{{ renderDate(activity.start_date) }}</div>
      </div>

      <div class="row sa">
        <div class="data-metric">{{ renderDistance(activity.distance) }}</div>
        <div class="data-metric">{{ renderTime(activity.moving_time) }}</div>
        <div class="data-metric">{{ renderPace(activity.moving_time, activity.distance) }}</div>
      </div>
      
      <div class="row sa">
        <div id="laps-button" class="icon-stat" onclick="page.$refs.navBar.handleToggleButton('laps-detail', 'laps-button')"> 
          <img class="activity-icon nav-icon" src="../assets/icon_laps.png"/>
          <div id="laps" class="data-metric">{{ lapsCount }}</div>
        </div>
        <div class="data-metric">{{ activity.average_heartrate }}</div>
        <div class="data-metric">{{ activity.average_cadence }}</div>
      </div>
      
      
      <div class="row sa">
        <div id="comments-button" class="icon-stat" onclick="page.$refs.navBar.handleToggleButton('comments-detail', 'comments-button')" >
          <img class="activity-icon nav-icon" src="../assets/icon_comment.png"/>
          <div class="data-metric">{{ comments.length }}</div>
        </div>

        <div id="kudos-button" class="icon-stat" onclick="page.$refs.navBar.handleToggleButton('kudos-detail', 'kudos-button')" >
          <img class="activity-icon nav-icon" src="../assets/icon_like.png"/>
          <div class="data-metric">{{ kudos.length }}</div>
        </div>
        
        <div id="photos-button" class="icon-stat" onclick="page.$refs.navBar.handleToggleButton('photos-detail', 'photos-button')"> 
          <img class="activity-icon nav-icon" src="../assets/icon_picture.png"/>
          <div class="data-metric">{{ photos.length }}</div>
        </div>
      </div>

      <!-- <div id="kudos-detail" style="display: none"></div>
      <div id="comments-detail" class="col sb" style="display: none"></div>
      <div id="photos-detail" class="col sb" style="display: none"></div>
      <div id="laps-detail" class="col sb" style="display: none">
        <div id="laps-calc-result" class="row sa"></div>
        <div id="laps-list" class="col sb"></div>
      </div> -->

    </div>

    <div id="map"></div>
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import renderData from '../mixins/renderData.js'

export default {
  name: 'viewActivity',
  components: {
    'nav-bar': navBar
  },
  data () {
    return {
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
    }
  },
  mixins: [ renderData ]
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

  .header{
    padding: 20px;
  }

  .title{
    font-size: 20px;
    font-weight: 600;
  }

  .row{
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
  }

  .sb{
    justify-content: space-between;
  }

  .sa{
    justify-content: space-around;
  }

  .date{
    width: 200px;
    text-align: right;
  }

  .date-metric{
    font-size: 12px;
  }

  .icon{
    height: 20px;
    width: auto;
    margin: 0 5px;
  }

  .nav-icon{
    width: auto;
    height: 30px;
    margin: 0 5px;
  }

  .icon-stat{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 27px;
    justify-content: space-between;
    cursor: pointer;
  }

  .activity-icon{
    height: 13px;
    width: auto;
  }
</style>
