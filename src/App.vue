<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  components: {
    'app-header': Header
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
   @import 'assets/scss/application.scss'
</style>
