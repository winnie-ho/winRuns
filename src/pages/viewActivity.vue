<template>
  <div id='viewActivity'>
    <nav-bar></nav-bar>
    VIEW ACTIVITY
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
    this.$store.dispatch('fetchActivities')
  },

  methods: {
    viewRun: function() {
      console.log("viewRun clicked")
    }
  },
  computed: {
    activities: function() {
      return this.$store.state.activities;
    }
  },
  mixins: [ renderData ]
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
