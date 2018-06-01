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
							<!-- <a class="navbar-item">
								<div>
									<span class="icon is-small">
										<i class="fa fa-file"></i>
									</span>
									Page
								</div>
							</a> -->
						</div>
					</div>
					
				</div>

				<div v-for="menuItem in topLevelMenus" class="navbar-item is-hoverable">
					<a href="#" v-on:click="visitMenu(menuItem)" :class="bindClass(menuItem)">{{menuItem.name}}
						<div class="navbar-dropdown is-right" v-if="subMenusOf(menuItem.name).length">
							<a class="navbar-item" v-for="menu1 in subMenusOf(menuItem.name)">
								<div v-if="menu1.postId.length">
									<a href="#" v-on:click.stop="visitMenu(menu1)">{{cleanedSubmenu(menu1.name)}}</a>
								</div>
								<div v-else>
									<a href="#" v-bind:href="properURL(menu1.linkedURL)" target="_blank">{{cleanedSubmenu(menu1.name)}}</a>
								</div>
							</a>
						</div>
					</a>    
					<!-- class="navbar-link"  v-bind:href="properURL(menu1.linkedURL)" v-bind:href="linkedMenu(menu1)"-->
				</div>
				
				<!-- <div class="navbar-item is-hoverable">
					<a href="/blog">Blog</a>
				</div> -->

				<div class="navbar-item has-dropdown is-hoverable"  v-if="isLoggedIn()">
					<div class="navbar-link">
						{{ fullName }}
					</div>
					<div class="navbar-dropdown is-right">
						<a href="/profile" class="navbar-item">
							<div>
								<span class="icon is-small">
									<i class="fa fa-user-circle"></i>
								</span>
								Profile
							</div>
						</a>
						<a href="/settings" class="navbar-item">
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
			menus: [{'name': 'Blog', 'linkedURL' : document.location.origin + '/blog'}],
			showModal: false,
			newMenuName: '',
			fullName: 'Alex Johnson'
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
			
			// console.log('fetching menus...');
			var vm = this;

			axios.get('/v1/menus', {})
			.then(function (response){

							// console.log(response);

							let menus1 = response.data.menus;

							for(var i in menus1){

								// console.log(menus1[i].name);
							}
							if(menus1.length > 0){
								vm.menus = vm.menus.concat(menus1);
								// console.log(menus1);
							}else{
								// console.log(menus1);
							}
							// renderPosts();
						})
			.catch(function (error){
				// console.log(error);
				// if error is 401 unauthorize, logout the user.

				if(error.toString().indexOf('401') !== -1){
					// console.log('Logging you out...')
					// vm.logout();
				}
			});
			let user = Cookies.getJSON('user');
			if(user) {
				this.fullName = user.first + ' ' + user.last;
			}
			// console.log(user.first + ' ' + user.last);
		},
		isLoggedIn: function() {
			if(Cookies.get('token') && Cookies.get('token').length){
				return true;
			}else {
				return false;
			}
		},
		logoClick: function() {
			if(Cookies.get("token") && Cookies.get("token").length) {

				// console.log(Cookies.get("token"));
				window.location.href = '../home';

			} else {

				window.location.href = '../';
			}
		},
		newMenu: function() {
			// console.log('creating new menu...');
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
				return this.dashedMenu(menuItem.name);
			}
		},
		dashedMenu: function(menuName) {
			let arrowPos = menuName.indexOf('->');
			if(arrowPos > 0)
			{
				let finalMenu = menuName.substring(arrowPos + 2);

				let dashed = finalMenu.split(' ').join('-');
				return '/' + dashed.toLowerCase();
			}else{
					// console.log('menuItem.name: ' + menuItem.name);
					let dashed = menuName.trim().split(' ').join('-');
					return '/' + dashed.toLowerCase();
				}
			},
			subMenusOf: function(menuName) {
			// console.log('subMenusOf 1: ' + menuName);
			return this.menus.filter(function (menu) {
				// console.log('subMenusOf 2: ' + menuName);
				if(menu.name !== null && menu.name !== undefined){
					return (menu.name.startsWith(menuName)) && (menu.name !== menuName)
				}
				// return true;
			});
		},
		bindClass: function(menuItem) {
			if(this.subMenusOf(menuItem.name).length){

				return 'navbar-link';

			}else { 

				return ''; 
			}
			
		},
		cleanedSubmenu: function(menu1) {
			let arrowPos = menu1.indexOf('->');
			if(arrowPos > 0){
				return menu1.substring(arrowPos + 2);
			}else {
				return menu1;
			}
		},
		properURL: function(url) {
			if(url && url.indexOf('http') === -1) {
				return 'http://' + url;
			}else return url;
		},
		newMenuAdded: function(newMenu) {

			var vm = this;
			console.log('new menu in Navbar: ' + newMenu);
			var result = newMenu.split(',');
			var menuName = result[0];
			vm.menus.push(menuName);
			var linkedURL = '';
			var postId = '';
			// result[1] will contain the linked url.
			// console.log('vm.$data' + this.$data.toString());

			// axios create menu via the api
			if(result[1]){
				linkedURL = result[1];
				vm.createMenu(result[0], linkedURL, postId);
			}else {
				linkedURL = window.location.origin + vm.dashedMenu(menuName);

				// if there's no linkedURL, we should create a corresponding page.
				// After the page is created, we should add postId to this menu.
				// This postId can be retrieved later when someone clicks on the menu.

				var title = menuName;
				var content = '<br>';
				console.log('title is ' + title.toString() + ' content is ' + content.toString());
				if(title.length && content.length) {

					axios.post('/v1/posts', {
						"title" : title.toString(),
						"content" : content.toString(),
						"tags": [].toString(),
						"pageURL" : linkedURL.toString()
					})
					.then(function (response) {
						console.log(response);
						postId = response.data.post.id.toString();
						// console.log('Post Id is ' + postId);
						// document.getElementById('postId').value = postId;
						vm.createMenu(menuName, linkedURL, postId);
						// Cookies.set("post", response.data.post);
						
					})
					.catch(function (error) {
						console.log(error);
					});
				}

				

			}
			
		},
		createMenu: function(menuName, linkedURL, postId) {
			var vm = this;
			console.log('creating menu...' + menuName + ', LinkedURL =' + linkedURL + ', postId = ' + postId );

			if(menuName) {

				axios.post('/v1/menus', {
					"name" : menuName.toString(),
					"linkedURL" : linkedURL.toString(),
					"postId" : postId.toString()
				})
				.then(function (response) {
					console.log('menu create response: ' + response);
					// console.log('New Menu Id is inside: ' + response.toString());
					// document.getElementById('menuId').value = response.data.menu.id.toString();
					vm.menus.push(response.data.menu);
					Cookies.set("menu", response.data.menu);
					// this.$router.go(this.$router.currentRoute);
					// this.$router.go();
					vm.$notify('Menu added successfully!', 'success');
				})
				.catch(function (error) {
					console.log(error);
				});
			}	
		},
		visitMenu: function(menu1) {

			var vm = this;

			if(menu1.postId && menu1.postId.length){

				console.log('postId in visitMenu: ' + JSON.stringify(menu1.postId));
			// Cookies.set('postId', menu1.postId);

			var postId = menu1.postId;

			// console.log('postId in Page: ' + postId);

			axios.get('/v1/posts/' + postId.trim(), {
				"id" : postId.trim()
			})
			.then(function(response){
				console.log(response);
				var post = response.data.post;
				post.title = vm.cleanedSubmenu(post.title)
				// console.log('post is: ' + post);
				Cookies.set("editpost", JSON.stringify(post));
				location.href = menu1.linkedURL;
			})
			.catch(function(error){
				console.log(error);
			});
		}else {
			window.open(vm.properURL(menu1.linkedURL), '_blank');
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