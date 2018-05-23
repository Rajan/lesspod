<template>
  <section class="hero is-info">
    <div class="hero-body">
      <div class="container">
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
                <label class="label">Full Name (First Last)</label>
                <div class="control has-icons-left">
                  <input class="input" type="text" id="fullName" placeholder="e.g. Alex Johnson" autocomplete="name"
                         required>
                  <span class="icon is-small is-left">
										<i class="fa fa-user-circle"></i>
									</span>
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left">
                  <input class="input" type="email" id="email" placeholder="e.g. alexjohnson@gmail.com"
                         autocomplete="username" required>
                  <span class="icon is-small is-left">
										<i class="fa fa-envelope"></i>
									</span>
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left">
                  <input class="input" type="password" id="password" placeholder="********" autocomplete="new-password"
                         required>
                  <span class="icon is-small is-left">
										<i class="fa fa-lock"></i>
									</span>
                </div>
              </div>
              <div class="field">
                <label class="label">Retype Password</label>
                <div class="control has-icons-left">
                  <input class="input" type="password" id="password-confirm" placeholder="********"
                         autocomplete="new-password" required>
                  <span class="icon is-small is-left">
										<i class="fa fa-lock"></i>
									</span>
                </div>
              </div>
              <div class="field is-grouped" style="margin-top: 1.5rem;">
                <div class="control">
                  <button class="button is-info" @click="register">Create Account1</button>
                </div>
                <div class="control">
                  <a class="button is-text" style="text-decoration: none;" href="login">Login1</a>
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

  module.exports = {
    data() {
      return {}
    },
    methods: {
      register: function () {
        let fullName = document.getElementById("fullName").value;
        let firstName = fullName.split(' ').slice(0, -1).join(' ');
        let lastName = fullName.split(' ').slice(-1).join(' ');
        let password = document.getElementById("password").value;
        let passwordConfirm = document.getElementById("password-confirm").value;
        if (password === passwordConfirm) {
          console.log('registering user...');
          axios.post('/v1/users/', {
            "first": firstName,
            "last": lastName,
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value
          })
            .then(function (response) {
              console.log(response);
              Cookies.set("token", response.data.token);
              Cookies.set("user", JSON.stringify(response.data.user));

              // setting up Authorization Header that will be used for subsequent requests.
              axios.defaults.headers.common['Authorization'] = response.data.token;
              axios.defaults.headers.post['Content-Type'] = 'application/json';

              window.location.href = '../home';
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log('passwords do not match');
        }
      }
    }
  }
</script>
