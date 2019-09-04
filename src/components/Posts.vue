<template>
<div class="post-wrapper">
  <div class="posts">
    <modal name="form" transition="pop-out" :width="modalWidth" :adaptive=true height="auto">
      <div class="box">
    <div class="box-part" id="bp-left">
      <div class="partition" id="partition-register">
        <div class="partition-title">Create a post</div>
        <div class="partition-form">
          <el-form>
            <el-form-item>
              <el-date-picker type="date" placeholder="Pick a date" v-model="postForm.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input v-model="postForm.budget" placeholder="Budget"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="postForm.day" placeholder="Day 1, Day 2 etc.."></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="postForm.description" placeholder="What did you do today?"></el-input>
            </el-form-item>
 <file-pond
        name="image"
        label-idle="Drop files here..."
        allow-multiple="false"
        accepted-file-types="image/jpeg, image/png"
        v-bind:files="file"
        server="https://50aff656.ap.ngrok.io/upload"
        :onprocessfile="upload"
     />        
     <div class="button-set">
            <el-button @click="addPost" id="buttonSearch" class="createButton">Add Post</el-button>
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
    <modal name="edit" transition="pop-out" :width="modalWidth" :adaptive=true height="auto">
      <div class="box">
    <div class="box-part" id="bp-left">
      <div class="partition" id="partition-register">
        <div class="partition-title">Edit post</div>
        <div class="partition-form">
          <el-form>
            <el-form-item>
              <el-date-picker type="date" placeholder="Pick a date" v-model="postForm.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input v-model="postForm.budget" placeholder="Budget"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="postForm.day" placeholder="Day 1, Day 2 etc.."></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="postForm.description" placeholder="What did you do today?"></el-input>
            </el-form-item>
 <file-pond
        name="image"
        label-idle="Drop files here..."
        allow-multiple="true"
        accepted-file-types="image/jpeg, image/png"
        v-bind:files="file"
        server="https://50aff656.ap.ngrok.io/upload"
        :onprocessfile="upload"
     />        
     <div class="button-set">
            <el-button @click="saveChanges(postForm.id)" id="buttonSearch" class="createButton">Save</el-button>
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
    <fab
   :position="position"
   :bg-color="bgColor"
   :actions="fabActionsNotLogged"
   @Home="navigateHome"
   @Profile="navigateProfile"
    v-bind:files="file"
   :onaddfile="upload" 
   ></fab>
   
    <div class="addpost" v-if="this.login == true && owner">
  <fab
   :position="position"
   :bg-color="bgColor"
   :actions="fabActions"
   @Add="formAccess"
   @Home="navigateHome"
   @Profile="navigateProfile"
    v-bind:files="file"
   :onaddfile="upload" 
   ></fab>

    </div>

    
      
    <el-button v-if="!owner" id="profbutton" @click="navigateUserProfile"><img id="profimage" :src="ownerinfo.avatar" style="width:50px;border-radius:50px;height:50px"> {{ownerinfo.username}}</el-button>
      
    

<div class="post" :key="index" v-for="(item, index) in postInfo">
  <b-card :title="item.day" style="max-width: 30rem;" class="mb-2" id="card">
         <img :src="item.pictures">
     <span>{{dateFormat(item.date)}}</span>
              <div class="editpost" v-if="owner">
          <el-button @click="editPost(item)" style=" position:absolute;top:0;right:10px; mid-width:20px"><i class="far fa-edit"></i></el-button>
              </div>
     <b-card-text><strong>Budget: </strong>{{item.budget}}</b-card-text>
     <b-card-text><strong>Description: </strong>{{item.description}}</b-card-text> 
  </b-card>
</div>
  </div>
</div>  
</template>

<script>

import { create } from 'domain';
import { userInfo } from 'os';
import vueFilePond, { setOptions } from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'; 
import { send } from 'q';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
const axios = require('axios')
const MODAL_WIDTH = 656
import moment from 'moment'
import fab from 'vue-fab'

export default {
  name:'FontAwesome',
  components: {
    fab,
    FilePond
  },
  data () {
    return {
      postId: null,
      owner:false,
      file: [],
      login: false,
      cloudinary: {
       uploadPreset: 'intkqwzq',
       apiKey: '585369829753931',
       cloudName: 'duou0ej55'
     }, 
      postForm: {
        journey_id: this.$route.params.id,
        date: '',
        budget: '',
        day: '',
        pictures:'',
        modalWidth: MODAL_WIDTH,

      },
      bgColor: '#369DD7',
          position: 'bottom-right',
          fabActions: [
              {
                  name: 'Add',
                  icon: 'add'
              },
              {
               name: 'Home',
                  icon: 'home'
              },
              {
               name: 'Profile',
                  icon: 'account_box'
              },
          ],
          fabActionsNotLogged: [
              {
               name: 'Home',
                  icon: 'home'
              },
              {
               name: 'Profile',
                  icon: 'account_box'
              },
          ],
      postInfo: null,
      ownerid: null,
      ownerinfo:null,
      userId: null,
      userName: null,
    }
  },
  computed: {
    clUrl() {
        return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`  
        },
  },
  created () {
    this.getInfo()
    this.getOwner()
    this.loginCheck()
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
    async getInfo(){
      axios.get(`/${this.$route.params.user_id}/journeys/${this.$route.params.id}`).then(response => {
         this.postInfo = response.data.posts
         this.ownerid = response.data.user_id
         

         if(this.ownerid == localStorage.getItem('id')){
           this.owner = true
         } else {
           this.owner = false
         }
         return this.postInfo
        })
    },
    async getOwner(){
      axios.get(`/profile/${this.$route.params.user_id}`).then(response => {
        return this.ownerinfo = response.data
      })
    },
  
    upload(err, file) {
        let image = JSON.parse(file.serverId)
        this.postForm.pictures = image.url
    },
     navigateHome(){
      this.$router.push({path:`/`})
    },
     navigateProfile(){
      this.$router.push({path:`/myprofile`})
    },
     navigateUserProfile(){
      this.$router.push({path:`/profile/${this.$route.params.user_id}`})
    },
    async addPost() {

      axios.post(`/${this.$route.params.user_id}/journeys/${this.$route.params.id}`, 
      {'journey_id':this.$route.params.id, 
      'date':this.postForm.date, 
      'budget':this.postForm.budget, 
      'day':this.postForm.day, 
      'description':this.postForm.description, 
      'pictures': this.postForm.pictures}).then(response => {
        return alert('Post Created'),location.reload()
      })

    },
    async findPost() {
      axios.get(`/${this.$route.params.user_id}/journeys/${this.$route.params.id}/${this.postId}`).then(response => {
        this.postId = response.data  
      })
    },
    loginCheck(){
      if (localStorage.getItem('token')) {
        this.login = true
      } else {
        this.login = false
      }
    },
     async editPost(item) {
       this.postForm = { ...this.postForm, ...item }
       this.$modal.show('edit')
       this.postId = item.id
    },
       
    async saveChanges(){
       axios.put(`/${this.$route.params.user_id}/journeys/${this.$route.params.id}/${this.postId}`, 
      {'journey_id':this.$route.params.id, 
      'date':this.postForm.date, 
      'budget':this.postForm.budget, 
      'day':this.postForm.day, 
      'description':this.postForm.description, 
      'pictures': this.postForm.pictures}).then(response => {
        return alert('Saved Created'),location.reload()
      })

    },




      //       postForm: {
      //   journey_id: this.$route.params.id,
      //   date: '',
      //   budget: '',
      //   day: '',
      //   pictures:'',
      //   modalWidth: MODAL_WIDTH,
    formAccess(){
      this.$modal.show('form'); 
    },
  
    dateFormat (date) {
        return moment(String(date)).format('D MMMM YYYY')

    },
  },
  async mounted(){
    this.findPost()
  },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#buttonSearch[data-v-67344653] {
  display: flex;
  margin-left: 25%;
    margin-right: 25%;
    text-align: center
}

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
.post{
  position: relative;  
    margin: 3px;
    padding: 3px;  
           
}

#profbutton {
  display: flex;
  align-items: flex-start;
    margin: 3px;
    padding: 3px;  
    width: 99%;
    border-radius: 5px;
    border-color: #369DD7;
           
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
button {
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
body {
    margin-bottom: 70px;

}

img {
  border-radius: 10px;
  width: 100%;
  height: 200px;
  object-fit: cover;
  
}



</style>
