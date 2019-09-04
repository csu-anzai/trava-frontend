<template>
  <div class="journey-wrapper">

     <div id="search-wrapper">
        <el-input type="text" id="searchBar" data-v-c7e7fc80 v-model="search" placeholder="Try search for a beach..."/>
       <i class="fas fa-search" style="top:53px"/>

      </div>
      
    <div class="addJourney"></div>
    <div v-if="this.login == true">
      <modal name="form" transition="pop-out" :width="modalWidth" :adaptive=true height="auto">
      <div class="box">
        <div class="box-part" id="bp-left">
          <div class="partition" id="partition-register">
            <div class="partition-title">Create a journey</div>
            <div class="partition-form">
              <el-form ref="journeyForm" :model="journeyForm" autocomplete="false">
                <el-form-item>
                <el-input v-model="journeyForm.title" placeholder="Journey Title"></el-input>
                </el-form-item>
                <el-form-item>
                <el-input v-model="journeyForm.budget" placeholder="Budget"></el-input>
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
                <el-button @click="addJourney" class="createButton">Create Journey</el-button>
              </div>
              </el-form>
              

              <div style="margin-top: 42px">
              </div>
            </div>
          </div>
        </div>
      </div>
              </modal>

  <!-- === Modal Start === -->

    <div v-if="this.login == true">
      <fab
      :position="position"
      :bg-color="bgColor"
      :actions="fabActions"
      @Add="formAccess"
        v-bind:files="file"
      :onaddfile="upload"
    ></fab>
    </div>
  </div> 
  <!-- === Modal Ends === -->


<div class="post" :key="index+10" v-for="(item, index) in array">

    </div>

    <div class="fabButton" v-if="this.login == true">
      <fab
      :position="position"
      :bg-color="bgColor"
      :actions="fabActions"
      @Add="formAccess"
      @Home="profile"
      @Profile="profile"
      v-bind:files="file"
      :onaddfile="upload" 
    ></fab>
    </div>

      <div :key="index" v-for="(item, index) in filteredList" class="journeyBox" @click="getPosts(item.user_id, item.id)">
        
        <div>
          <strong>{{item.title}} {{item.budget}}</strong>
          <img :src="item.cover">
        </div>
        
      </div>
  </div>
   
</template>

<script>
import { create } from 'domain';
import { userInfo } from 'os';
import fab from 'vue-fab'
import vueFilePond, { setOptions } from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'; 
import { send } from 'q';
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
const axios = require('axios')
const MODAL_WIDTH = 656





export default {
  name: 'addAJourney',
  components: {
    fab,
    FilePond

  },
  
  data () {
    return {
      login : false,
      file: [], 
     thumb: '',
     search:'',
  thumbs: '',
      journeyForm: {
        title: '',
        budget:'',
        user_id: null,
        cover:[]
      },
      array : null,
      modalWidth: MODAL_WIDTH,
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
                title: 'My Profile',
                icon: 'account_box'
              },
              

          ]
    }
  },
      
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  computed: {
    clUrl() {
      try {
        return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
      } catch (err) {
        console.log(err);
      }
        },
        filteredList() {
          try {
      return this.array.filter(item => {
        let title = item.title.toLowerCase().includes(this.search.toLowerCase())
        let budget = item.budget.toLowerCase().includes(this.search.toLowerCase())

          if(title) {
            return title
          } else if (budget) {
            return budget
          }
        })
          } catch (err) {
          }
  },
  },

          
  methods: {
   upload(err, file) {
     let image = JSON.parse(file.serverId)
     this.thumbs = image.url
    },
  hide () {
    this.$modal.hide('hello-world');
  },
    async getInfo(){
      await axios.get('/journeys').then(response => {
        this.array = response.data
        })
    },
    profile(){
      this.$router.push('/myprofile')
    },
    home(){
      this.$router.push('/')
    },
    async getPosts(user_id,id){

      let user = await axios.get(`/profile/find/${user_id}`)
      let username = user.data.username
      return this.$router.push({path:`/${username}/journeys/${id}`})
    },
      formAccess(){
      this.$modal.show('form');      
      },
      async addJourney(){
       let user_id = await axios.get(`/profile/user`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
         }
        })
       let userId = user_id.data.id
       this.journeyForm.user_id = userId
       await axios.post(`/${userId}/journeys`, {'title':this.journeyForm.title, 'budget':this.journeyForm.budget, 'cover':this.thumbs, 'user_id':userId}).then(response => {
         return alert('Journey Created'),location.reload()
         
       })
      },
      async getId(){
        let user_id = await axios.get(`/profile/user`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
         }
        })
        let userId = user_id.data.id
       this.journeyForm.user_id = userId
      }, 
      loginCheck(){
      if (localStorage.getItem('token')) {
        this.login = true
      } else {
        this.login = false
      }
    }
  },
    async mounted() {
    this.getInfo()
    this.getId()
  },
  created(){
    this.loginCheck()
  }
  }

</script>


<style scoped lang="scss">
strong {
      position: absolute;  
    left: 50%;                        /* horizontal alignment */
    top: 50%;                         /* vertical alignment */
    transform: translate(-50%, -50%);
    color: white;
    font-size: 30px;
    text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000;
    font-family: Futura
}
#search-wrapper >>> {
    text-align: center;
    width: 100%;
    border-radius: 50px;
}
#searchBar[data-v-c7e7fc80] {
 border-radius: 50px;
 margin-top: 3px;
 margin-bottom: -5px;
 width: 97.5%;
     text-align: center;
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
.post {
  margin: 10px
}

input {
  width: auto;
  height: auto;
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
  button {
    display: flex;
    justify-content: center;
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
  width:100%;
  display: flex;
  justify-content: center;
}
img {
  border-radius: 10px;
  width: 95%;
  height: 200px;
  object-fit: cover;
  margin-bottom:7px
}

.journeyBox {
  position: relative;  
    padding: 1px;  

                        
}
.fabButton {
  width:100%;
  display:flex;
  align-content: center

}
.empty {
  margin-bottom: 70px
}
i{
  position: absolute;
  left: 15px;
  margin-top:10px;
  font-size: 25px;
  top:75px;
  color:grey
}



</style>
