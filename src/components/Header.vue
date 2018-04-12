<template>
  <header role="banner" class="nav-wrap" v-bind:class="{ active: isOpen, scrolled: scrolled }">
    <router-link to="/" class="site-title" v-on:click.native="closeMobileMenu()">Cole Boggess</router-link>
    <div class="mobile-nav-trigger" @click="toggleMobileMenu()">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <nav role="navigation" class="navbar">
      <router-link to="/projects" v-on:click.native="closeMobileMenu()">Projects</router-link>
      <router-link to="/about" v-on:click.native="closeMobileMenu()">About</router-link>
      <router-link to="/contact" v-on:click.native="closeMobileMenu()">Contact</router-link>
    </nav>
  </header>
</template>

<script>

export default {
  data() {
    return {
      scrolled: false,
      isOpen: false,
    }
  },
  methods: {

    closeMobileMenu: function() {
      this.isOpen = false
    },
    toggleMobileMenu: function() {
      this.isOpen = !this.isOpen
    },
    handleScroll () {
      this.scrolled = window.scrollY > 10;
    }
  },
  beforeMount () {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>