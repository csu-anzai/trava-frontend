<template>
  <div id="app">
    
    <div id="nav" class="theme">

      <a v-if="this.login == false" href="/login">Login</a>
      <a v-if="this.login == true" @click="logout" href="/">Logout</a>

      <div>
        <a href="/"><img src="https://res.cloudinary.com/champmar/image/upload/v1567141363/customLogo_uuyspo.png" style="width : 143px; height : 41px"></a>
      </div>
    </div>


    <router-view/>
  </div>
</template>

<script>

export default {
  name:'App',
  components:{
  },
  data(){
    return {
      login : false,
      search: "",
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
      localStorage.removeItem('id');
    },
    
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

.theme {
  background-color: #369DD7
}

#nav {
  display: flexbox;
  padding: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.search-wrapper {
  position: relative;
  margin: 5px;
}

.search-wrapper input {
  border-radius: 50px;
  border-color: white;
  text-align: center;
  width: 50%;
}

</style>
