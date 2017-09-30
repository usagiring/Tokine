import axios from 'axios'
import baseAPI from '../../config/baseAPI'

function get(url) {
  return axios.get(baseAPI + url)
    .then(result => result.data)
}

function put(url, data) {
  return axios.put(baseAPI + url, data)
    .then(result => result.data)
}

function post(url, data) {
  return axios.post(baseAPI + url, data)
    .then(result => result.data)
}

function remove(url) {
  return axios.delete(baseAPI + url)
}

export {
  get,
  put,
  post,
  remove as delete
}
