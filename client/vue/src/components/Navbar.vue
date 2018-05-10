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
				<div class="navbar-item has-dropdown is-hoverable"  v-if="isLoggedIn()">
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
							<a class="navbar-item" @click="newMenu();">
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

				<div v-for="menuItem in topLevelMenus" class="navbar-item is-hoverable">
					<a :href="linkedMenu(menuItem)" class="navbar-link">{{menuItem.name}}
						<div class="navbar-dropdown is-right" v-if="subMenusOf(menuItem.name).length">
							<a class="navbar-item" v-for="menu1 in subMenusOf(menuItem.name)">
								<div v-if="menu1.linkedURL.length">
									<a v-bind:href="properURL(menu1.linkedURL)" target="_blank">{{cleanedSubmenu(menu1.name)}}</a>
								</div>
								<div v-else>
									<a v-bind:href="linkedMenu(menu1)" target="_blank">{{cleanedSubmenu(menu1.name)}}</a>
								</div>
							</a>
						</div>
					</a>    
					<!-- class="navbar-link" -->
				</div>
				
				<!-- <div class="navbar-item is-hoverable">
					<a href="/blog">Blog</a>
				</div> -->

				<div class="navbar-item has-dropdown is-hoverable"  v-if="isLoggedIn()">
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
		<NewMenuModal v-on:new-menu-added="newMenuAdded"></NewMenuModal>
	</nav>

</template>
<script type="text/javascript">
import NewMenuModal from '@/components/NewMenuModal';
export default {
	data(){
		return {
			menus: [{'name': 'Blog'}, {'name': 'About Us'}],
			showModal: false,
			newMenuName: ''
		}
	},
	computed: {

		topLevelMenus: function() {
			return this.menus.filter(function (menu) {
				if(menu.name !== null && menu.name !== undefined){
					return !(menu.name.indexOf('-') !== -1)
				}
				// return true;
			});
		}

	},
	props: {
		allMenus: this.menus
	},
	components: {
		NewMenuModal
	},
	beforeMount() {
		axios.defaults.headers.common['Authorization'] = Cookies.get("token");
		this.initNavbar();
	},
	methods: {
		initNavbar: function() {
			
			console.log('fetching menus...');
			var vm = this;

			axios.get('/v1/menus', {})
			.then(function (response){

							// console.log(response);

							let menus1 = response.data.menus;

							for(var i in menus1){

								console.log(menus1[i].name);
							}
							if(menus1.length > 0){
								vm.menus = vm.menus.concat(menus1);
							}else{
								console.log(menus1);
							}
							// renderPosts();
						})
			.catch(function (error){
				console.log(error);
				// if error is 401 unauthorize, logout the user.

				if(error.toString().indexOf('401') !== -1){
					console.log('Logging you out...')
					// vm.logout();
				}
			});
		},
		isLoggedIn: function() {
			if(Cookies.get('token') && Cookies.get('token').length){
				return true;
			}else {
				return false;
			}
		},
		logoClick: function() {
			if(Cookies.get("token").length) {

				console.log(Cookies.get("token"));
				window.location.href = '../home';

			} else {

				window.location.href = '../';
			}
		},
		newMenu: function() {
			console.log('creating new menu...');
			this.$modal.show('new-menu-modal', {menus: this.topLevelMenus}, {});
			// this.menus.push('NewM');
		},
		beforeOpen: function(event) {
			// console.log(event.params.menus);
		},
		beforeClose: function(event) {
			// console.log(event.params.menus);
		},
		linkedMenu: function (menuItem) {
			if(menuItem.linkedURL && menuItem.linkedURL.trim().length){
				return this.properURL(menuItem.linkedURL);
				
			} else {
				let arrowPos = menuItem.name.indexOf('->');
				if(arrowPos > 0)
				{
					let finalMenu = menuItem.name.substring(arrowPos + 2);

					let dashed = finalMenu.split(' ').join('-');
					return '/' + dashed.toLowerCase();
				}else{
					console.log('menuItem.name: ' + menuItem.name);
					let dashed = menuItem.name.trim().split(' ').join('-');
					return '/' + dashed.toLowerCase();
				}
			}
		},
		subMenusOf: function(menuName) {
			console.log('subMenusOf 1: ' + menuName);
			return this.menus.filter(function (menu) {
				// return !(menu.indexOf('-') !== -1)
				console.log('subMenusOf 2: ' + menuName);
				if(menu.name !== null && menu.name !== undefined){
					return (menu.name.startsWith(menuName)) && (menu.name !== menuName)
				}
				// return true;
			});
		},
		cleanedSubmenu: function(menu1) {
			let arrowPos = menu1.indexOf('->');
			return menu1.substring(arrowPos + 2);
		},
		properURL: function(url) {
			if(url && url.indexOf('http') === -1) {
				return 'http://' + url;
			}
		},
		newMenuAdded: function(newMenu) {
			console.log('new menu in Navbar: ' + newMenu);
			var result = newMenu.split(',');
			this.menus.push(result[0]);
			// result[1] will contain the linked url.
			// console.log('vm.$data' + this.$data.toString());

			// axios create menu via the api
			if(result[0].length) {
				
				axios.post('/v1/menus', {
					"name" : result[0],
					"linkedURL" : result[1]
				})
				.then(function (response) {
					console.log(response);
					console.log('Menu Id is ' + response.data.menu.id.toString());
					// document.getElementById('menuId').value = response.data.menu.id.toString();
					Cookies.set("menu", response.data.menu);
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		},
		logout: function() {
			Cookies.set('token', '');
			Cookies.set('user', '');
			window.location.href = '../';
		}
	}
};
</script>