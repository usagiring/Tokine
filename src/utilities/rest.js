import axios from 'axios'
import baseAPI from '../../config/baseAPI'

const api = axios.create({
  baseURL: baseAPI,
  withCredentials: true
})

async function get(url, options) {
  let result = await api.get(url, options)
  return result.data
}

async function put(url, data) {
  let result = await api.put(url, data)
  return result.data
}

async function post(url, data, config = {}) {
  let result = await api.post(url, data, config)
  return result.data
}

function remove(url) {
  return api.delete(url)
}

export {
  get,
  put,
  post,
  remove
}
