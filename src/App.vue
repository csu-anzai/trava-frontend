<template>
  <div id="app">
    <div id="nav">
      TRAVA LOGO
      <a v-if="this.login == false" href="/login">Login</a>
      <a v-if="this.login == true" @click="logout" href="/">Logout</a>
    </div>


    <router-view/>

    <footer v-if="this.login == true">
      <footbar/>
    </footer>
  </div>
</template>
<script>
import footbar from '@/components/Footbar.vue'

export default {
  name:'App',
  components:{
    footbar,
  },
  data(){
    return {
      login : false,
    }
  },
  methods:{
    loginCheck(){
      if (localStorage.getItem('token')) {
        this.login = true
        console.log('Have Token');
      } else {
        this.login = false
        console.log('Dont Have Token');
      }
    },
    logout(){
      localStorage.removeItem('token');
    }
  },
  created(){
    this.loginCheck()

    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


</style>
