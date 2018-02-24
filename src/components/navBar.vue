<template>
  <div id='navBar'>
    <div class="data hover nav-button" id='home-button'  v-on:click='handleNavButton(`home`)'>WIN RUNS</div>
      <div class="data hover nav-button" id='run-club-button' v-on:click='handleNavButton(`run-club-home`)'>
      <img src='../assets/icon_run4it.png' class='nav-icon'/>
    </div>
    <div class='data hover nav-button' id='park-run-home-button' v-on:click='handleNavButton(`park-run-home`)'>
      <img src='../assets/icon_park_run.png' class='nav-icon'/>
    </div>
    <div class='data hover nav-button' id='runs-button' v-on:click='handleNavButton(`runs`)'>
      <img src='../assets/icon_runs.png' class='nav-icon'/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data () {
    return {
      msg: 'I am the nav bar'
    }
  },

  methods: {
    resetPages: (navId) => {
      page.$refs.navBar.pages.forEach(page => {
        if (page !== navId) {
          document.getElementById(page).style.display="none";
        }
      });
    },
    
    handleNavButton: (navId) => {
      page.$refs.navBar.resetPages(navId);
      document.getElementById(navId).style.display = "block";
      
      switch(navId) {
        case "home":
          document.getElementById("weather-now").style.display = "flex";
        case "park-run-home":
          initParkRun();
          break;
        case "run-club-home":
          fetchRunClub();
          fetchRunClubMembers();    
          computeRunClubRuns(responseRuns);
          renderRunClubHome(runClubRuns);
          break;
        case "runs": 
          showRun(responseRuns);
        case "park-run-graphs":
          kmChart(parkRuns);
          break;
        default:
          return;
      }
    },

    handleToggleButton: (toggleId, id) => {
      let idTarget = document.getElementById(id);
      let target = document.getElementById(toggleId);
      if (target.style.display === 'flex' || target.style.display === "grid") {
        target.style.display = "none";
        idTarget.classList.remove('button-active');
      } else if (target.style.display === 'none') {
        page.$refs.navBar.detailedViews.forEach(detailedView => {
        document.getElementById(detailedView+"-detail").style.display = "none";
        document.getElementById(detailedView+"-button").classList.remove('button-active');
      });
          
        if (target.style.display === 'none') {
          target.style.display = "flex";
          idTarget.classList.add('button-active');
        }
        
        if (toggleId === "kudos-detail") {
          target.style.display = "grid";
          idTarget.classList.add('button-active');
        }
      }
    },
  }
}
</script>

<style scoped>
  #navBar{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: auto;
  z-index: 99;
  padding: 5px 0;
  position: relative;
}

.nav-icon{
  width: auto;
  height: 30px;
  margin: 0 5px;
}

.nav-icon:hover{
  transform: scale(1.1);
}

.nav-button{
  cursor: pointer;
}

.button-active{
  background-color: #3E9FDF;
  transform: scale(1.1);
  padding: 0 7px;
  border-radius: 5px;
}

.hover:hover{
  color: #3E9FDF;
}

#run-club-button{
  margin-left: 75px;
}

#home-button{
  font-family: sans-serif;
  color: transparent;
  font-weight: lighter;
  position: absolute;
  padding: 3px;
  padding-left: 10px;
  top: 0px;
  left: -5px;
  font-size: 18px;
  line-height: 90%;
  word-spacing: 100vw; 

  animation-name: title-settle;
  animation-duration: 0.5s;
  animation-delay: 2s;
  animation-fill-mode: forwards;
}

@keyframes title-settle {
  from {
    width: 0px; 
    color: transparent
  }
  to {
    width: 60px; 
    color: white;
    background-color: rgba(31, 97, 141, 0.7);
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
}

.splits-button{
  position: absolute;
  display: flex;
  align-items: center;
  top: 50px;
  right: 5px;
  cursor: pointer;
  font-size: 12px;
  z-index: 0;
}

.graphs-button{
  right: 40px;
}


.button-icon{
  width: auto;
  height: 25px;
  margin: 0 5px;
}


/* responsive css  */
@media all and (max-width: 400px) {
  #title{
     font-size: 16px; 
  }

}
</style>
