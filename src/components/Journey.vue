<template>
  <div class="journey">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div class="addJourney">
</div>
<div>
<fab
   :position="position"
   :bg-color="bgColor"
   :actions="fabActions"
   @Add="addJourney"
   @Edit="editJourney"
></fab>
  </div>
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
import fontawesome from "@fortawesome/fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import fab from 'vue-fab'


const axios = require('axios')

export default {
  components: {
    fab
  },
  data () {
    return {
      array : null,
       bgColor: '#369DD7',
          position: 'bottom-right',
          fabActions: [
              {
                  name: 'Add',
                  icon: 'add'
              },
              {
                  name: 'Edit',
                  icon: 'edit'
              }
          ]
    }
  },
  methods: {
    show () {
    this.$modal.show('hello-world');
  },
  hide () {
    this.$modal.hide('hello-world');
  },
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
    async addJourney(user_id){
        return this.$router.push({path:`/${user_id}/journeys/`})
          
      },
      async editJourney(){
          alert('Clicked on alert icon');
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
