<template>
<section class="hero is-info">
  <div class="hero-body">
    <div class="container ">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-4-widescreen">
          <form class="box">
            <div class="field has-text-centered">
              <!-- <img src="../assets/images/logo-bis.png" width="167"> -->
              <img src="./../assets/images/icon.png" style="width:5rem;height: 5rem;"><br>
              <a href="#"><img src="./../assets/images/type.png"></a>
              <br>
              <small>Serverless Blogging Engine</small>
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
                <input class="input" type="password" id="password" v-model="password" placeholder="********" autocomplete="current-password" required>
                <span class="icon is-small is-left">
										<i class="fa fa-lock"></i>
									</span>
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <label class="checkbox">
										<input type="checkbox" required>
										Remember me
									</label>
              </div>
              <div class="control">
                <a class="is-link is-small" style="text-decoration: none;color:#0271D3;">Forgot Password?</a>
              </div>
            </div>
            <div class="field is-grouped" style="margin-top: 2rem;">
              <div class="control">
                <a href="#" @click="login" class="button is-info">Login</a>
              </div>
              <div class="control">
                <a class="button is-text" href="register" style="text-decoration: none;color:#0271D3;">Create Account</a>
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
// function login(e) {
// 	e.preventDefault();
// 	let email = document.getElementById('email').value;
// 	let password = document.getElementById('password').value;
// 	if(email.length && password.length) {
// 		axios.post('/v1/users/login', {
// 			"email" : email,
// 			"password" : password
// 		}, {
// 			headers: {
// 				'Content-Type': 'application/json; charset=UTF-8',
// 			}})
// 		.then(function (response) {
// 			console.log(response);
// 			Cookies.set("token", response.data.token);
// 			Cookies.set("user", JSON.stringify(response.data.user));
//             // setting up Authorization Header that will be used for subsequent requests.
//             axios.defaults.headers.common['Authorization'] = response.data.token;
//             axios.defaults.headers.post['Content-Type'] = 'application/json';
//         })
// 		.then(function (response) {
// 			window.location.href = '../home';
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// 	}
// }
import {
  globalVariables
} from './../main'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function() {
      var vm = this
      console.log('email: ' + email.value + '  password: ' + password.value)

      if (email.value.length && password.value.length) {
        const {
          deploymentTarget,
          LOCALHOST,
          FBASE
        } = globalVariables
        console.log('deployment target is ' + deploymentTarget)

        switch (deploymentTarget) {
          case LOCALHOST:
            axios
              .post('/v1/users/login', {
                email: email.value,
                password: password.value
              })
              .then(function(response) {
                console.log(response)
                Cookies.set('token', response.data.token)
                Cookies.set('user', JSON.stringify(response.data.user))
                // setting up Authorization Header that will be used for subsequent requests.
                axios.defaults.headers.common['Authorization'] =
                  response.data.token
                axios.defaults.headers.post['Content-Type'] = 'application/json'
                vm.$notify('Logged in successfully!', 'success')
                // console.log(response.headers);
              })
              .then(function(response) {
                window.location.href = '../home';
              })
              .catch(function(error) {
                console.log(error);
              })
            break

          case FBASE:
            firebase
              .auth()
              .signInWithEmailAndPassword(email.value, password.value)
              .then(function(user) {
                // query for "users" collection based on email because fbase's user object won't have profile data
                const settings = {
                  timestampsInSnapshots: true
                }
                let db = firebase.firestore()
                db.settings(settings)

                db
                  .collection('users')
                  .where('email', '==', email.value)
                  .get()
                  .then(function(querySnapshot) {
                    Cookies.set(
                      'user',
                      JSON.stringify(querySnapshot.docs[0].data())
                    )
                    window.location.href = '../home'
                  })
                  .catch(function(error) {
                    console.log('Error getting documents: ', error)
                  })
              })
              .catch(function(error) {
                console.error(error.message)
              })
            break
        }
      }
    }
  }
}
</script>
