import fetch from 'cross-fetch'

export default class MapBoxService {
  static token = 'pk.eyJ1IjoidGVjaGllZG9kIiwiYSI6ImNqbW5vYWMwZzB3MGQzcWxiYzF3YnpydXEifQ.RNtj2DNEAdFWvRShLmhvGQ'

  static async geodecode ({lat, lng}) {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${this.token}`)

    return response.json()
  }
}
