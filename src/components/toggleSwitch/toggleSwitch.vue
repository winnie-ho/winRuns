<template src="./toggleSwitch.html"></template>
<style scoped src='./toggleSwitch.css'></style>

<script src>
  export default {
    name: 'toggleSwitch',
    data () {
      return {
        checked: false
      }
    },
    
    props: [],
    methods: {
    },
    computed: {
      toggleSetting: function() {
        this.$emit('onToggleSwitchChange', this.checked);
      }
    }
  }
</script>

