<template>
<section class="hero is-info" style="min-height: calc(100vh - 6rem);">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-4-widescreen">
          <form class="box">
            <!-- <div class="field has-text-centered" style="margin:0;padding:0;">

              <img src="./../assets/images/icon.png" style="width:4rem;height: 4rem;margin:0;padding:0;"><br>
              <a href="#"><img src="./../assets/images/type.png"></a>
              <br>
            </div> -->
            <div class="field">
              <label class="label">Full Name (First Last)</label>
              <div class="control has-icons-left">
                <input class="input" type="text" id="fullName" v-model="fullName" placeholder="e.g. Alex Johnson" autocomplete="name" required>
                <span class="icon is-small is-left">
										<i class="fa fa-user-circle"></i>
									</span>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input class="input" type="email" id="email" v-model="email" placeholder="e.g. alexjohnson@gmail.com" autocomplete="username" required>
                <span class="icon is-small is-left">
										<i class="fa fa-envelope"></i>
									</span>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input class="input" type="password" id="password" v-model="password" placeholder="********" autocomplete="new-password" required>
                <span class="icon is-small is-left">
										<i class="fa fa-lock"></i>
									</span>
              </div>
            </div>
            <div class="field">
              <label class="label">Retype Password</label>
              <div class="control has-icons-left">
                <input class="input" type="password" id="passwordConfirm" v-model="confirmPassword" placeholder="********" autocomplete="new-password" required>
                <span class="icon is-small is-left">
										<i class="fa fa-lock"></i>
									</span>
              </div>
            </div>
            <div class="field is-grouped" style="margin-top: 1.5rem;">
              <div class="control">

                <a class="button is-info" @click="register">Create Account</a>

              </div>
              <div class="control">
                <a class="button is-text" style="text-decoration: none;" href="login">Login</a>
              </div>
            </div>
            <!-- <div class="field">
                <button class="button is-success">
                  Login
                </button>
            </div> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script type="text/javascript">
import {
  globalVariables
} from './../main'

export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register: function() {
      let vm = this
      let firstName = fullName.value
        .split(' ')
        .slice(0, -1)
        .join(' ')
      let lastName = fullName.value
        .split(' ')
        .slice(-1)
        .join(' ')
      if (
        passwordConfirm.value.length > 5 &&
        password.value === passwordConfirm.value
      ) {
        console.log('registering user...')

        const {
          deploymentTarget,
          LOCALHOST,
          FBASE
        } = globalVariables
        console.log('deployment target is ' + deploymentTarget)

        let userData = {
          first: firstName,
          last: lastName,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
        }

        switch (deploymentTarget) {
          case LOCALHOST:
            axios
              .post('/v1/users/', userData)
              .then(function(response) {
                console.log(response)
                vm.$cookie.set('token', response.data.token)
                vm.$cookie.set('user', JSON.stringify(response.data.user))

                // setting up Authorization Header that will be used for subsequent requests.
                axios.defaults.headers.common['Authorization'] =
                  response.data.token
                axios.defaults.headers.post['Content-Type'] = 'application/json'

                window.location.href = '../home'
              })
              .catch(function(error) {
                console.log(error)
              })
            break

          case FBASE:
            firebase
              .auth()
              .createUserWithEmailAndPassword(userData.email, userData.password)
              .then(function(authData) {
                const settings = {
                  timestampsInSnapshots: true
                }
                let db = firebase.firestore();
                db.settings(settings);

                const uuidv4 = require('uuid/v4');
                userData.id = uuidv4();
                delete userData.password;

                const moment = require('moment');
                userData.createdAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');
                userData.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');

                db
                  .collection('users')
                  .doc(userData.id) // documentId is same as userId; easier for future referencing of document
                  .set(userData)
                  .then(function(docRef) {
                    vm.$cookie.set('user', JSON.stringify(userData));
                    firebase.auth().currentUser.getIdToken( /* forceRefresh */ true).then(function(idToken) {
                      // Send token to your backend via HTTPS
                      vm.$cookie.set(
                        'token',
                        idToken
                      );
                      window.location.href = '../home';
                    }).catch(function(error) {
                      // Handle error
                    });
                  })
                  .catch(function(error) {
                    console.error('Error adding document: ', error)
                  })
              })
              .catch(function(error) {
                console.error('error registering account: ' + error.message)
              })
            break
        }
      } else {
        console.log('passwords do not match')
      }
    }
  }
}
</script>
