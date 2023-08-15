<template>
  <div class="home">
    <weather-cards></weather-cards>
  </div>
</template>

<style>
  .home {
    margin: 0 auto;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import WeatherCards from '@/components/WeatherCards.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    WeatherCards
  }
})
</script>
