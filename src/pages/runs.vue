<template>
  <div id='runs'>
    <nav-bar></nav-bar>
    <div v-for="(activity, index) in activities" v-bind:key='index' class='run-box'>
      <div class='run-box__detail'>
        <div class='activity-summary__heading'>
          {{ activity.name }}
        </div>
        <div class='date date-metric'>
          {{ activity.start_date }}
        </div>

      </div>
      <div class='run-box__detail'>
        <div class='data-metric'>
          <img src='../assets/icon_distance.png' class='icon'/>
          {{ activity.distance/1000 + 'km' }}
        </div>
        <div class='data-metric'>
          <img src="../assets/icon_time.png" class="icon">
          {{ activity.moving_time/60 }}
        </div>
        <div class='data-metric'>
          <img src="../assets/icon_pace.png" class="icon">
          {{ activity.moving_time/60 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'

export default {
  name: 'runs',
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
    this.$store.dispatch('fetchActivities')
  },

  methods: {
  },
  computed: {
    activities: function() {
      return this.$store.state.activities;
    }
  }
}
</script>

<style scoped>
  .run-box{
    background-color: rgba(31, 97, 141, 0.7);
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    border-radius: 2px;
    margin: 1px 2px;;
    padding: 5px;
    cursor: pointer;
  }

  .run-box__detail{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }

  .activity-summary__heading{
    font-size: 14px;
    font-weight: bold;
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
</style>
