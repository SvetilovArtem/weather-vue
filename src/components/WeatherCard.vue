<template>
  <div class="weather-card">
    <div class="city-name">{{ cityName }}, {{ country }}</div>
    <div class="weather-info">
      <img :src="setIcon(this.city)" alt="" class="weather-icon">
      <div class="weather-temp">{{ temp }}&#8451;</div>
    </div>
    <div class="weather-state">{{ descr }}</div>
    <div class="weather-data">
      <div class="data">
        <div class="arrow-wind"></div>
        <div class="data-param">{{ wind }} m/s</div>
      </div>
      <div class="data">
        <img src="../../public/press.svg" alt="" class="press-icon">
        <div class="data-param">{{ pressure }} Pa</div>
      </div>
    </div>
    <div class="visibility">Visibility: {{ visibility }} km</div>
  </div>
</template>

<style scoped>
@import '../assets/scss/weatherCard.scss';
</style>

<script>
import { actionTypes, getterTypes } from '@/store/modules/weather'

export default {
  name: 'WeatherCard',
  props: {
    city: {
      required: true
    }
  },
  data () {
    return {
      cityName: this.city.name,
      country: this.city.sys.country,
      temp: Math.round(this.city.main.temp),
      descr: this.city.weather[0]?.description,
      wind: this.city.wind.speed,
      pressure: this.city.main.pressure,
      visibility: this.city.visibility / 1000
    }
  },
  computed: {
    weatherDataForSelectedCities () {
      return this.$store.getters[getterTypes.weatherDataForSelectedCities]
    }
  },
  methods: {
    getWeather (city) {
      this.$store.dispatch(actionTypes.weather, { cityName: city })
    },
    setIcon (city) {
      return `http://openweathermap.org/img/w/${city.weather[0].icon}.png`
    }
  }
}

</script>
