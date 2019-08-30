<template>
  <div>
      <div class=box>

        
        <router-link to="/">
        <font-awesome-icon id="icon" icon="user-secret" />
        </router-link>

        <router-link to="/journeys">
        <font-awesome-icon id="icon" icon="user-secret" />
        </router-link>
        
        <router-link to="/activity">
        <font-awesome-icon id="icon" icon="user-secret" />
        </router-link>

        <router-link to="/profile/">
        <font-awesome-icon id="icon" icon="user-secret" />
        </router-link>


      </div>
  </div>
</template>

<script>
export default {
    name:'footbar'
}
</script>


<style>

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 59px;
}

#icon {
  width: 45px;
  height: 45px;
  margin: 8px;
  color: white;
}

#navbar {
  width: 375px;
  height: 59px;
  padding: 10px;

}
  #navbar:hover {
    background-color: rgb(179, 235, 195)
  }
  #navbar:active {
    background-color: rgb(65, 170, 95)
  }
</style>