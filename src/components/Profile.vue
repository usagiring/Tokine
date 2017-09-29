<template>
  <div>

  </div>
</template>

<script>
  import {get} from '../utilities/rest'

  export default {
    name: 'profile',

    created() {
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData() {
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
  }
</script>

<style scoped>
</style>
