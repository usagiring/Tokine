<template>
  <div>

  </div>
</template>

<script>
  import {get} from '../utilities/rest'

  export default {
    name: 'profile',

    created () {
      console.log(this.$route)
      let where = {
        username: this.$route.params.username
      }
      where = JSON.stringify(where)
      get(`/users?where=${where}`)
        .then(data => {
          console.log(data)
        })
    }
  }
</script>

<style scoped>
</style>
