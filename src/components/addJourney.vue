<template>
    <div>
        <div>
        <input v-model="email" placeholder="Enter your email">
        <input v-model="username" placeholder="Enter your username">
        <input v-model="password" placeholder="Enter your password">
        <input v-model="cover" placeholder="Enter your cover">
        </div>
        <button @click="submit" variant="success" href="/login">submit</button>

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
      post() {
        return axios.post('http://127.0.0.1:3333/:user_id/journeys')
    },
  }
}
</script>