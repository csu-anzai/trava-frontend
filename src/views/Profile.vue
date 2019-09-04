<template>
 

  <div class="profile-wrapper">
    
    <div class="profile-container">
      <div id="headers">
        
        <img id="Cover" :src="info.cover">
        <img id="Avatar" :src="info.avatar">
        </div>
<el-button @click="editForm" style="border-radius:5px;padding:1px 1px;font-size: 25px;position:absolute;top:100px;right:10px;mid-width:50px;color:black;" primary><i class="far fa-edit"></i></el-button>
      
      <div id="Profile">
        <h1>
          {{info.username}}
        </h1>
        
        <div id="info">
          <p>
            {{info.followers.length}}<br>
            Followers
          </p><br>

          <p>
            <span v-if="followinguser == null">0</span>
            {{followinguser}}<br>
            Followings
          </p><br>

          <p>
            {{info.journeys.length}}<br>
            Journeys
          </p>
          <div id="bio">
            <el-divider content-position="left">About me</el-divider>
            {{info.about}}
          </div>
        </div>
      
      </div>
    </div>
    <br>
    <h4>{{info.username}}'s Journeys</h4>

    <div style="margin : 5px" :key="index" v-for="(item, index) in info.journeys">
      <el-button style="border:none;" class="butt" @click="getPosts(item.user_id, item.id)">
        <div class="card-trip">

          <img :src="item.cover" />
          
            <div class="card-trip-infos">
              <div>
              <h2>{{item.title}}</h2>
              </div>
              <h2 class="card-trip-pricing">{{item.budget}}</h2>
            </div>

        </div>
      </el-button>
    </div>
    <modal scrollable name="edit" transition="pop-out" :width="modalWidth" :adaptive=true height="auto">
      <div class="box">
    <div class="box-part" id="bp-left">
      <div class="partition" id="partition-register">
        <div class="partition-title">Edit post</div>
        <div class="partition-form">
          <el-form>
            <el-form-item>
              <h6>About</h6>
              <el-input v-model="info.about" placeholder="About yourself"></el-input>
            </el-form-item>
            <el-form-item>
              <h6>Cover</h6>
 <file-pond
        name="image"
        label-idle="Select/drop Image here..."
        allow-multiple="false"
        accepted-file-types="image/jpeg, image/png"
        v-bind:files="file"
        server="https://50aff656.ap.ngrok.io/upload"
        :onprocessfile="uploadCover"
     />        
     </el-form-item>
       <el-form-item>
                       <h6>Avatar</h6>
 <file-pond
        name="image"
        label-idle="Select/drop Image here..."
        allow-multiple="false"
        accepted-file-types="image/jpeg, image/png"
        v-bind:files="file"
        server="https://50aff656.ap.ngrok.io/upload"
        :onprocessfile="uploadAvatar"
     />        
     </el-form-item>

     <div class="button-set">
            <el-button id="buttonSearch" @click="editProfile" class="createButton">Save Changes</el-button>
          </div>
          </el-form>
          
          

          <div style="margin-top: 42px">
          </div>

         

        </div>
      </div>
    </div>
    <div class="box-part" id="bp-right">
      <div class="box-messages">
      </div>
    </div>
  </div>
    </modal>
    <div v-if="this.login == true">
  <fab
   :position="position"
   :bg-color="bgColor"
   :actions="fabActions"
   @Add="formAccess"
   @Home="navigateHome"
   @Profile="profile"
    v-bind:files="file"
   :onaddfile="upload" 
   ></fab>
 </div>
  
  </div>
</template>

<script>
import moment from 'moment'
const axios = require('axios')
import { create } from 'domain';
import { userInfo } from 'os';
import vueFilePond, { setOptions } from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'; 
import { send } from 'q';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
const MODAL_WIDTH = 656
import fab from 'vue-fab'


export default {
  name: 'profile',
  components: {
    FilePond,
    fab,
  },
  data(){
    return {
      scrollable: true,
      modalWidth: MODAL_WIDTH,
      info : null,
      file:[],
      followinguser:[],
      followed: false,
      login: false,
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

      axios.get('/profile/user' ,{ 
        headers: { 
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.info = response.data
        })

    },
    dateFormat (date) {
      return moment(String(date)).format('D MMMM YYYY')
    },
    async getPosts(user_id,id){
      let user = await axios.get(`/profile/find/${user_id}`)
      let username = user.data.username
      return this.$router.push({path:`/${username}/journeys/${id}`})
    },
    navigateHome(){
      this.$router.push({path:`/`})
    },
    async editForm() {
       this.$modal.show('edit')
    },
    uploadAvatar(err, file) {
        let image = JSON.parse(file.serverId)
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
        return this.open()
      })
    },
    open() {
        const h = this.$createElement;

        this.$notify({
          title: `Updated !`,
          message: h('i', { style: 'color: teal' }, 'Your changes is saved')})
      },

    loginCheck(){
      if (localStorage.getItem('token')) {
        this.login = true
      } else {
        this.login = false
        this.$router.push(`/login`)
      }
    },
    async following() {
      let following = await axios.get(`/following/${localStorage.getItem('id')}`)
      this.followinguser = following.data.length
      //Master
    }
  },
  created(){
    this.get()
    this.following()
    this.loginCheck()
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
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
  background: white;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  max-width: 334px;
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
    display:flex;
    align-items: center;
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
  display: flex;
  justify-content: center;
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
#buttonSearch[data-v-ced23842] {
  display: flex;
  margin-left: 25%;
    margin-right: 25%;
}

</style>