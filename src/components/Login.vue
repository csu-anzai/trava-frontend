<template>
  <div>

      <br><h3>Sign In</h3>

    <div v-if="(login == false)">
      <div  class="login">
        <el-form>
        <el-form-item>
          <div class="username">
        <p>Username</p>
          </div>
        <el-input style="max-width : 250px" v-on:keyup.enter="put" v-model="username" placeholder="username"/>
        </el-form-item>
        <div class="password">
        <p>Password</p>
        </div>
        <el-form-item>
        <el-input style="max-width : 250px" v-on:keyup.enter="put" v-model="password" placeholder="password" type="password"/>
        </el-form-item>
        <el-button variant="info" @click="put" type="primary">Log In</el-button>
        </el-form>
      </div>
<br>
      <a href="/signup"><h6>Create an account</h6></a>
    </div>
      

  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'login',
  data() {
    return {
      id : null,
      pass : null,
      username : null,
      password : null,
      token : '',
      login : false,
    }
  },
  methods: {
    async put() {

      let response = await this.post()
      this.token = response.data.token.token
      this.id = response.data.user.id

      localStorage.setItem('token', this.token)
      localStorage.setItem('id', this.id)
      this.get()

    },
    post() {
      return axios.post('/login',{'username':this.username,'password':this.password})

    }, 
    
    get() {
      axios.get('/profile/user' ,{ 
        headers: { 
          Authorization: 'Bearer ' + localStorage.getItem('token')
        } 
      })
      this.$router.push(`/profile/${this.username}`)
      location.reload()
    },
  },

}

</script>
<style scoped lang="scss">
p {
  margin-bottom: 0px;
  font-size: 17.5px;

}



</style>