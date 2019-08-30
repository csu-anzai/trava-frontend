<template>
  <div >

    <h1>

      Your profile
      
    </h1>
    <p><strong>Username: </strong>{{info.username}}</p>
    <p><strong>Email: </strong>{{info.email}}</p>
    <p><strong>Created: </strong>{{info.created_at}}</p>
    <p><strong>Last Updated: </strong>{{info.updated_at}}</p>

  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'profile',
  data(){
    return {
      info : null
    }
  },
  methods: {
    async get(){

      axios.get('http://127.0.0.1:3333/profile/user' ,{ 
        headers: { 
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }}).then(response => {
        this.info = response.data
      })
      
    },
  },
  created () {
    this.get()
  }
}
</script>