<template lang="html">
	<nav class="navbar has-shadow">
		<div class="navbar-brand">
			<a class="navbar-item">
				<img src="./../assets/images/icon.png">
			</a>
			<div class="navbar-burger burger">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>

		<div class="navbar-menu">
			<div class="navbar-start">
				<div class="navbar-item">
					<div>
						<a href="#" @click="logoClick"><img src="./../assets/images/type.png" width="auto" height="21"></a>
						<br>
						<small>Serverless Blogging Engine</small>
					</div>
				</div>
			</div>

			<div class="navbar-end">
				<div class="navbar-item has-dropdown is-hoverable">
					<div class="navbar-link">
						New
						<div class="navbar-dropdown is-right">
							<a class="navbar-item" onclick="window.location.href = '../newpost';">
								<div>
									<span class="icon is-small">
										<i class="fa fa-clipboard"></i>
									</span>
									Post
								</div>
							</a>
							<a class="navbar-item">
								<div>
									<span class="icon is-small">
										<i class="fa fa-bars"></i>
									</span>
									Menu
								</div>
							</a>
							<a class="navbar-item">
								<div>
									<span class="icon is-small">
										<i class="fa fa-file"></i>
									</span>
									Page
								</div>
							</a>
						</div>
					</div>
					
				</div>

				<div v-for="menuItem in menus" class="navbar-item is-hoverable">
					<a :href="linkedMenu(menuItem)" >{{menuItem}}</a>    <!-- class="navbar-link" -->
				</div>
				
				<!-- <div class="navbar-item is-hoverable">
					<a href="/blog">Blog</a>
				</div> -->

				<div class="navbar-item has-dropdown is-hoverable">
					<div class="navbar-link">
						Alex Johnson
					</div>
					<div class="navbar-dropdown is-right">
						<a class="navbar-item">
							<div>
								<span class="icon is-small">
									<i class="fa fa-user-circle"></i>
								</span>
								Profile
							</div>
						</a>
						<a class="navbar-item">
							<div>
								<span class="icon is-small">
									<i class="fa fa-cog"></i>
								</span>
								Settings
							</div>
						</a>
						<a class="navbar-item">
							<div>
								<span class="icon is-small">
									<i class="fa fa-bug"></i>
								</span>
								Report bug
							</div>
						</a>
						<a class="navbar-item" @click="logout">
							<div>
								<span class="icon is-small">
									<i class="fa fa-arrow-right"></i>
								</span>
								Sign Out
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>
<script type="text/javascript">
module.exports = {
	data(){
		return {
			menus: ['Blog', 'About Us']
		}
	},
	computed:{
	    
	},
	methods: {
		logoClick: function() {
			if(Cookies.get("token").length) {

				console.log(Cookies.get("token"));
				window.location.href = '../home';

			} else {

				window.location.href = '../';
			}
		},
		linkedMenu: function (menuItem) {
			let dashed = menuItem.split(' ').join('-');
	    	return '/' + dashed.toLowerCase();
	    },
		logout: function() {
			Cookies.set('token', '');
			Cookies.set('user', '');
			window.location.href = '../';
		}
	}
}
</script>