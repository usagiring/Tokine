<template>
  <div>
    <div>
      <div class="profile-left-setting">
        <div class="avatar-container">
          <img id="avatar" :src="avatar">
          <Spin v-if="this.uploading" fix>
            <Icon type="load-c" size=18   class="demo-spin-icon-load"></Icon>
          </Spin>
        </div>

        <Upload action="////"
                name="file"
                :max-size="2048"
                :show-upload-list="false"
                :before-upload="handleUpload"
                :format="['jpg','jpeg','png']">
          <Button type="ghost">Select Image</Button>
        </Upload>
        <Button type="primary" @click="upload" :disabled="!this.cropper || this.uploading">Upload</Button>
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
  import Cropper from 'cropperjs'

  export default {
    name: 'profile',
    data() {
      return {
        avatar: this.$store.state.user.avatar ? `${baseAPI}/file/${this.$store.state.user.avatar}` : null,
        originalType: null,
        cropper: null,
        uploading: false,
        user: Object.assign({}, this.$store.state.user)
      }
    },
    computed: {},
    methods: {
      handleUpload(file) {
        if (!file) return
        this.originalType = file.type
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let self = this
        reader.addEventListener("load", function () {
          self.avatar = reader.result
          if (self.cropper) {
            self.cropper.replace(reader.result)
          } else {
            setTimeout(() => {
              let avatar = document.getElementById('avatar');
              self.cropper = new Cropper(avatar, {
                aspectRatio: 1,
                viewMode: 1,
                autoCropArea: 1,
                guides: false,
                background: false,
                scalable: false,
                movable: false,
                zoomable: false
              })
            }, 0)
          }
        }, false)
        return false
      },

      upload() {
        if (!this.avatar || !this.cropper) return
        let self = this
        self.uploading = true
        let croppedCanvas = this.cropper.getCroppedCanvas()
        croppedCanvas.toBlob(async blob => {
          let data = new FormData()
          data.append('avatar', blob)
          await self.update(data)
          self.avatar = croppedCanvas.toDataURL(self.originalType)
          self.cropper.destroy()
          self.cropper = null
          self.uploading = false
        })
      },

      updateUserInfo() {
        this.update(this.user)
      },

      async update(data) {
        let user = await put(`/user/${this.user._id}`, data)
        this.$store.commit('setUser', user)
        return user
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

  .avatar-container {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 20px;
  }

  #avatar {
    width: 250px;
    max-width: 100%;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
