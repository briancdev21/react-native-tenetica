import queryString from 'query-string'

import {log} from 'src/utils/fn'
import {auth} from 'src/utils/auth'
import NavigationService from 'src/utils/NavigationService'

import axios from 'axios'

class APIProvider {
  constructor () {
    this.url = ''

    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    this.axiosInstance = undefined
  }

  __configureAxios (configs = {}) {
    if (!this.axiosInstance && this.url) {
      this.axiosInstance = axios.create({
        baseURL: this.url,
        timeout: 5000,
        ...configs
      })
    }
  }

  __makeEndpoint ({route, id, query = {}}) {
    const queryData = queryString.stringify(query)
    let url = `/${route}`

    if (id) {
      url += `/${id}`
    }

    if (queryData) {
      url += `?${queryData}`
    }

    return url
  }

  __makeData (data) {
    if (data) {
      return JSON.stringify(data)
    }

    return {}
  }

  async __makeCall ({route = '', id, method = 'GET', data, query}) {
    const endpoint = this.__makeEndpoint({route, id, query})

    log.group(`__makeCall ${endpoint}`)

    const configs = {url: endpoint, method, baseURL: this.url, data, headers: this.headers}
    const response = await this.axiosInstance.request(configs)

    const responseJson = response.data
    log.info({response, json: responseJson})
    log.groupEnd(`__makeCall ${endpoint}`)

    if (response.status >= 400) {
      if (response.status === 401) {
        auth.logout()
        this.logout()
        NavigationService.navigate('Auth')
        return {}
      }

      throw await responseJson
    }

    return responseJson
  }

  setToken (token) {
    if (!token) {
      return this.logout()
    }

    this.headers.Authorization = `Bearer ${token}`
  }

  setUrl (url) {
    this.url = url
    this.__configureAxios()
  }

  async login (credentials) {
    const response = await this.create({
      route: 'login',
      data: credentials
    })

    this.setToken(response.token)

    return response
  }

  async logout () {
    delete this.headers.Authorization
  }

  async index ({route, query}) {
    return this.__makeCall({
      route,
      query
    })
  }

  async show ({route, id, query}) {
    return this.__makeCall({
      route,
      id,
      query
    })
  }

  async create ({route, id, data, query}) {
    return this.__makeCall({
      route,
      data,
      query,
      id,
      method: 'POST'
    })
  }

  async update ({route, id, data, query}) {
    return this.__makeCall({
      route,
      id,
      data,
      query,
      method: 'PATCH'
    })
  }

  async destroy ({route, id, query}) {
    return this.__makeCall({
      route,
      id,
      query,
      method: 'DELETE'
    })
  }
}

export default new APIProvider()
