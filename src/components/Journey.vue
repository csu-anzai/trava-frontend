<template>
  <div class="journey">
     <!-- <p><strong>Title: </strong>{{title}}</p>
      <p><strong>Date: </strong>{{date}}</p>
      <p><strong>Budget: </strong>{{budget}}</p>
      <p><strong>Created: </strong>{{created_at}}</p>
      <p><strong>Updated: </strong>{{updated_at}}</p> 
    <button @click="getInfo">Click me</button> -->
    <!-- {{postImage().asdsa}} -->
<div class="post" :key="index+10" v-for="(item, index) in array">
  <el-button>
     <p><strong>{{item.title}}</strong> </p> 
      <p><strong> Date: </strong>{{item.date}}</p> 
      <p><strong>Budget: </strong> {{item.budget}}</p> 
      <img :key="index+10" v-for="(picture, index) in pictures" :src="picture.pictures" width="300px">
      <p><strong>Created: </strong>{{item.created_at}}</p> 
      <p><strong>Last Updated: </strong>{{item.updated_at}}</p>
      </el-button>
</div>

  </div>
</template>

<script>
import { create } from 'domain';
const axios = require('axios')

export default {
  data () {
    return {
      array : null,
      title: '',
      date: '',
      budget: '',
      description: '',
      created_at: '',
      updated_at: '',
      posts: '',
      id: '',
      user_id: '',
      pictures: '',
      
    }
  },
  methods: {
    async getInfo(){
      await axios.get('http://localhost:3333/journeys').then(response => {
        this.array = response.data
        for(let i = 0; i < this.array.length; i++){
          let id = this.array[i].id
          let user_id = this.array[i].user_id
          return this.postImage(user_id,id)
        }
        
        //  let journeyInfo = response.data
        //    this.title = journeyInfo.title
        //      this.date= journeyInfo.date
        //      this.budget= journeyInfo.budget
        //      this.created_at= journeyInfo.created_at
        //      this.updated_at= journeyInfo.updated_at
         })
    },
    async postImage(user_id, id){
      await axios.get(`http://localhost:3333/${user_id}/journeys/${id}`).then(response => {
        this.pictures = response.data.posts
        for(let i = 0; i < this.pictures.length; i++){
          let photo = this.pictures[i].pictures
          return photo
        }
        //  let journeyInfo = response.data
        //    this.title = journeyInfo.title
        //      this.date= journeyInfo.date
        //      this.budget= journeyInfo.budget
        //      this.created_at= journeyInfo.created_at
        //      this.updated_at= journeyInfo.updated_at
         })
    },
  },

    async mounted() {
    this.getInfo()
  },
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
button {
  width: 80%;
  margin: 3px;
  display: flex;
  justify-content: space-evenly
}
.post {
  display: flex;
  justify-content:center
}
</style>
