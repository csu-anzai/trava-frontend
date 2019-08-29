<template>
    <div>
        <div>
        <input v-model="email" placeholder="Enter your email">
        <input v-model="username" placeholder="Enter your username">
        <input v-model="password" placeholder="Enter your password">
        </div>
        <button @click="submit" v-on:enter="submit" href="/login">submit</button>

    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  components :{

  },
  data() {
    return {
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
        this.get()
      }
    },

    async byPass() {
      return await axios.post('http://127.0.0.1:3333/register',{'username' : this.username,
      'email' : this.email,
      'password':this.password,
      'cover':this.cover,
      'avatar':this.avatar}).catch((err) => alert('== Fail to register, Check your Input =='))


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
  }
}
</script>