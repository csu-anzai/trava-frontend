<template><div>
    <h1>Follower</h1>

    <div v-for="(user,index) in info.followers" v-bind:key="index">
        <el-button>
            {{user.user_username}}
            <img :src="user.avatar">
        </el-button>
    </div>
  
</div></template>

<script>
import axios from 'axios'

export default {
  name: 'Follower',
  components: {
  },
  data(){
    return {
        info : null
      }
  },
  methods: {
    async get(){
      axios.get(`/profile/${this.$router.params.id}` )
        .then(response => {
            this.info = response.data
            console.log(this.info,'');
        })
    },
    async getUsers(){
        let users = this.info
        console.log(this.info);

    //   axios.get(`/profile/user` ,{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
    //     .then(response => {
   

    //     })
    }
  },
  created(){
      this.get()
  },
}
</script>

<style>

</style>