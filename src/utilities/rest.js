import axios from 'axios'
import baseAPI from '../../config/baseAPI'

const api = axios.create({
  withCredentials: true
})

async function get(url) {
  let result = await api.get(baseAPI + url)
  return result.data
}

async function put(url, data) {
  let result = await api.put(baseAPI + url, data)
  return result.data
}

async function post(url, data, config = {}) {
  let result = await api.post(baseAPI + url, data, config)
  return result.data
}

function remove(url) {
  return api.delete(baseAPI + url)
}

export {
  get,
  put,
  post,
  remove
}
