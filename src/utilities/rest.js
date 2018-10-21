import axios from 'axios'
import baseAPI from '../../config/baseAPI'

const api = axios.create({
  withCredentials: true
})

function get(url) {
  return api.get(baseAPI + url)
    .then(result => result.data)
}

function put(url, data) {
  return api.put(baseAPI + url, data)
    .then(result => result.data)
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
