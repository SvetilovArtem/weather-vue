type TypeGetDeviceCoordinatesHandler = () => Promise<any>
export const getDeviceCoordinates: TypeGetDeviceCoordinatesHandler = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          resolve({ latitude, longitude })
          console.log('lat', latitude, 'lon', longitude)
        }
      )
    } else {
      console.error('Геолокация не поддерживается')
    }
  })
}
