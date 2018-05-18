<template>
	<section class="hero is-info">
		<div class="hero-body">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-5-tablet is-4-desktop is-4-widescreen">
						<form class="box" onsubmit="event.preventDefault();">
							<div class="field has-text-centered">
								<!-- <img src="../assets/images/logo-bis.png" width="167"> -->
								<span class="icon" style="width: 3rem; height: 3rem;">
									<i class="fa fa-user-circle fas fa-3x"></i>
								</span><br>
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
							<div class="field is-grouped" style="margin-top: 1.5rem;">
								<div class="control">
									<button class="button is-info" @click.stop="saveProfile">Save Profile</button>
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

module.exports = {
	data(){
		return {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
			user: null
		}
	}, 
	mounted: function(){
		var vm =  this;

		vm.user = Cookies.getJSON('user');
		console.log(vm.user);
		vm.fullName = vm.user.first + ' ' + vm.user.last;
		vm.email = vm.user.email;
	},
	methods: {

		saveProfile: function() {
			var vm = this;
			var firstName = vm.fullName.split(' ').slice(0, -1).join(' ');
			var lastName = vm.fullName.split(' ').slice(-1).join(' ');
			if(vm.password === vm.confirmPassword) {

				// update user
				axios.put('/v1/users', {

					"first": firstName,
					"last": lastName,
					"email": vm.email,
					"password": vm.password

				})
				.then(function(response) {
					console.log('saving user response: ' + response);

					vm.user.first = firstName;
					vm.user.last = lastName;
					vm.user.email = vm.email;
					vm.user.fullName = firstName + ' ' + lastName;
					Cookies.set('user', vm.user);
					vm.$notify('Profile saved successfully!', 'success');
					// window.location.href = '../home';
				})
				.catch(function(err){
					console.log(err);
				});
			}
		}
		
	}
}
</script>