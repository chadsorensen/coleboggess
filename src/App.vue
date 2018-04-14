<template>
  <div id="app">
    <app-header></app-header>
    <transition name="fade" transition-mode="in-out">
      <router-view/>
    </transition>
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
