<template>
  <div class="journey">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div class="addJourney">
</div>
<div>
  <modal name="form" transition="pop-out" :width="modalWidth" :height="400">
  <div class="box">
    <div class="box-part" id="bp-left">
      <div class="partition" id="partition-register">
        <div class="partition-title">Create a journey</div>
        <div class="partition-form">
          <el-form ref="journeyForm" :model="journeyForm" autocomplete="false">
            <h1></h1>
            <el-form-item :style="{'display':'flex','justify-content':'center'}">
            <el-input v-model="journeyForm.title" placeholder="Journey Title"></el-input>
            </el-form-item>
            <el-form-item :style="{'display':'flex','justify-content':'center'}">
            <el-date-picker v-model="journeyForm.date" placeholder="Journey Date"></el-date-picker>
            </el-form-item>
            <el-form-item :style="{'display':'flex','justify-content':'center'}">
            <el-input v-model="journeyForm.budget" placeholder="Budget"></el-input>
            </el-form-item>
             <div class="button-set">
            <el-button @click="addJourney" class="createButton">Create Journey</el-button>
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
</div>
<div>
   <fab
   :position="position"
   :bg-color="bgColor"
   :actions="fabActions"
   @Add="formAccess"
   @Edit="editJourney"
></fab>
</div>

<div class="post" :key="index+10" v-for="(item, index) in array">

  <el-button @click="getPosts(item.user_id, item.id)">
     <p><strong>{{item.title}}</strong></p>
     <p><strong>Budget: </strong>{{item.budget}}</p> 
     <img :src="item.cover" width="300px">
  </el-button>
  

</div>


  </div>
</template>

<script>
import { create } from 'domain';
import { userInfo } from 'os';
import fontawesome from "@fortawesome/fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import fab from 'vue-fab'


const axios = require('axios')
const MODAL_WIDTH = 656

export default {
  name: 'addAJourney',
  components: {
    fab,

  },
  data () {
    return {
      journeyForm: {
        title: '',
        date: '',
        budget:'',
        user_id: null,
      },
      id: null,
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
                  name: 'Edit',
                  icon: 'edit'
              }
          ]
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
    
    show () {
    
  },
  hide () {
    this.$modal.hide('hello-world');
  },
    async getInfo(){
      await axios.get('http://127.0.0.1:3333/journeys').then(response => {
        this.array = response.data

        for(let i in this.array){
         let user_id = this.array[i].user_id
         let id = this.array[i].id
        return this.array
        }
        })
    },
    async getPosts(user_id,id){
        return this.$router.push({path:`/${user_id}/journeys/${id}`})
    },
      formAccess(){
      this.$modal.show('form');      
      },
      async addJourney(){
      await axios.post(`http://127.0.0.1:3333/${this.journeyForm.guser_id}/journeys`, {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }}).then(response => {
          this.id = response.data.user_id
          this.id = this.journeyForm.user_id
          console.log(response)
        })

      },
      async editJourney(){
          alert('Clicked on alert icon');
      },
  },
  

    async mounted() {
    this.getInfo()
  },
  }
</script>


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
.post {
  margin: 10px
}
$background_color: #404142;
$github_color: #DBA226;
$facebook_color: #3880FF;
.box {
  background: white;
  overflow: hidden;
  width: 656px;
  height: 400px;
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
    height: 100%;
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
</style>
