<template>
  <div class="posts">
<div class="post" :key="index+10" v-for="(item, index) in postInfo">
  <b-card :title="item.day" style="max-width: 30rem;" class="mb-2" id="card">
     <span>{{dateFormat(item.date)}}</span>
     <b-card-text><strong>Budget: </strong>{{item.budget}}</b-card-text>
     <b-card-text><strong>Description: </strong>{{item.description}}</b-card-text> 
     <img :src="item.pictures" width="300px">
  </b-card>
</div>

  </div>
</template>

<script>
import { create } from 'domain';
import { userInfo } from 'os';
const axios = require('axios')
import moment from 'moment'

export default {
  data () {
    return {
      postInfo: null,
      array: null,
    }
  },
  methods: {
    async getInfo(){
      axios.get(`http://localhost:3333/${this.$route.params.user_id}/journeys/${this.$route.params.id}`).then(response => {
         this.postInfo = response.data.posts
         return this.postInfo
       

        })
        
    }, 
    
    dateFormat (date) {
        return moment(String(date)).format('D MMMM YYYY')

    }
  },
  async mounted(){
    this.getInfo()
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.post{
display: flex;
justify-content: center;
margin: 10px
}


</style>
