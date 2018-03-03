<template>
  <div id='navBar'>
    <div id='openNavBar' class='row'>
      <router-link to="/" exact>
        <div class='data hover nav-button' id='home-button'>
          WIN RUNS
        </div>
      </router-link>

      <div id='pagesBar' class='row'>
        <router-link to="/runclub" exact>
          <div class='data hover nav-button' id='run-club-button'>
            <img src='../assets/icon_run4it.png' class='nav-icon'/>
          </div>
        </router-link>

        <router-link to="/parkrun" exact>
          <div class='data hover nav-button' id='park-run-home-button'>
            <img src='../assets/icon_park_run.png' class='nav-icon'/>
          </div>
        </router-link>

        <router-link to="/runs" exact>
          <div class='data hover nav-button' id='runs-button'>
            <img src='../assets/icon_runs.png' class='nav-icon'/>
          </div>
        </router-link>
      </div>
    </div>
    <div id='burger' v-on:click='expandBurger = !expandBurger'>
      <img src='../assets/icon_burger.png' class='nav-icon'/>
      <div class='expanded-burger' v-bind:hidden=expandBurger>
        <p>Home</p>
        <p>Run Club</p>
        <p>Park Run</p>
        <p>Runs</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data () {
    return {
      expandBurger: true
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  #burger {
    visibility: hidden;
    position: absolute;
    top: 7px;
    right: 10px;
    z-index: 1px;
  }

  .expanded-burger {
    visibility: visible;
    position: absolute;
    top: 2px;  
    right: 2px;
    width: 100px;
    text-align: right;  
    background-color: rgba(212, 217, 221, 0.8);
    padding: 10px;
  }

  #openNavBar {
    display: flex;
    background-color: slategrey;
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

  .row {
    flex-direction: row;
  }

  .col {
    flex-direction: column;  
  }

  .nav-icon {
    width: auto;
    height: 30px;
    margin: 0 5px;
  }

  .nav-icon:hover {
    transform: scale(1.1);
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

  .hover:hover {
    color: #3E9FDF;
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
@media all and (max-width: 600px) {
  #title {
     font-size: 16px;
  }

  #burger {
    visibility: visible;
  }

  #pagesBar {
    visibility: hidden;
  }
}
</style>
