<template>
  <div class="journey">
     <!-- <p><strong>Title: </strong>{{title}}</p>
      <p><strong>Date: </strong>{{date}}</p>
      <p><strong>Budget: </strong>{{budget}}</p>
      <p><strong>Created: </strong>{{created_at}}</p>
      <p><strong>Updated: </strong>{{updated_at}}</p> 
    <button @click="getInfo">Click me</button> -->
          {{getInfo().asd}}

<div :key="index+10" v-for="(item, index) in array">
<p><strong>Title: </strong>{{item.title}}</p> 
      <p><strong>Date: </strong>{{item.date}}</p> 
      <p><strong>Budget: </strong> {{item.budget}}</p> 
      <p><strong>Created: </strong>{{item.created_at}}</p> 
      <p><strong>Last Updated: </strong>{{item.updated_at}}</p>
  </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data () {
    return {
      array : null,
      title: '',
      date: '',
      budget: '',
      created_at: '',
      updated_at: '',
      
    }
  },
  methods: {
    async getInfo(){
      await axios.get('http://localhost:3333/journeys').then(response => {
        this.array = response.data
        return this.array
        //  let journeyInfo = response.data
        //    this.title = journeyInfo.title
        //      this.date= journeyInfo.date
        //      this.budget= journeyInfo.budget
        //      this.created_at= journeyInfo.created_at
        //      this.updated_at= journeyInfo.updated_at
         })
    },
    async mounted() {
    this.getInfo()
  },
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
</style>
