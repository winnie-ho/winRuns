<template>
  <div id='navBar'>
    <div id='openNavBar' class='row'>
      <router-link to="/" exact>
        <div class='data nav-button' id='home-button'>WIN RUNS</div>
      </router-link>

      <div id='page-title'>{{ pageTitle }}</div>

      <div id='pagesBar' class='row'>
        <router-link to="/runclub" exact>
          <div class='data nav-button'>
            <img src='../assets/icon_run4it.png' class='nav-icon'/>
          </div>
        </router-link>

        <router-link to="/parkrun" exact>
          <div class='data nav-button'>
            <img src='../assets/icon_park_run.png' class='nav-icon'/>
          </div>
        </router-link>

        <router-link to="/activities" exact>
          <div class='data nav-button'>
            <img src='../assets/icon_activities.png' class='nav-icon'/>
          </div>
        </router-link>
      </div>
    </div>

    <div id='burger' v-on:click='expandBurger = !expandBurger'>
      <img src='../assets/icon_burger.png' class='nav-icon'/>
      <div class='expanded-burger' v-bind:hidden=!expandBurger>
        <div class='burger-item row'>
          <router-link to="/" exact>HOME</router-link>
        </div>
        <div class='burger-item row'>
          <img src='../assets/icon_run4it.png' class='burger-icon'/>
          <router-link to="/runclub" exact>RUN CLUB</router-link>
        </div>
        <div class='burger-item row'>
          <img src='../assets/icon_park_run_logo.png' class='burger-icon'/>
          <router-link to="/parkrun" exact>PARK RUN</router-link>
        </div>
        <div class='burger-item row'>
          <img src='../assets/icon_activities.png' class='burger-icon'/>
          <router-link to="/activities" exact>ACTIVITIES</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data () {
    return {
      expandBurger: false
    }
  },
  props: {
    pageTitle: {
      type: String,
      required: true
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  [hidden] {
    display: none !important;
  }

  #page-title {
    justify-content: center;
    width: 100%;
    position: absolute;
    display: flex;
  }

  @keyframes expand-vertical {
    from {
      height: 30px;
    }
    to {
      height: 200px;
    }
  }

  #burger {
    visibility: hidden;
    position: absolute;
    top: 7px;
    right: 10px;
    cursor: pointer;
    filter: invert(60%);
  }

  #burger img {
    pointer-events: none;
  }

  .expanded-burger {
    display: flex;
    flex-direction: column;
    visibility: visible;
    position: absolute;
    top: 0px;  
    right: -3px;
    width: 80vw;
    text-align: right;  
    background-color: rgba(212, 217, 221, 0.95);
    padding: 10px;
    border-radius: 2px;
    z-index: 2;

    animation-name: expand-vertical;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  .burger-item {
    height: 40px;
    margin: auto 0;
    align-items: center;
    justify-content: flex-start;
  }

  .burger-item a {
    color: #2c3e50;
    text-decoration: none;
  }

  .burger-item:hover {
    border-left: 3px solid slategray;
    background-color: rgba(62, 159, 223, 0.527);
  }

  #openNavBar {
    display: flex;
    justify-content: flex-end;
    padding: 5px 0;
    position: relative;
  }

  #pagesBar {
    display: flex;
    visibility: visible;
    justify-content: space-around;
    width: 300px;
    padding: 0 20px;
  }

  .burger-icon {
    width: 30px;
    height: auto;
    margin: 0 10px;
    filter: invert(60%)
  }

  .nav-button {
    cursor: pointer;
  }

  .button-active {
    background-color: #3E9FDF;
    transform: scale(1.1);
    padding: 0 7px;
    border-radius: 5px;
  }

  #home-button {
    font-family: sans-serif;
    color: transparent;
    font-weight: lighter;
    position: absolute;
    padding: 3px;
    padding-left: 10px;
    top: 4px;
    left: -5px;
    font-size: 18px;
    line-height: 90%;
    word-spacing: 100vw;

    animation-name: title-settle;
    animation-duration: 0.5s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }

  @keyframes title-settle {
    from {
      width: 0px;
      color: transparent;
    }
    to {
      width: 60px;
      color: white;
      background-color: rgba(31, 97, 141, 0.7);
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }

  .splits-button {
    position: absolute;
    display: flex;
    align-items: center;
    top: 50px;
    right: 5px;
    cursor: pointer;
    font-size: 12px;
    z-index: 0;
  }

  .graphs-button {
    right: 40px;
  }

  .button-icon {
    width: auto;
    height: 25px;
    margin: 0 5px;
  }

/* responsive css  */
@media all and (max-width: 1000px) {
  #burger {
    visibility: visible;
  }

  #pagesBar {
    visibility: hidden;
  }
}
</style>
