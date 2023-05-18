<script>
import AppHeader from './components/AppHeader.vue';
export default {
  name: 'App',
  components: { AppHeader },
};
</script>

<template>
  <app-header />
  <router-view />
</template>
