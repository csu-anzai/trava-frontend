<template>
  <div>

    <div>
      <div id="Cover">
        {{info.cover}}
        
        <div id="Avatar">
        {{info.avatar}}
        </div>
      </div>

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
            {{info.followers.length}}<br>
            Followings
          </p><br>

          <p>
            {{info.journeys.length}}<br>
            Journeys
          </p>

          <div id="bio">
            Hellow i'm an ADMIN
          </div>
        </div>
      
      </div>
    </div>
    <br>
    <h4>{{info.username}}'s Journeys</h4>

    <div style="margin : 5px" :key="index" v-for="(item, index) in info.journeys">
      <el-button @click="getPosts(item.user_id, item.id)">
        <div class="card-trip">

          <img :src="item.cover" />
          
            <div class="card-trip-infos">
              <div>
              <h2>{{item.title}}</h2>
              </div>
              <h2 class="card-trip-pricing">{{item.budget}}</h2>
              <img :src="info.avatar" class="card-trip-user avatar-bordered" />
            </div>

        </div>
      </el-button>
    </div>
  
  </div>
</template>

<script>
import moment from 'moment'
import Posts from '@/components/JCard.vue'
const axios = require('axios')

export default {
  name: 'profile',
  data(){
    return {
      info : null
    }
  },
  methods: {
    async get(){

      axios.get('http://127.0.0.1:3333/profile/user' ,{ 
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
    getPosts(user_id,id){
      this.$router.push({path:`/${user_id}/journeys/${id}`})
    },
  },
  created(){
    this.get()
  }
}
</script>

<style>

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

#Cover {
  width: 375px;
  height: 138px;
  background-color: #C4C4C4;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
    margin: 0 auto;
}

#Profile {
  width: 375px;
  height: 211px;
  left: 0px;
  top: 237px;
  background: rgba(196, 196, 196, 0.2);
  border: 0.5px solid rgba(0, 0, 0, 0.1);
    margin: 0 auto;
}

#Avatar {
  border-radius: 80px;
  background-color: whitesmoke;
  height: 110px;
  width: 110px;
  right: 0px;

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



</style>