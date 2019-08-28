<template>
  <div>
      <div class=box>
        <img src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/47.Explore-512.png" alt="explore">
        <img src="https://icon-library.net/images/diary-icon/diary-icon-0.jpg" alt="diary">
        <img src="http://cdn.onlinewebfonts.com/svg/img_286175.png" alt="activities">
        <img src="https://static.thenounproject.com/png/629576-200.png" alt="profile">
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
  justify-content: center
}

.box {
  background-color: #75E795;
}

img {
  width: 40px;
  height: 40px;
  padding: 10px;
  margin-bottom: -6px
}
  img:hover {
    background-color: rgb(179, 235, 195)
  }
  img:active {
    background-color: rgb(65, 170, 95)
  }

</style>