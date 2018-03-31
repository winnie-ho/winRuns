<template>
  <div id='activities'>
    <nav-bar v-bind:pageTitle='pageTitle'></nav-bar>
    <div class='run-box' v-for='activity in activities' v-bind:key='activity.index' v-on:click='viewActivity(activity.id)'>
      <div class='run-box__detail'>
        <div class='heading'>{{ activity.name }}</div>
        <div class='date'>{{ renderDate(activity.start_date) }}</div>
      </div>
      <div class='run-box__detail'>
        <div class='data-metric'>
          <img src='../assets/icon_distance.png' class='icon dark-icon'/>
          {{ renderDistance(activity.distance) }}
        </div>
        <div class='data-metric'>
          <img src="../assets/icon_time.png" class="icon dark-icon">
          {{ renderTime(activity.moving_time) }}
        </div>
        <div class='data-metric'>
          <img src="../assets/icon_pace.png" class="icon dark-icon">
          {{ renderPace(activity.moving_time, activity.distance) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import renderData from '../mixins/renderData.js'

export default {
  name: 'activities',
  components: {
    'nav-bar': navBar
  },
  mixins: [ renderData ],
  data () {
    return {
      pageTitle: 'ACTIVITIES'
    }
  },
  mounted () {
  },

  created() {
  },

  methods: {
    viewActivity: function (activityId) {
      this.$store.dispatch('fetchActivity', activityId)
      this.$store.dispatch('fetchKudos', activityId)
      this.$store.dispatch('fetchPhotos', activityId)
      this.$store.dispatch('fetchComments', activityId).then(() => {
        this.$router.push('/activity/' + activityId)
      })
    }
  },
  computed: {
    activities: function() {
      return this.$store.state.activities;
    }
  }
}
</script>

<style scoped>
  #activities{
    background-color: rgb(232, 235, 240);
  }

  .run-box{
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    border-radius: 2px;
    margin: 1px 2px;;
    padding: 10px;
    cursor: pointer;
  }

  .run-box:hover{
    background-color: rgba(31, 97, 141, 0.8);
    color: white;
  }

  .run-box:hover .icon {
    filter: invert(0%);
  }

  .run-box__detail{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
</style>
