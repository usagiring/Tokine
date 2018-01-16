<template>
  <div>
    <div>
      <div class="profile-left-setting">
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
          <Input :value="user.uid" class="uid" title="nickname" disabled/>
        </div>
      </div>

      <div class="profile-right-setting">
        <div class="setting-item">
          <span class="profile-label">name:</span>
          <Input v-model="user.nickname" class="profile-input" title="nickname"/>
        </div>
        <div class="setting-item">
          <span class="profile-label">birthday:</span>
          <DatePicker class="profile-input" v-model="user.birthday"></DatePicker>
        </div>
        <Button type="primary" @click="updateUserInfo">Update Profile Setting</Button>
      </div>

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
    width: 50px;
  }

  .uid {
    width: 150px;

  }

  .profile-input {
    width: 300px;
  }

  .profile-left-setting {
    display: inline-block;
    vertical-align: top;
    width: 30%;
  }

  .profile-right-setting {
    display: inline-block;
    vertical-align: top;
    width: 50%;
  }

  .setting-item {
    padding: 10px;
  }
</style>
