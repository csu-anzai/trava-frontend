<template>
  
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