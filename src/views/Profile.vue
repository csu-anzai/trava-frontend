<template>
  <div >

    <h1>

      <!-- UNFUNCTIONAL -->
      
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
    async get(){
      let res = await axios.get('http://127.0.0.1:3333/' +localStorage.getItem('user'))
      this.user = res.data
    }
  }
}
</script>

      <!-- UNFUNCTIONAL -->