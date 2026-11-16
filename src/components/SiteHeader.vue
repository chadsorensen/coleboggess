<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const open = ref(false)
const scrolled = ref(false)
const route = useRoute()

const links = [
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const onScroll = () => (scrolled.value = window.scrollY > 10)
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') open.value = false
}

// Close the mobile menu whenever navigation happens
watch(() => route.fullPath, () => (open.value = false))
// Stop the page behind the open mobile menu from scrolling
watch(open, (isOpen) => document.documentElement.classList.toggle('no-scroll', isOpen))

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="header" :class="{ open, scrolled }">
    <nav id="site-nav" class="nav" aria-label="Main">
      <RouterLink to="/" class="site-title">Cole Boggess</RouterLink>
      <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link">
        {{ link.label }}
      </RouterLink>
    </nav>

    <button
      type="button"
      class="nav-trigger"
      aria-controls="site-nav"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="visually-hidden">{{ open ? 'Close' : 'Open' }} menu</span>
      <span class="bar" aria-hidden="true" />
      <span class="bar" aria-hidden="true" />
      <span class="bar" aria-hidden="true" />
    </button>

    <RouterLink to="/" class="logo" aria-label="Cole Boggess — home">
      <svg height="80" width="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4000 4000" aria-hidden="true">
        <path
          d="M1900.6 2138.1v378.1c0 1.3 1.1 2.4 2.4 2.4h299.3c2.2 0 3.3 2.5 1.7 4l-353.7 340.6c-1.5 1.5-.5 4 1.7 4h904.1c345.4 0 527.6-210.3 527.6-473.1 0-212.1-143.1-387.9-325.6-427-5-1.1-5.2-7.9-.2-9.2 161.1-42.1 290.5-185.9 290.5-397 0-233.9-176.8-446.8-522.2-446.8h-604.1c-1.5.2-2.3 2-1.6 3.3l-.7 310.8c0 .8.1 1.5.2 2.2.2 1.2 1.2 2 2.5 2l519.4-.4c130.5 0 212.1 84.1 212.1 191.9 0 113-81.6 194.5-212.1 194.5h-424.7c-.7 0-1.3.3-1.8.7l-314.1 317.2c-.5.6-.7 1.2-.7 1.8zm744.5 411.1h-378.9c-2.7 0-4.9-2.1-4.9-4.8v-403.1c0-2.6 2.2-4.8 4.9-4.8h378.9c152.3 0 233.9 94.6 233.9 205 0 126.2-87 207.7-233.9 207.7z"
        />
        <path
          d="M2074.4 1125.2l-1.6 294.1c0 6.8-5.8 12.4-12.9 12.4h-358.8c-464.1 0-728.5 257.7-727.6 566.8 1.2 435.7 405.4 556.4 748.7 556.4l394-.3-343.5 312.2h-60.5c-505.5 0-1055.8-268.6-1055.8-863.1 0-473 364.9-891 1050.5-891h354.7c7.1 0 12.9 5.6 12.8 12.5z"
        />
      </svg>
    </RouterLink>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: calc(var(--offset) * -1);
  padding: 25px var(--offset) 20px;
  background: var(--color-white);
  font-family: var(--font-display);
}

.nav {
  display: flex;
  align-items: baseline;
  text-transform: uppercase;
}

.site-title {
  font-size: 32px;
}

.nav-link {
  position: relative;
  top: -2px;
  margin-left: 40px;
  color: rgb(46 46 46 / 0.8);
  font-size: 14px;
  transition: color 0.25s ease-out;
}

.scrolled .nav-link {
  color: var(--color-gray);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: -5%;
  width: 110%;
  height: 1px;
  background: var(--color-gray-dark);
  transform: scaleX(0);
  transition: transform 0.3s var(--ease-out-expo);
}

.nav-link:is(:hover, :focus-visible, .router-link-active) {
  color: var(--color-gray-dark);
}

.nav-link:is(:hover, :focus-visible, .router-link-active)::after {
  transform: scaleX(1);
}

.logo {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  fill: #585655;
}

.logo svg {
  display: block;
}

.nav-trigger {
  display: none;
}

/* ---------- Small screens: full-height drawer ---------- */

@media (max-width: 800px) {
  .header {
    position: fixed;
    inset: 0 0 auto;
    flex-direction: column;
    align-items: flex-start;
    height: 90px;
    margin: 0;
    padding: 20px;
    overflow: hidden;
    border-bottom: 1px solid rgb(46 46 46 / 0.15);
    transition: height 0.3s var(--ease-out-quad);
  }

  .header.open {
    height: 100dvh;
    overflow-y: auto;
  }

  .nav {
    flex: 1;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 70px;
  }

  .site-title {
    display: none;
  }

  .nav-link {
    top: 0;
    margin: 4vh 0;
    padding: 10px 0;
    color: var(--color-gray-dark);
    font-size: 20px;
  }

  .logo {
    top: 5px;
    right: auto;
    left: 20px;
    transform: none;
  }

  .nav-trigger {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 90px;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
  }

  .bar {
    display: block;
    width: 20px;
    height: 2px;
    margin: 2px 0;
    background-color: var(--color-gray-dark);
    transition: all 0.3s cubic-bezier(0.86, 0.09, 0.03, 0.9);
  }

  .open .bar:nth-child(2) {
    transform: translateY(6px) rotate(45deg);
  }

  .open .bar:nth-child(3) {
    opacity: 0;
  }

  .open .bar:nth-child(4) {
    transform: translateY(-6px) rotate(-45deg);
  }
}
</style>
