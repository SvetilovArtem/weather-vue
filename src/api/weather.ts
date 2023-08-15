import axios, { API_KEY } from './axios'

export interface ICurrentPosition {
  cityName: string
}

const getCurrentWeather = ({ cityName }: ICurrentPosition) => axios.get(`weather?q=${cityName}&appid=${API_KEY}&units=metric`)

const getCurrentWeatherFromCurrentPosition = (coords:{ lat: string, lon: string }) => axios.get(`weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`)
export default {
  getCurrentWeather,
  getCurrentWeatherFromCurrentPosition
}
