<template>
  <div>

  </div>
</template>

<script>
  import {get} from '../utilities/rest'

  export default {
    name: 'profile',
    created: function () {
      get('/api/users')
        .then(data => {
          console.log(data)
        })
    }
  }
</script>

<style scoped>
</style>
