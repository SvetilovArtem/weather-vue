<template>
  <div class="cards">
    <button class="settings-btn material-symbols-outlined" @click="openSettings">settings</button>
    <settings-window
      :data="weatherDataForSelectedCities"
      :isOpen="isOpenSettings"
      :openSettings="openSettings">
    </settings-window>
    <weather-card v-for="city in weatherDataForSelectedCities" :key="city" :city="city"></weather-card>
    <div v-if="weatherDataForSelectedCities.length < 1">Выберите города ...</div>
  </div>
</template>
<style>
@import "@/assets/scss/weatherCards.scss";
</style>
<script>
import { defineComponent } from 'vue'
import WeatherCard from '@/components/WeatherCard.vue'
import { actionTypes, getterTypes } from '@/store/modules/weather'
import SettingsWindow from '@/components/SettingsWindow.vue'
import { getDeviceCoordinates } from '@/helpers/helpers'

export default defineComponent({
  name: 'WeatherCards',
  data () {
    return {
      isOpenSettings: false,
      currentPosition: {
        latitude: null,
        longitude: null
      }
    }
  },
  mounted () {
    getDeviceCoordinates()
      .then((coords) => {
        this.currentPosition = coords
        this.$store.dispatch(actionTypes.weatherFromCurrentPosition,
          { lat: String(this.currentPosition.latitude), lon: String(this.currentPosition.longitude) })
      })
      .catch(err => console.log('Error getDeviceCoordinates', err.message))
  },
  computed: {
    weatherDataForSelectedCities () {
      return this.$store.getters[getterTypes.weatherDataForSelectedCities]
    }
  },
  methods: {
    openSettings () {
      this.isOpenSettings = !this.isOpenSettings
    }
  },
  components: {
    SettingsWindow,
    WeatherCard
  }
})
</script>
