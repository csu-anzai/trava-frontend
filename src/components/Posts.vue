<template>
  <div class="posts">
    <modal name="form" transition="pop-out" :width="modalWidth" :adaptive=true height="auto">
      <div class="box">
    <div class="box-part" id="bp-left">
      <div class="partition" id="partition-register">
        <div class="partition-title">Create a journey</div>
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
     <input type="file" class="form-control" v-on:change="upload($event.target.files)" accept="image/*" />
        <div class="button-set">
            <el-button @click="addPost" class="createButton">Add Post</el-button>
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
    <div class="addpost" v-if="this.login == true">
    <br><el-button @click="formAccess" class="createButton">Add post</el-button>
    </div>
<div class="post" :key="index+10" v-for="(item, index) in postInfo">
  <b-card :title="item.day" style="max-width: 30rem;" class="mb-2" id="card">
     <span>{{dateFormat(item.date)}}</span>
     <b-card-text><strong>Budget: </strong>{{item.budget}}</b-card-text>
     <b-card-text><strong>Description: </strong>{{item.description}}</b-card-text> 
     <img :src="item.pictures" width="300px">
  </b-card>
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

export default {
  name:'addAPost',
  components: {
    FilePond
  },
  data () {
    return {
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
      postInfo: null,
    }
  },
  computed: {
    clUrl() {
        return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`  
        },
  },
  created () {
    this.loginCheck()
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
    async getInfo(){
      axios.get(`http://127.0.0.1:3333/${this.$route.params.user_id}/journeys/${this.$route.params.id}`).then(response => {
         this.postInfo = response.data.posts
         return this.postInfo
       
        })
        
    },
    loginCheck(){
      if (localStorage.getItem('token')) {
        this.login = true
        console.log('Have Token');
      } else {
        this.login = false
        console.log('Dont Have Token');
      }
    },
    upload(file) {
        const formData = new FormData();

      
      formData.append('file', file[0]);
      formData.append('upload_preset', this.cloudinary.uploadPreset);
      formData.append('tags', 'gs-vue,gs-vue-uploaded');
      


      for(var pair of formData.entries()) {
        console.log(pair[0]+', '+pair[1]);
      }
      console.log(file)
      axios.post(this.clUrl, formData).then(res => {
        this.thumbs = res.data.secure_url
      })
    },
    async addPost() {
      axios.post(`http://127.0.0.1:3333/${this.$route.params.user_id}/journeys/${this.$route.params.id}`, 
      {'journey_id':this.$route.params.id, 
      'date':this.postForm.date, 
      'budget':this.postForm.budget, 
      'day':this.postForm.day, 
      'description':this.postForm.description, 
      'pictures': this.postForm.pictures}).then(response => {
        return alert('Post Created'),location.reload()
      })

    },
    formAccess(){
      this.$modal.show('form'); 
    },
    
    dateFormat (date) {
        return moment(String(date)).format('D MMMM YYYY')

    }
  },
  async mounted(){
    this.getInfo()
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
.post{
display: flex;
justify-content: center;
margin: 10px
}
.createButton {
  width:50%;

}
button {
    border-radius: 20px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    min-width: 140px;
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
  width: 656px;
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
    width: 50%;
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



</style>
