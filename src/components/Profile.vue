<template>
  <div>
    <div>
      <div>
        <Upload action="////"
                name="file"
                :max-size="2048"
                :show-upload-list="false"
                :before-upload="handleUpload"
                :format="['jpg','jpeg','png']">
          <Button type="ghost">Select Image</Button>
        </Upload>
        <Button type="primary" @click="upload" :disabled="!this.avatar">Upload</Button>
        <div>
          <span class="profile-label">uid:</span>
          <Input :value="user.uid" class="profile-input" title="nickname" disabled/>
        </div>
      </div>

      <div>
        <div>
          <span class="profile-label">name:</span>
          <Input v-model="user.nickname" class="profile-input" title="nickname"/>
        </div>
        <div>
          <span class="profile-label">birthday:</span>
          <DatePicker class="profile-input" v-model="user.birthday"></DatePicker>
        </div>
      </div>

      <Button type="primary" @click="updateUserInfo">Update Profile Setting</Button>
    </div>
  </div>
</template>

<script>
  import {post, put} from '../utilities/rest'
  import baseAPI from '../../config/baseAPI'

  export default {
    name: 'profile',
    data() {
      return {
        avatar: null,
        user: Object.assign({}, this.$store.state.user)
      }
    },
    computed: {},
    methods: {
      handleUpload(file) {
        this.avatar = file
        return false
      },

      upload() {
        if (!this.avatar) return
        let data = new FormData()
        data.append('avatar', this.avatar)
        this.update(data)
      },

      updateUserInfo() {
        this.update(this.user)
      },

      update(data) {
        console.log(data)
        put(`/user/${this.user._id}`, data)
          .then(user => {
            this.$store.commit('setUser', user)
          })
      }
    }
  }
</script>

<style scoped>
  .profile-label {
    display: inline-block;
    width: 70px;
  }

  .profile-input {
    width: 300px;
  }
</style>
