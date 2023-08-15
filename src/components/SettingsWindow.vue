<template>
  <div :class="classObj">
    <div class="settings-wrapper">
      <span class="close-btn material-symbols-outlined" @click="openSettings">close</span>
      <form action="#" class="add-form" @submit="getWeather">
        <input
          type="text"
          v-model="locationValue"
          placeholder="Add a new location ..."
          class="input-location"
        >
      </form>
      <draggable :cities="cities" class="city-tags" draggable=".city-tag">
        <li class="city-tag" v-for="(city, index) in cities" :key="index">
          <div class="tag-controls">
            <span class="line"></span>
            <span class="city-tag__name">{{city}}</span>
          </div>
          <span class="delete-btn material-symbols-outlined" @click="deleteCity">close</span>
        </li>
      </draggable>
    </div>
  </div>
</template>

<style>
@import "@/assets/scss/settingsWindow.scss";
</style>

<script>
import { actionTypes, getterTypes, mutationTypes } from '@/store/modules/weather'
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  name: 'SettingsWindow',
  data () {
    return {
      locationValue: ''
    }
  },
  props: {
    data: {
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    openSettings: {
      required: true
    }
  },
  computed: {
    weatherDataForSelectedCities () {
      return this.$store.getters[getterTypes.weatherDataForSelectedCities]
    },
    cities () {
      return this.data.map(el => el.name)
    },
    classObj () {
      return {
        _active: this.isOpen,
        settings: true
      }
    }
  },
  methods: {
    getWeather (e) {
      e.preventDefault()
      this.$store.dispatch(actionTypes.weather, { cityName: this.locationValue })
      this.locationValue = ''
    },
    deleteCity (city) {
      const tag = city.target.parentNode
      tag.classList.add('removed')
      function deleteCityWeatherObj () {
        this.$store.commit(mutationTypes.deleteCity, city)
      }
      setTimeout(deleteCityWeatherObj, 500)
    }
  },
  components: {
    draggable: VueDraggableNext
  }
}
</script>
