<template>
  <div >

    <h1>

      Your profile
      
    </h1>
    <button @click="get">get</button>

  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'profile',
  data(){
    return {
      user : null
    }
  },
  methods: {
    get(){
      axios.get(`http://127.0.0.1:3333/profile/$`)
      
    }
  }
}
</script>