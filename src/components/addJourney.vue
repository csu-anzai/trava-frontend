<template>
  <modal name="demo-login" transition="pop-out" :width="modalWidth" :height="400">
  <div class="box">
    <div class="box-part" id="bp-left">
      <div class="partition" id="partition-register">
        <div class="partition-title">CREATE ACCOUNT</div>
        <div class="partition-form">
          <form autocomplete="false">

            <div class="autocomplete-fix">
              <input type="password">
            </div>

            <input id="n-email" type="text" placeholder="Email">
            <input id="n-username" type="text" placeholder="Username">
            <input id="n-password2" type="password" placeholder="Password">
          </form>

          <div style="margin-top: 42px">
          </div>

          <div class="button-set">
            <button id="goto-signin-btn">Sign In</button>
            <button id="register-btn">Register</button>
          </div>

          <button class="large-btn github-btn">connect with <span>github</span></button>
          <button class="large-btn facebook-btn">connect with <span>facebook</span></button>
        </div>
      </div>
    </div>
    <div class="box-part" id="bp-right">
      <div class="box-messages">
      </div>
    </div>
  </div>
</modal>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  components :{

  },
  data() {
    return {
      username : null,
      email : null,
      password : null,
      cover : null,
      avatar : null,
    }
  },
  
  methods: {
      post() {
        return axios.post('http://127.0.0.1:3333/:user_id/journeys')
    },
  }
}
</script>