<template>
    <div>
        <div>
        <input v-model="email" placeholder="Enter your email">
        <input v-model="username" placeholder="Enter your username">
        <input v-model="password" placeholder="Enter your password">
        </div>
        <button @click="post" variant="success" href="/login">submit</button>

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
      let response = await this.post()

      if (response.statusText == 'OK') {
        this.get()
      }
    },

    post() {
      return axios.post('http://127.0.0.1:3333/register', { 'username': this.username,'email' : this.email, 'password': this.password , 'cover' : this.cover, 'avatar' : this.avatar })

    

    },
    get() {
      axios.get('http://127.0.0.1:3333/user/' + this.id ,{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')} })

        this.$router.push(`/`)

    },
  }
}
</script>