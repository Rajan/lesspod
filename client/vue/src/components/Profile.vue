<template>
<section class="hero is-info">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-4-widescreen">
          <form class="box" onsubmit="event.preventDefault();">
            <div class="field has-text-centered">
              <!-- <img src="../assets/images/logo-bis.png" width="167"> -->
              <span v-if="profilePic === null" class="icon" style="width: 3rem; height: 3rem;">
									<i  class="fa fa-user-circle fas fa-3x"></i>
							</span>
              <img v-if="profilePic !== null" id="profile-pic" width="80" height="80"/>
              <br>
              User Profile
            </div>
            <div class="field">
              <label class="label">Full Name (First Last)</label>
              <div class="control has-icons-left">
                <input class="input" type="text" v-model="fullName" id="fullName" placeholder="e.g. Alex Johnson" autocomplete="name" required>
                <span class="icon is-small is-left">
										<i class="fa fa-user-circle"></i>
									</span>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input class="input" type="email" v-model="email" id="email" placeholder="e.g. alexjohnson@gmail.com" autocomplete="username" required>
                <span class="icon is-small is-left">
										<i class="fa fa-envelope"></i>
									</span>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left">
                <input class="input" type="password" v-model="password" id="password" placeholder="********" autocomplete="new-password" required>
                <span class="icon is-small is-left">
										<i class="fa fa-lock"></i>
									</span>
              </div>
            </div>
            <div class="field">
              <label class="label">Retype Password</label>
              <div class="control has-icons-left">
                <input class="input" type="password" v-model="confirmPassword" id="password-confirm" placeholder="********" autocomplete="new-password" required>
                <span class="icon is-small is-left">
										<i class="fa fa-lock"></i>
									</span>
              </div>
            </div>

            <!-- update photo -->
            <div class="field">
              <label class="label">Update Profile Photo</label>
              <div class="control has-icons-left">
                  <input type="button" value="Upload" id="uploadProfilePic" @click.stop="updateProfilePic" />
              </div>
            </div>
            <div class="field is-grouped" style="margin-top: 1.5rem;">
              <div class="control">
                <button class="button is-info" @click.stop="saveProfile.bind(this)">Save Profile</button>
              </div>
              <div class="control">
                <a class="button is-text" style="text-decoration: none;" href="home">Cancel</a>
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
} from './../main';
import {loadImage} from "../utils";

export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePic: null,
      user: null
    }
  },
  created: function(){
    this.$root.$upload.new('avatar', {
      url: 'v1/users/pic',
      name:'avatar',
      onSuccess:(res) => {
        console.log(res);
        this.loadProfilePic();
      },
      onError(error) {
        alert('Unable to upload profile pic');
      }
    });
  },
  mounted: function() {
    
  },
  methods: {
    loadProfilePic: function(){
      if(document.getElementById('profile-pic')){
        loadImage('v1/users/pic').then(image => document.getElementById('profile-pic')
        .setAttribute('src', image));
      }
    },
    updateProfilePic: function() {
      console.log('Uploading Profile Pic...');
      this.$root.$upload.select('avatar');
    },

    saveProfile: function() {
      const vm = this;
      const firstName = vm.fullName.split(' ').slice(0, -1).join(' ');
      const lastName = vm.fullName.split(' ').slice(-1).join(' ');
      if (vm.password === vm.confirmPassword) {

        let userData = {
          "first": firstName,
          "last": lastName,
          "email": vm.email,
          "password": vm.password
        };

        const {
          deploymentTarget,
          LOCALHOST,
          FBASE
        } = globalVariables;
        console.log('deployment target is ' + deploymentTarget);

        // update user
        switch (deploymentTarget) {
          case LOCALHOST:
            axios.put('/v1/users', userData)
              .then(function(response) {
                console.log('saving user response: ' + response);

                vm.user.first = firstName;
                vm.user.last = lastName;
                vm.user.email = vm.email;
                vm.user.fullName = firstName + ' ' + lastName;
                vm.$cookie.set('user', vm.user);
                vm.$notify('Profile saved successfully!', 'success');
                // window.location.href = '../home';
              })
              .catch(function(err) {
                console.log(err);
              });
            break;
          case FBASE:

            // change password in firebase only if
            if (vm.password.length > 5) {
              const user = firebase.auth().currentUser;
              user.updatePassword(vm.password).then(function() {
                console.log('password changed in firebase');
              }).catch(function(error) {
                console.log('error in changing password: ', error);
              });
            }

            let db = firebase.firestore();
            const settings = {
              timestampsInSnapshots: true
            };
            db.settings(settings);

            const moment = require('moment');
            userData.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.ms Z');

            db.collection("users")
              .doc(vm.user.id)
              .update(userData)
              .then(function(docRef) {
                vm.user.first = firstName;
                vm.user.last = lastName;
                vm.user.email = vm.email;
                vm.user.fullName = firstName + ' ' + lastName;
                vm.$cookie.set('user', vm.user);
                vm.$notify('Profile saved successfully!', 'success');
              })
              .catch(function(error) {
                console.error("Error updating Profile: ", error);
              });
            break;
        }


      }
    }

  }
}
</script>
