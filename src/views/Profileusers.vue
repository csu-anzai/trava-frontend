<template>

  <div class="profile-wrapper">
    <div class="profile-container">
      <div id="headers">
        
        <img id="Cover"  :src="info.cover">
        <img id="Avatar" :src="info.avatar">
        </div>


      
      <div id="Profile">
        <h1>
          {{info.username}}
        </h1>
        <el-button style="display: flex;border-color:#369DD7;color:#369DD7;margin-left:15px" v-show="!this.followed" @click="follow">FOLLOW</el-button>
        <el-button style="display: flex;border-color:red;color:red;margin-left:10px" v-show="(this.followed)" @click="unfollow">UNFOLLOW</el-button>
        <div id="info">
          <p>
            {{info.followers.length}}<br>
            Followers
          </p>

          <p>
            {{folnum}}<br>
            Followings
          </p>

          <p>
            {{info.journeys.length}}<br>
            Journeys
          </p>
          <div id="bio">
            <el-divider content-position="left">About me</el-divider>
            <small style="position : relative; margin : 10px">{{info.about}}</small>
          </div>
        </div>
      </div>
    </div>
    <br>
    <h4>{{info.username}}'s Journeys</h4>

    <div style="margin : 5px" :key="index" v-for="(item, index) in info.journeys">
      <div style="border:none;" class="butt" @click="getPosts(item.user_id, item.id)">
        <div class="card-trip">

          <img :src="item.cover" />
          
            <div class="card-trip-infos">
              <div>
              <h2>{{item.title}}</h2>
              </div>
              <h2 class="card-trip-pricing">{{item.budget}}</h2>
            </div>
        </div>
      </div>
    </div>
     <fab
   :position="position"
   :bg-color="bgColor"
   :actions="fabActions"
   @Home="navigateHome"
   @Profile="profile"
    v-bind:files="file"
   ></fab>
  
  </div>
</template>

<script>
const axios = require('axios')
import fab from 'vue-fab'
import { async } from 'q';


export default {
  name: 'profile',
  components: {
    fab,
  },
  data(){
    return {
      info : null,
      file:[],
      followed: null,
      followinguser: null,
      folnum: null,
      position: 'bottom-right',
            bgColor: '#369DD7',
          fabActions: [
              {
                name: 'Home',
                title: 'Home',
                icon: 'home'
              },
               {
                name: 'Profile',
                title: 'My Profile',
                icon: 'account_box'
              },
              

          ]
      }
  },
  
  methods: {
    async get(){
      axios.get(`/profile/${this.$router.currentRoute.params.id}`).then(response => {
        this.info = response.data
        })
    },
    navigateHome(){
      this.$router.push({path:`/`})
    },
    
    dateFormat (date) {
      return moment(String(date)).format('D MMMM YYYY')
    },
    async getPosts(user_id,id){
      let user = await axios.get(`/profile/find/${user_id}`)
      let username = user.data.username
      return this.$router.push({path:`/${username}/journeys/${id}`})
    },
    async check(){
    
      if(this.$router.currentRoute.params.id == localStorage.getItem('username')){
        this.$router.push('/myprofile')
      }
    },

    async editForm() {
       this.$modal.show('edit')
    },
    uploadAvatar(err, file) {
        let image = JSON.parse(file.serverId)
        console.log(image.url)
        this.info.avatar = image.url
    },
    uploadCover(err, file) {
        let image = JSON.parse(file.serverId)
        this.info.cover = image.url
    },
    async editProfile() {
      axios.put(`/profile/${this.info.id}`, {
        "cover": this.info.cover,
        "avatar": this.info.avatar,
        "about": this.info.about
      }).then(response => {
        return alert('Changes Saved'), location.reload()
      })
    },
    async follow() {
      axios.post(`/profile/${this.$router.currentRoute.params.id}`,{'follower_id': localStorage.getItem('id'),'user_id':this.info.id}).then(response => {})
      location.reload()
    },
    async unfollow() {
      axios.delete(`/profile/${this.$router.currentRoute.params.id}`,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        data: {
          'follower_id': localStorage.getItem('id')
        }})
      .then(response => {})
      location.reload()
    },
     profile(){
      this.$router.push('/myprofile')
    },
    async isfollow() {

      let user = await axios.get(`/profile/${this.$router.currentRoute.params.id}`)

      let res = await axios.get(`http://127.0.0.1:3333/followers`)
      let self = res.data.forEach(item => {
        if (item.follower_id == localStorage.getItem('id') && item.user_id == user.data.id) {
          this.followed = true
        }
      })
    },
    async following() {
      let user = await axios.get(`/profile/${this.$router.currentRoute.params.id}`)
      let num = await axios.get(`/following/${user.data.id}`)
      this.folnum = num.data.length
    }
  },
  created(){
    this.get()
    this.check()
    this.isfollow()
    this.following()
}
}


</script>

<style scoped lang="scss">
h1 {
  margin-left:40%
}
#info {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 180px;

}

#bio {
  width: 195px;
  height: 136px;
  left: 159px;
  top: 300px;
  margin-bottom: 75px;
  margin-top: -40px;
  margin-left: 20px;
  background: rgba(255, 255, 255, 0.95);
  border: 0.1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 5px;
}

#Cover{
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #C4C4C4;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    border-bottom: 4px solid white
}

#Profile {
  width: 100%;
  height: 211px;
  left: 0px;
  top: 237px;
  background: rgba(196, 196, 196, 0.2);
  border: 0.5px solid rgba(0, 0, 0, 0.1);
    margin: 0 auto;
}

#Avatar {
  position: absolute;
  border-radius: 80px;
  background-color: whitesmoke;
  height: 110px;
  width: 110px;
  left: 0px;
  top:190px;
  margin-left:10px;
  border:3px solid white

}

img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  
}

.headers {
  position: relative;  
    margin: 3px;
    padding: 3px;  

                        
}
.card-trip {
  overflow: hidden;
  background: transparent;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  max-width: 500px;
}

.card-trip > img {
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.card-trip h2 {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.card-trip p {
  font-size: 12px;
  opacity: .7;
  margin: 0;
}


.card-trip .card-trip-infos {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
}

.card-trip-infos .card-trip-user {
  position: absolute;
  right: 16px;
  top: -20px;
  width: 40px;
}

$background_color: #404142;
$github_color: #DBA226;
$facebook_color: #3880FF;
.box {
  background: white;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #8b8c8d;
  font-size: 0;
  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    width: 100%;
    &#bp-right {
      background: url("/static/panorama.jpg") no-repeat top left;
      border-left: 1px solid #eee;
    }
  }
  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;
    color: white;
    background: #F38181;
  }
  .partition {
    width: 100%;
    height: 100%;
    .partition-title {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 20px;
      font-weight: 300;
    }
    .partition-form {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
  input[type=text] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 12px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #DDDEDF;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
    outline: none;
  }
  .large-btn {
    width: 100%;
    background: white;
    span {
      font-weight: 600;
    }
    &:hover {
      color: white !important;
    }
  }
  .button-set {
    margin-bottom: 8px;
  }
  
  .facebook-btn {
    border-color: $facebook_color;
    color: $facebook_color;
    &:hover {
      border-color: $facebook_color;
      background: $facebook_color;
    }
  }
  .github-btn {
    border-color: $github_color;
    color: $github_color;
    &:hover {
      border-color: $github_color;
      background: $github_color;
    }
  }
  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
.createButton {
  width:50%;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    min-width: 20px;
    margin-top: 8px;
    color: #369DD7;
    cursor: pointer;
    border: 1px solid #369DD7;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    outline: none;
    &:hover {
      color:white;
      background: #369DD7;
      border-color: #369DD7;
    }
}



</style>