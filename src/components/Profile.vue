<template>
  <div>
    <div>
      <span>{{ user.uid }}</span>
      <span>{{ user.username }}</span>
      <span>{{ user.birthday }}</span>

      <input type="file" @change="setFile">
      <button @click="upload">upload</button>

    </div>
  </div>
</template>

<script>
  import {post} from '../utilities/rest'

  export default {
    name: 'profile',
    data() {
      return {
        avatar: null
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      setFile(e) {
        console.log(e)
        this.avatar = e.target.files[0]
      },
      upload() {
        if (!this.avatar) return
        let data = new FormData()
        data.append('avatar', this.avatar)

        post('/file', data)
          .then(res => {
            console.log(res)
          })
      }
    }
  }
</script>

<style scoped>
</style>
