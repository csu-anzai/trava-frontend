<template>
  <div class="journey">
  
<div class="post" :key="index+10" v-for="(item, index) in array">
  <el-button @click="getPosts(item.user_id, item.id)">
     <p><strong>{{item.title}}</strong></p>
     <p><strong>Budget: </strong>{{item.budget}}</p> 
     <img :src="item.cover" width="300px">
  </el-button>

</div>

  </div>
</template>

<script>
import { create } from 'domain';
import { userInfo } from 'os';

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
    }
  },
  methods: {
    async getInfo(){
      await axios.get('http://127.0.0.1:3333/journeys').then(response => {
        this.array = response.data

        for(let i in this.array){
         let user_id = this.array[i].user_id
         let id = this.array[i].id
        return this.array
        }
        })
    },
    async getPosts(user_id,id){
        return this.$router.push({path:`/${user_id}/journeys/${id}`})
    },
  },

    async mounted() {
    this.getInfo()
  },
  }
</script>


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
.post {
  margin: 10px
}

</style>
