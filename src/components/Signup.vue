<template>
    <div>
      <div>
        <br><h1>Sign Up</h1>
        <el-form>
         <p>Email</p>
          <el-form-item style="
    margin-left: 60px;" class="errorMessage" prop="email"
    :rules="[
      { required: true, message: 'Please input email address', trigger: 'blur' },
      { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
    ]">
        <el-input style="max-width : 300px; margin-right:60px" v-model="email" placeholder="Enter your email"/>
           </el-form-item>
          <p>Username</p>
          <el-form-item>
        <el-input style="max-width : 300px" v-model="username" placeholder="Enter your username"/>
          </el-form-item>
          <p>Password</p>
          <el-form-item>
        <el-input style="max-width : 300px" v-model="password" type="password" placeholder="Enter your password" />
          </el-form-item>
          <p>Cover Photo</p>
          <el-form-item>
          <file-pond
        name="image"
                class="imageBox"
        label-idle="Select/drop files here..."
        allow-multiple="true"
        accepted-file-types="image/jpeg, image/png"
        v-bind:files="file"
        server="http://127.0.0.1:3333/upload"
        :onprocessfile="uploadCover"
     />        
     </el-form-item>
     <p>Avatar</p>
       <el-form-item>
 <file-pond
        class="imageBox"
        name="image"
        label-idle="Select/drop files here..."
        allow-multiple="true"
        accepted-file-types="image/jpeg, image/png"
        v-bind:files="file"
        server="http://127.0.0.1:3333/upload"
        :onprocessfile="uploadAvatar"
     />        
     </el-form-item>
          <el-form-item>
        <el-button @click="submit" v-on:enter="submit" href="/login" primary>Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import vueFilePond, { setOptions } from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'; 
import { send } from 'q';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export default {
  name: 'Signup',
  components :{
    FilePond,
  },
  data() {
    return {
      file:[],
      errors:[],
      username : null,
      email : null,
      password : null,
      cover : null,
      avatar : null,
    }
  },
  
  methods: {
    async submit() {
      let res = await this.byPass()
      let token = res.data.Token.token

      localStorage.setItem('token', token)
      if (res.statusText == 'OK') {
        let response = await this.post()
        this.token = response.data.token.token
        this.id = response.data.user.id

        localStorage.setItem('token', this.token)
        localStorage.setItem('id', this.id)
        localStorage.setItem('username', this.username)
        this.get()
      }
    },

    async byPass() {
      this.errors = []
      if(!this.validEmail(this.email)){
         return alert('Valid Email Needed');
      } else {
      return await axios.post('/register',{'username' : this.username,
      'email' : this.email,
      'password':this.password,
      'cover':this.cover,
      'avatar':this.avatar}).catch((err) => alert('== Fail to register, Check your Input =='))
      }
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },
    post() {
      return axios.post('/login',{'username':this.username,'password':this.password})
    },

    get() {
      axios.get('http://127.0.0.1:3333/profile/user' ,{ 
        headers: { 
          Authorization: 'Bearer ' + localStorage.getItem('token')
        } 
      })
      this.$router.push(`/profile/${this.username}`)
      location.reload()
    },
     uploadAvatar(err, file) {
        let image = JSON.parse(file.serverId)
        console.log(image.url)
        this.avatar = image.url
    },
     uploadCover(err, file) {
        let image = JSON.parse(file.serverId)
        this.cover = image.url
    },
  }
}
</script>
<style scoped lang="scss">
.imageBox {
 
  width:50%;
  margin-left: 25%
}
#errorMessage /deep/ {
  left:60px;
  margin-left: 50%
}

</style>