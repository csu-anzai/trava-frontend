<template><div>

    <div :key="index" v-for="(item, index) in postInfo">
        <div>
         <img class="posst" :src="item.pictures">
        </div>
    </div>
    <!-- safsjhfjfkjasd -->
    <fab
   :position="position"
   :bg-color="bgColor"
   :actions="fabActions"
   @Back="back"
   @Home="navigateHome"
   @profile="navigateProfile"
    v-bind:files="file"
   ></fab>


</div>
</template>

<script>
import fab from 'vue-fab'
import axios from 'axios'
export default {
    name : 'collasp',
    components:{
        fab
    },
    data(){
        return {
            postInfo : null,
      bgColor: '#369DD7',
          position: 'bottom-right',
          fabActions: [
              {
                  name: 'Home',
                  icon: 'home'
              },
              {
                  name: 'Profile',
                  icon: 'account_box'
              },
              {
                  name: 'Back',
                  icon: 'reply'
              }
              ],
              file: []
        }
    },
    methods: {
        async getInfo(){
            axios.get(`/${this.$route.params.user_id}/journeys/${this.$route.params.id}`)
                .then(response => {
                    this.postInfo = response.data.posts

                return this.postInfo
                })
        },
        navigateHome(){
      this.$router.push({path:`/`})
    },
     navigateProfile(){
      this.$router.push({path:`/myprofile`})
    },
        back(){
            this.$router.push({path:`/${this.$route.params.user_id}/journeys/${this.$route.params.id}`})
        }
    },
    created(){
        this.getInfo()
    }
}
</script>

<style>
.posst{
    position: relative;  
    margin: 1px;
    padding: 1px;
    width: 99.5%
}
</style>