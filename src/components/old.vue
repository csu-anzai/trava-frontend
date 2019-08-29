<template>
  <div class="journey">
     
    <div class="post" :key="index" v-for="(item, index) in array">
      <button>
        <p><strong>{{item.title}}</strong> </p> 

      <h1>{{index}}</h1>

        <p><strong> Date: </strong>{{item.date}}</p> 
        <p><strong>Budget: </strong> {{item.budget}}</p> 

        <img :src="item.photo">{{item.photo}}

        <p><strong>Created: </strong>{{item.created_at}}</p> 
        <p><strong>Last Updated: </strong>{{item.updated_at}}</p>
      </button>
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
      posts: '',
      id: [],
      user_id: [],
      hold : [],
      wrap : [],
      pig: []
      
    }
  },
  methods: {
    async getInfo(){
      let response = await axios.get('http://localhost:3333/journeys')
      let body = response.data

      this.array = body

        for (let i = 0; i < body.length ; i++) {
          await this.id.push(body[i].id)
          await this.user_id.push(body[i].user_id)
        }

        for (let i = 0; i < this.id.length ; i++) {
          let id = this.id[i]
          let user_id = this.user_id[i]

          let image = await axios.get(`http://localhost:3333/${user_id}/journeys/${id}`)
          let hold = image.data.posts
          await this.hold.push(hold)
        }
        
        for (let i = 0; i < this.id.length ; i++) {
          let wrap = this.hold[i]
          this.wrap = wrap
          let pics = this.wrap[0].pictures
          this.pig.push(pics)
        }
        
        for (let i = 0; i < this.id.length ; i++) {
          this.array[i].photo = this.pig[i]
          console.log(this.array[i].photo);
        }
    },
  },
  async created() {
      await this.getInfo()
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

img {
  max-width: 300px;
}
</style>
