<template>
  <div >

    <h1>
      {{user.username}}
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
      user : {}
    }
  },
  methods: {
    async get(){
      let res = await axios.get('http://127.0.0.1:3333/' +localStorage.getItem('user'))
      this.user = res.data

    }
  },
  created(){
    this.get()
  }
}
</script>