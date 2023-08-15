import axiosApi, { ICurrentPosition } from '@/api/weather'
import { Weather } from '@/types/types'

interface IState {
  weatherData: Weather | null,
  weatherDataForSelectedCities: Weather[],
  isLoading: boolean,
  location: string
}

export const actionTypes = {
  weather: '[weather] weather',
  weatherFromCurrentPosition: '[weather] get weather from current position'
}

export const mutationTypes = {
  loadingStart: '[weather] loadingStart',
  loadingSuccess: '[weather] loadingSuccess',
  loadingFailure: '[weather] loadingFailure',
  deleteCity: '[weather] remove city'
}

export const getterTypes = {
  isLoading: '[weather] isLoading',
  weatherData: '[weather] weatherData',
  weatherDataForSelectedCities: '[weather] weatherDataForSelectedCities'
}
const state = {
  selectedCities: [],
  weatherData: null,
  weatherDataForSelectedCities: [],
  isLoading: false
}

const getters = {
  [getterTypes.isLoading]: (state:IState) => state.isLoading,
  [getterTypes.weatherData]: (state:IState) => state.weatherData,
  [getterTypes.weatherDataForSelectedCities]: (state:IState) => state.weatherDataForSelectedCities
}

const mutations = {
  [mutationTypes.loadingStart] (state: IState) {
    state.isLoading = true
  },
  [mutationTypes.loadingSuccess] (state: IState, payload: any) {
    state.isLoading = false
    state.weatherData = payload
    if (!state.weatherDataForSelectedCities.find(item => item.name === payload.name)) {
      state.weatherDataForSelectedCities = [...state.weatherDataForSelectedCities, payload]
    }
  },
  [mutationTypes.loadingFailure] (state: IState) {
    state.isLoading = false
  },
  [mutationTypes.deleteCity] (state: IState, payload: string) {
    state.weatherDataForSelectedCities = state.weatherDataForSelectedCities.filter(city => city.name !== payload)
  }
}

const actions = {
  [actionTypes.weather] (context: any, credentials: ICurrentPosition) {
    context.commit(mutationTypes.loadingStart)
    return new Promise(resolve => {
      axiosApi.getCurrentWeather(credentials)
        .then(resp => {
          console.log(resp.data)
          resolve(resp.data)
          context.commit(mutationTypes.loadingSuccess, resp.data)
        })
        .catch(err => {
          console.log('ERRORS', err)
          context.commit(mutationTypes.loadingFailure)
        })
    })
  },
  [actionTypes.weatherFromCurrentPosition] (context: any, credentials: any) {
    context.commit(mutationTypes.loadingStart)
    return new Promise(resolve => {
      axiosApi.getCurrentWeatherFromCurrentPosition(credentials)
        .then(resp => {
          console.log(resp.data)
          resolve(resp.data)
          context.commit(mutationTypes.loadingSuccess, resp.data)
        })
        .catch(err => {
          console.log('ERRORS', err)
          context.commit(mutationTypes.loadingFailure)
        })
    })
  }
}

export default {
  state, mutations, actions, getters
}
