<template>
  <div id='week-activities'>
    <div id="week-header">
      <!-- <div onclick="changeWeek(1)" ><strong><</strong></div>
        <div class="heading" id="dateInView"></div>
      <div onclick="changeWeek(-1)" id="previous"><strong>></strong></div> -->
    </div>

    <div id='week-container'>
      <div v-for="day in daysOfWeek" :key="day" class='day-bar'>
        <div class='day-title'>
          {{ (day.substr(0, 3)).toUpperCase() }}
        </div>
        <div class='day-content'>
          something
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'weekActivities',
  components: {
  },
  data () {
    return {
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    }
  },
  created() {
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>
  #week-activities {
    bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 0;
  }

  #week-header{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    height: 40px;
  }

  .day-bar {
    display: flex;
    flex-direction: row;
    width: 90vw;
    align-items: center;
    padding: 5px 0;
  }

  .day-title {
    background-color: rgba(31, 97, 141, 0.7);
    padding: 10px 0;
    margin-left: 0px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    display: flex;
    flex-direction: row;
    color: white;

    animation-name: day-settle;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    width: 50px;
    height: 25px;
    align-content: center;
    align-items: center;
  }


  @keyframes day-settle--active {
    from {
      width: 37px; 
      color: transparent
    }
    to {
      width: 79%;
      color: white;
    }
  }
</style>
