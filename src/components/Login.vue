<template>
  <div>

      <h3>Sign In</h3>

    <div v-if="(login == false)">
      <div  class="login">
        <input style="max-width : 250px" class="mt-2" v-on:keyup.enter="put" v-model="username" placeholder="username">
      
        <input style="max-width : 250px" v-on:keyup.enter="put" v-model="password" placeholder="password" type="password">
        <button variant="info" @click="put">Log In</button>
      </div>

      <a href="/signup"><h6>Create an account ?</h6></a>
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
      this.token = response.data.token

      localStorage.setItem('token', this.token)

      this.get()

    },
    post() {
      return axios.post('http://127.0.0.1:3333/login',{'username':this.username,'password':this.password})
        
    }, 
    
    get() {
      axios.get('http://127.0.0.1:3333/profile/' + this.username ,{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })
        this.$router.push(`/profile/${this.username}`)
    },
  },

}

</script>