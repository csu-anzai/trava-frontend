<template>
  <div class="posts">
    <div class="addpost">
    <br><el-button class="createButton">Add post</el-button>
    </div>
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
      postForm: {
        journey_id: this.$route.params.id,
        date: '',
        budget: '',
        day: '',

      },
      postInfo: null,
    }
  },
  methods: {
    async getInfo(){
      axios.get(`http://127.0.0.1:3333/${this.$route.params.user_id}/journeys/${this.$route.params.id}`).then(response => {
         this.postInfo = response.data.posts
         return this.postInfo
       
        })
        
    },
    async addPost() {
      axios.post(`http://127.0.0.1:3333/${this.$route.params.user_id}/journeys/${this.$route.params.id}`, 
      {'journey_id':this.$route.params.id, 'date':this.postForm.date, 'budget':this.postForm.budget, 'day':this.postForm.day, 'description':this.postForm.description, 'pictures': this.postForm.pictures})


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
.createButton {
  width:50%;

}
button {
    border-radius: 20px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    min-width: 140px;
    margin-top: 8px;
    color: #369DD7;
    cursor: pointer;
    border: 1px solid #369DD7;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    outline: none;
    &:hover {
      color:white;
      background: #369DD7;
      border-color: #369DD7;
    }
}


</style>
