export type Weather = {
  coord: {
    lon: number,
    lat: number
  },
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  base: string,
  main: {
    temp: number,
    // eslint-disable-next-line camelcase
    feels_like: number,
    // eslint-disable-next-line camelcase
    temp_min: number,
    // eslint-disable-next-line camelcase
    temp_max: number,
    pressure: number,
    humidity: number,
    // eslint-disable-next-line camelcase
    sea_level: number,
    // eslint-disable-next-line camelcase
    grnd_level: number
  },
  visibility: number,
  wind: {
    speed: number,
    deg: number,
    gust: number
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
  },
  timezone: number,
  id: number,
  name: string,
  cod: number
}
