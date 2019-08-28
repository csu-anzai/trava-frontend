<template>
  <div>
      <div class=box>

        
        <router-link to="/">
         <img src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/47.Explore-512.png" alt="explore">
        </router-link>

        <router-link to="/journeys">
          <img src="https://icon-library.net/images/diary-icon/diary-icon-0.jpg" alt="diary">
        </router-link>
        
        <router-link to="/activity">
          <img src="http://cdn.onlinewebfonts.com/svg/img_286175.png" alt="activities">
        </router-link>

        <router-link to="/profile/">
          <img src="https://static.thenounproject.com/png/629576-200.png" alt="profile">
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
  display: flex;
  align-content: center;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}

.box {
  background-color: #75E795;
}

#navbar {
  width: 40px;
  height: 40px;
  padding: 10px;
  margin-bottom: -6px
}
  #navbar:hover {
    background-color: rgb(179, 235, 195)
  }
    #navbar:active {
    background-color: rgb(65, 170, 95)
  }

</style>